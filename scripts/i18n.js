/**
 * Script to load locale data from a Google sheet
 *
 * Run: ./i18n.js [sheet name]
 *
 * Column headers should be locale codes, codes that start with an exclamation mark (!) are ignored.
 *
 * The script can optional load a second sheet to overwrite the main sheet, we add a new sheet for a
 * branch so changes for different features are kept separate.
 */


const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const MarkdownIt = require("markdown-it");

async function loadVuetifyLocales() {
  return {
    de:  (await import("vuetify/lib/locale/de.mjs")).default,
    en: (await import("vuetify/lib/locale/en.mjs")).default
  }
}

const simpleMd = new MarkdownIt("zero").enable(["emphasis", "link"]);

const optHandlers = {
  md: (data) => simpleMd.render(data)
};
if (fs.existsSync(path.join(__dirname, ".credentials.json"))) {
  console.log("Using credentials from " + path.join(__dirname, ".credentials.json"));
} else {
  throw new Error("No credentials found");
}

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, ".credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
});

const sheets = google.sheets({ version: "v4", auth });

const localeData = {};

function processKeyData(keyOpts, keyData) {
  if (keyData !== undefined) {
    return (
      keyOpts
        // Apply handlers
        .reduce((data, opt) => optHandlers[opt](data), keyData || "")
        // Santize special i18n character
        .replace(/@/g, "{'@'}")
    );
  }
}

async function loadSheet(name) {
  console.log("Loading sheet " + name);

  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: "19cagWgvcenffTAW4suwBqWyQxvIqOjIjFRy5MaDcoJA",
    range: name
  });

  const headers = resp.data.values[0];
  const rows = resp.data.values
    .slice(1)
    .map((row) => Object.fromEntries(headers.map((header, i) => [header, row[i]])))
    .filter((row) => row.key);

  // Add locales to data
  const locales = headers.filter((h) => h !== "key" && !h.startsWith("!"));
  for (const locale of locales) {
    if (!localeData[locale]) {
      localeData[locale] = {};
    }
  }

  // Construct nested objects from a.b.c key paths
  for (const row of rows) {
    const keyParts = row.key.split(".");
    const [lastKeyPart, ...keyOpts] = keyParts.pop().split(":");

    for (const locale of locales) {
      let localeDataPart = localeData[locale];
      for (const part of keyParts) {
        if (!localeDataPart[part]) {
          localeDataPart[part] = {};
        }
        localeDataPart = localeDataPart[part];
      }
      if (localeDataPart[lastKeyPart] !== undefined) {
        console.log("Duplicate key " + row.key);
      }
      localeDataPart[lastKeyPart] = processKeyData(keyOpts, row[locale]);
    }
  }
}

// Recursively sort for predictable output
function sortObject(obj) {
  const ret = {};
  for (const key of Object.keys(obj).sort()) {
    ret[key] = typeof obj[key] === "object" ? sortObject(obj[key]) : obj[key];
  }
  return ret;
}

(async () => {
  await loadSheet("Sheet1");
  const vuetifyLocales = await loadVuetifyLocales();

  if (process.argv[2] && process.argv[2] !== "main") {
    try {
      await loadSheet(process.argv[2]);
    } catch {}
  }

  for (const locale in localeData) {
    console.log("Updating " + locale);
    const localData = {...localeData[locale], $vuetify: vuetifyLocales[locale]};
    fs.writeFileSync(
      path.join(__dirname, "../locales", locale + ".json"),
      JSON.stringify(sortObject(localData), null, 2) + "\n"
    );
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
