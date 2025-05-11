import fs from "fs/promises";

async function prependCrash() {
  const [rawMain, rawExtra] = await Promise.all([
    fs.readFile("crashes.json", "utf-8"),
    fs.readFile("handwritten_crashes.json", "utf-8"),
  ]);

  const mainCrashes = JSON.parse(rawMain);
  const handwritten = JSON.parse(rawExtra);

  const toAdd = Array.isArray(handwritten) ? handwritten : [handwritten];

  const combined = [...toAdd, ...mainCrashes];

  await fs.writeFile(
    "crashes.json",
    JSON.stringify(combined, null, 2),
    "utf-8"
  );

  console.log("✅ Added to the beginning of crashes.json");
}

prependCrash().catch(console.error);
