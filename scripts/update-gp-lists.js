// Koostab docs/gp-lists.json: perearstide nimistute avalik indeks (nimi, praksis, piirkond, registri id).
// E-posti ega telefoni EI salvesta – need on registri nimistu lehel medre.tehik.ee/general-practitioner-lists/{id}.
// Allikas: Tervishoiutöötajate register (medre.tehik.ee, avalik nimistute otsing).
// Käivita käsitsi: node scripts/update-gp-lists.js, seejärel commit ja push.
// Register ei luba päringuid teistelt veebilehtedelt (CORS), seepärast otsib leht selles failis.
const fs = require("node:fs");
const path = require("node:path");

const FILE = path.join(__dirname, "../docs/gp-lists.json");
const API = "https://medre.tehik.ee/api-common/public/general-practitioner-lists/filter";
const PAUSE_MS = 300; // viisakas tempo: üks päring korraga

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// "ARTUR" → "Artur", "MARI-LIIS" → "Mari-Liis"
const titleCase = (s) => (s || "").toLowerCase().replace(/(^|[\s-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());

// Registri nimistu → üks rida indeksis. Ainult registris olevad ja perearstiga nimistud.
function toListEntry(list) {
  const gp = list.generalPractitioner || {};
  if (list.status !== "IN_REGISTER" || !list.id || !gp.lastName) return null;
  return {
    id: list.id,
    code: list.code,
    doctor: `${titleCase(gp.firstName)} ${titleCase(gp.lastName)}`.trim(),
    practice: ((list.licenses || [])[0] || {}).companyName || "",
    area: ((list.serviceArea || {}).values || []).join(", "),
  };
}

async function main() {
  const lists = [];
  for (let page = 0; ; page++) {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, size: 100 }),
    });
    if (!res.ok) throw new Error(`Register: HTTP ${res.status}`);
    const body = await res.json();
    lists.push(...body.content.map(toListEntry).filter(Boolean));
    if (page + 1 >= body.totalPages) break;
    await sleep(PAUSE_MS);
  }
  lists.sort((a, b) => a.doctor.localeCompare(b.doctor, "et"));
  fs.writeFileSync(FILE, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), lists }) + "\n");
  console.log(`Kirjutatud ${lists.length} perearsti nimistut → docs/gp-lists.json`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });
}

module.exports = { toListEntry, titleCase };
