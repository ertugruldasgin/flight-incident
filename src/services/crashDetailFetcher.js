import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const sectionAliases = {
  aircraft: ["Aircraft", "Aircraft_and_crew"],
  incident: [
    "Accident",
    "Accident_details",
    "Crash",
    "Incident",
    "Hijacking",
    "Events",
    "Subsequent_events",
    "Overview",
  ],
  investigation: [
    "Investigation",
    "Inquest",
    "Public_Inquiry",
    "Crash_investigation_and_report",
  ],
  cause: [
    "Cause",
    "Causes",
    "Cause_of_crash",
    "Motives",
    "Probable_cause",
    "Engine_failure",
    "Controversy",
  ],
  timeline: [
    "Timeline",
    "Flight",
    "Accident_sequence",
    "Sequence_of_events",
    "Flight_history",
  ],
  casualties: ["Injuries", "Casualties", "Fatalities"],
};

function cleanText(text) {
  return text
    .replace(/\[\d+\]/g, "")
    .replace(/\[citation needed\]/gi, "")
    .replace(/\[[a-z]\]/gi, "")
    .trim();
}

function getParagraphsAfterHeader(doc, headerId) {
  const headerSpan = doc.querySelector(`#${headerId}`);
  if (!headerSpan) return null;

  const headingDiv = headerSpan.closest(".mw-heading");
  if (!headingDiv) return null;

  let current = headingDiv.nextElementSibling;
  const paragraphs = [];

  while (current && !current.classList.contains("mw-heading")) {
    if (current.tagName === "P") {
      const clean = cleanText(current.textContent);
      if (clean.length > 0) paragraphs.push(clean);
    }
    current = current.nextElementSibling;
  }

  return paragraphs.length > 0 ? paragraphs : null;
}

export async function fetchAllDetails(pageName) {
  const URL = `https://en.wikipedia.org/w/api.php?action=parse&page=${pageName}&format=json&origin=*`;
  const res = await fetch(URL);
  const data = await res.json();

  const rawHTML = data.parse.text["*"];
  const dom = new JSDOM(rawHTML);
  const doc = dom.window.document;

  doc
    .querySelectorAll("sup, style, span, br, img")
    .forEach((el) => el.remove());

  const groupedSections = {};

  for (const [groupName, aliases] of Object.entries(sectionAliases)) {
    const groupContent = [];

    for (const alias of aliases) {
      const content = getParagraphsAfterHeader(doc, alias);
      if (content) {
        groupContent.push(...content);
      }
    }

    if (groupContent.length > 0) {
      groupedSections[groupName] = groupContent;
    }
  }

  if (Object.keys(groupedSections).length === 0) {
    const allParagraphs = [...doc.querySelectorAll(".mw-parser-output > p")];
    const validParagraphs = allParagraphs
      .map((p) => cleanText(p.textContent))
      .filter((text) => text.length > 0);

    if (validParagraphs.length > 0) {
      groupedSections["incident"] = validParagraphs;
    }
  }

  return groupedSections;
}
