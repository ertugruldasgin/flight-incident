import fetch from "node-fetch";
import fs from "fs";
import { JSDOM } from "jsdom";
import { fetchCrash } from "./wikiService.js";
import { fetchAllDetails } from "./crashDetailFetcher.js";

const BASE_URL =
  "https://en.wikipedia.org/w/api.php?action=parse&page=List_of_accidents_and_incidents_involving_commercial_aircraft&format=json&origin=*";

const START_YEAR = "1913";
const START_INDEX = 0; // 0 dersen yıl bazlı baslar override edilebilir

async function retry(fn, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      console.log(`📌 Attempt ${attempt} failed.`);
      if (attempt === retries) throw err;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function scrapeAll() {
  const res = await fetch(BASE_URL);
  const data = await res.json();

  const rawHTML = data.parse.text["*"];
  const dom = new JSDOM(rawHTML);
  const document = dom.window.document;

  const elements = document.querySelectorAll("h2, h3, li");
  const crashList = [];

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

      console.log(`\nFetching [${currentYear}] -> ${pageName}`);

      try {
        const crashData = await retry(() => fetchCrash(pageName));
        const detailData = await retry(() => fetchAllDetails(pageName));

        crashList.push({
          period: currentPeriod,
          year: currentYear,
          ...crashData,
          details: detailData,
          summary,
        });
      } catch (err) {
        console.error("\u274C Hata:", pageName, err);
      }
    }
  }

  fs.writeFileSync("crashes.json", JSON.stringify(crashList, null, 2));
  console.log("\n✅ JSON FILE IS READY!");
}

scrapeAll();
