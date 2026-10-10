// Riikliku jämesoolevähi sõeluuringu sihtrühm ja pakkujate lugemine failist providers.md.
// Sihtrühm on määratud sünniaastate järgi ja muutub igal aastal – uuenda aastavahetusel.

const SCREENING_YEAR = 2026;
const SCREENING_BIRTH_YEARS = [1958, 1960, 1962, 1964, 1966, 1968, 1970];

// --- providers.md lugemine ---
// Option 2 ja 3 lehed laevad providers.md iga kord värskelt ja loevad tabelid veerunimede järgi.
// Kui muudad tabelite veergude nimesid, muuda ka siin.

// Tagastab { "<## pealkiri>": [ { veerunimi: lahter, ... } ] }.
function markdownTables(md) {
  const tables = {};
  const cells = (line) => line.trim().slice(1, -1).split("|").map((c) => c.trim());
  const lines = md.split("\n");
  let heading = "";
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) heading = lines[i].slice(3).trim();
    if (!lines[i].startsWith("|") || !/^\|[-|\s]+\|$/.test((lines[i + 1] || "").trim())) continue;
    const header = cells(lines[i]);
    const rows = [];
    for (i += 2; i < lines.length && lines[i].startsWith("|"); i++) {
      const c = cells(lines[i]);
      rows.push(Object.fromEntries(header.map((h, j) => [h, c[j] || ""])));
    }
    tables[heading] = rows;
  }
  return tables;
}

const plain = (s) => (s || "").replace(/\\?\*+/g, "").replace(/`/g, "").trim();
const linkUrl = (s) => ((s || "").match(/\]\(([^)]+)\)/) || [])[1];
const phone = (s) => ((s || "").match(/\+?\d[\d ]{3,}\d/) || [])[0];
const price = (s) => ((s || "").match(/^\d[\d,.]*/) || [])[0];
const notes = (...xs) => xs.map(plain).filter(Boolean).join(" · ") || undefined;

// Tuleva kupong kujul "`KOOD` 0%". Kupongid on häkatoni näidised – kokkuleppeid pakkujatega veel pole.
function coupon(s) {
  const m = (s || "").match(/`([^`]+)`\s*(\S+%)/);
  return m ? { code: m[1], discount: m[2] } : undefined;
}

// Muudab providers.md kolmeks nimekirjaks, mida tulemuslehed näitavad.
function parseProviders(md) {
  const t = markdownTables(md);
  const table = (re) => t[Object.keys(t).find((h) => re.test(h))] || [];
  const fit = table(/FIT/);
  const colo = table(/Koloskoopia/i);

  return {
    updated: (md.match(/Andmed kogutud ([\d.]+\d)/) || [])[1],
    // Tasuline FIT eraisikule: "tasuline analüüs" või kodune kiirtest. Ainult sõeluuringu laborid jäävad välja.
    fitLabs: fit.filter((r) => /tasuline|kodune/i.test(r["Teenuse tüüp"])).map((r) => ({
      name: plain(r["Teenusepakkuja"]),
      place: plain(r["Asukoht"]),
      price: price(r["Hind (€)"]),
      how: plain(r["Kuidas saada"]) || undefined,
      note: notes(r["Märkused"]),
      phone: phone(r["Telefon"]),
      url: linkUrl(r["Registreerimine / tellimine"]),
      coupon: coupon(r["Tuleva kupong"]),
    })),
    // Sõelkoloskoopia haiglad (tasuta, perearsti saatekirjaga).
    screeningHospitals: colo.filter((r) => /sõelkoloskoopia/i.test(r["Tüüp"])).map((r) => ({
      name: plain(r["Teenusepakkuja"]),
      place: plain(r["Asukoht"]),
      note: notes(r["Märkused"]),
      phone: phone(r["Telefon"]),
      url: linkUrl(r["Registreerimine"]),
    })),
    // Tasulised kliinikud ilma saatekirjata. "Kinnitamata" read jäävad välja.
    paidClinics: colo.filter((r) => /^tasuline/i.test(r["Tüüp"])).map((r) => ({
      name: plain(r["Teenusepakkuja"]),
      place: plain(r["Asukoht"]),
      price: price(r["Koloskoopia (€)"]),
      sedation: price(r["Narkoosis (€)"]),
      note: notes(r["Hinna märkus"], r["Märkused"]),
      phone: phone(r["Telefon"]),
      url: linkUrl(r["Registreerimine"]),
      coupon: coupon(r["Tuleva kupong"]),
    })),
  };
}

// Kupongiga pakkujad ettepoole; muidu jääb järjekord samaks (sort on stabiilne).
function byCoupon(items) {
  return [...items].sort((a, b) => Boolean(b.coupon) - Boolean(a.coupon));
}

function isEligible(birthYear) {
  return SCREENING_BIRTH_YEARS.includes(birthYear);
}

// Sünniaasta sisend: täpselt 4 numbrit, 1900 kuni käesolev aasta (tulevikku ei luba).
// Tagastab { year } või { error } veateatega.
function parseBirthYear(value, currentYear = new Date().getFullYear()) {
  const text = String(value).trim();
  if (!/^\d{4}$/.test(text)) return { error: "Sünniaastas peab olema 4 numbrit." };
  const year = Number(text);
  if (year < 1900 || year > currentYear) {
    return { error: `Sünniaasta peab olema vahemikus 1900–${currentYear}.` };
  }
  return { year };
}

if (typeof module !== "undefined") {
  module.exports = { SCREENING_YEAR, SCREENING_BIRTH_YEARS, parseProviders, byCoupon, isEligible, parseBirthYear };
}
