import fetch from "node-fetch";
import { JSDOM } from "jsdom";

function normalizeDate(dateStr) {
  if (!dateStr) return "Unknown";

  let date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    const months = {
      january: "01",
      february: "02",
      march: "03",
      april: "04",
      may: "05",
      june: "06",
      july: "07",
      august: "08",
      september: "09",
      october: "10",
      november: "11",
      december: "12",
    };

    dateStr = dateStr.toLowerCase();
    const match = dateStr.match(/(\d{1,2})?\s*([a-z]+)\s*(\d{2,4})?/);

    if (match) {
      let day = match[1] || "01";
      let month = months[match[2]];
      let year = match[3] || "1900";

      if (!month) return "Unknown";

      return `${year.padStart(4, "0")}-${month}-${day.padStart(2, "0")}`;
    } else {
      return "Unknown";
    }
  } else {
    return date.toISOString().slice(0, 10);
  }
}

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function removeUnwantedElements(td) {
  td.querySelectorAll("sup, style, span, br, img").forEach((el) => el.remove());
}

function extractField(doc, label) {
  const rows = doc.querySelectorAll("tr");
  for (let row of rows) {
    const th = row.querySelector("th");
    if (th && cleanText(th.textContent) === label) {
      const td = row.querySelector("td");
      removeUnwantedElements(td);
      return cleanText(td.textContent);
    }
  }
  return "Unknown";
}

export async function fetchCrash(pageName) {
  const URL = `https://en.wikipedia.org/w/api.php?action=parse&page=${pageName}&format=json&origin=*`;
  const res = await fetch(URL);
  const data = await res.json();

  const rawHTML = data.parse.text["*"];
  const dom = new JSDOM(rawHTML);
  const doc = dom.window.document;

  const title = data.parse.title;

  // Date
  let date = "Unknown";
  const rows = doc.querySelectorAll("tr");
  for (let row of rows) {
    const th = row.querySelector("th");
    if (!th) continue;
    const label = cleanText(th.textContent);
    if (label === "Date") {
      const td = row.querySelector("td");
      td?.querySelectorAll("sup")?.forEach((sup) => sup.remove());

      let visibleText = "";
      td?.childNodes.forEach((node) => {
        if (node.nodeType === 3) visibleText += node.textContent;
      });

      date = normalizeDate(cleanText(visibleText));
      break;
    }
  }

  // Location, Coordinates
  let site = "Unknown";
  let coordinates = "Unknown";

  for (let row of rows) {
    const th = row.querySelector("th");
    if (!th) continue;

    const label = cleanText(th.textContent);
    if (label === "Site") {
      const td = row.querySelector("td");

      const clonedTd = td.cloneNode(true);
      clonedTd
        .querySelectorAll("style, span, br, img, sup")
        .forEach((el) => el.remove());
      const rawText = clonedTd.textContent.trim().replace(/\s+/g, " ");
      site = rawText
        .replace(site, "")
        .replace(/^[,\s]+/, "")
        .trim();

      const coordSpan = td.querySelector(".geo-dec");
      coordinates = coordSpan ? coordSpan.textContent.trim() : "Unknown";
    }
  }

  return {
    title,
    date,
    aircraftType: extractField(doc, "Aircraft type"),
    operator: extractField(doc, "Operator"),
    occupants: extractField(doc, "Occupants"),
    passengers: extractField(doc, "Passengers"),
    crew: extractField(doc, "Crew"),
    fatalities: extractField(doc, "Fatalities"),
    injuries: extractField(doc, "Injuries"),
    survivors: extractField(doc, "Survivors"),
    summary: extractField(doc, "Summary"),
    site,
    coordinates,
  };
}
