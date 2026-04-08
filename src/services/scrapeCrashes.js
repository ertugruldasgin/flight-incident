import fetch from "node-fetch";
import fs from "fs";
import { JSDOM } from "jsdom";
import { fetchCrash } from "./wikiService.js";
import { fetchAllDetails } from "./crashDetailFetcher.js";

const BASE_URL =
  "https://en.wikipedia.org/w/api.php?action=parse&page=List_of_accidents_and_incidents_involving_commercial_aircraft&format=json&origin=*";

const START_YEAR = "1913";
const START_INDEX = 0;
const CONCURRENCY = 5;

async function asyncPool(concurrency, items, fn) {
  const results = [];
  const executing = [];

  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item));
    results.push(p);

    if (concurrency <= items.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.allSettled(results);
}

async function retry(fn, retries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return await fn();
    } catch (err) {
      console.log(`📌 Attempt ${attempt} failed.`);
      if (attempt === retries) throw err;
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }
}

async function scrapeAll() {
  const res = await fetch(BASE_URL, {
    headers: {
      "User-Agent": "FlightIncidentProject/1.0 (contact@example.com)",
      Accept: "application/json",
    },
  });
  const data = await res.json();

  const rawHTML = data.parse.text["*"];
  const dom = new JSDOM(rawHTML);
  const document = dom.window.document;

  const elements = document.querySelectorAll("h2, h3, li");
  const toFetch = [];

  let scraping = false;
  let currentPeriod = "";
  let currentYear = "";
  let currentIndex = 0;

  for (const el of elements) {
    if (el.tagName === "H2") {
      const title = el.textContent.trim();

      if (title.match(/^\d{4}s|^\d{4}s and \d{4}s$/)) {
        scraping = true;
        currentPeriod = title;
        console.log(`\n📌 ${title} başlatıldı`);
      } else {
        scraping = false;
        console.log(`\n🛑 ${title} ile scraping durduruldu`);
      }
    }

    if (el.tagName === "H3") {
      currentYear = el.textContent.trim();

      if (START_YEAR && parseInt(currentYear) < parseInt(START_YEAR)) {
        scraping = false;
      } else {
        scraping = true;
      }
    }

    if (!scraping) continue;

    if (el.tagName === "LI") {
      currentIndex++;
      if (currentIndex < START_INDEX) continue;

      const link = el.querySelector("a");
      if (!link) continue;

      const href = link.getAttribute("href");
      if (!href || !href.startsWith("/wiki/")) continue;

      const pageName = href.split("/wiki/")[1];

      const blacklistPrefixes = [
        "List_of_",
        "Lists_of_",
        "Special:",
        "Template:",
        "Template_talk:",
        "Timeline_of_",
        "Flight_",
        "Category:",
        "Help:",
      ];

      if (
        !pageName ||
        blacklistPrefixes.some((prefix) => pageName.startsWith(prefix))
      )
        continue;

      const summary = el.textContent.trim();

      toFetch.push({
        pageName,
        year: currentYear,
        period: currentPeriod,
        summary,
      });
    }
  }

  console.log(`\n🚀 Toplam ${toFetch.length} uçak kazası fetch edilecek...\n`);

  const results = await asyncPool(
    CONCURRENCY,
    toFetch,
    async ({ pageName, year, period, summary }) => {
      console.log(`Fetching [${year}] -> ${pageName}`);
      try {
        const [crashData, detailData] = await Promise.all([
          retry(() => fetchCrash(pageName)),
          retry(() => fetchAllDetails(pageName)),
        ]);

        return { period, year, ...crashData, details: detailData, summary };
      } catch (err) {
        console.error(`❌ Hata: ${pageName}`, err.message);
        return null;
      }
    },
  );

  const crashList = results
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => r.value);

  console.log(
    `\n📊 ${crashList.length} / ${toFetch.length} başarıyla toplandı`,
  );

  fs.writeFileSync("crashes.json", JSON.stringify(crashList, null, 2));
  console.log("\n✅ JSON FILE IS READY!");
}

scrapeAll();
