// Käivita: node --test tests/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { isEligible, parseBirthYear, byCoupon, parseProviders } = require("../docs/screening.js");

// Sama fail, mida Option 2 ja 3 lehed brauseris laevad.
const md = fs.readFileSync(path.join(__dirname, "../docs/providers.md"), "utf8");
const { paidClinics, fitLabs, screeningHospitals, updated } = parseProviders(md);
const names = (xs) => xs.map((p) => p.name);

for (const year of [1958, 1964, 1970]) {
  test(`${year} → sõeluuringu sihtrühmas`, () => assert.strictEqual(isEligible(year), true));
}
for (const year of [1956, 1959, 1971, 1990]) {
  test(`${year} → ei ole sihtrühmas`, () => assert.strictEqual(isEligible(year), false));
}

// Igal pakkujal peab olema nimi, asukoht ja vähemalt üks viis ühendust võtta (apteegid on erand).
for (const [label, items] of [["koloskoopia", paidClinics], ["FIT", fitLabs], ["sõeluuringu haigla", screeningHospitals]]) {
  test(`${label}: igal pakkujal on nimi, asukoht ja kontakt`, () => {
    for (const p of items) {
      assert.ok(p.name && p.place, JSON.stringify(p));
      if (!p.name.startsWith("Apteegid")) assert.ok(p.url || p.phone, p.name);
    }
  });
}

// Sünniaasta: täpselt 4 numbrit ja vahemikus 1900 kuni käesolev aasta.
test("kehtiv sünniaasta", () => {
  assert.deepStrictEqual(parseBirthYear("1964", 2026), { year: 1964 });
  assert.deepStrictEqual(parseBirthYear("1900", 2026), { year: 1900 });
  assert.deepStrictEqual(parseBirthYear("2026", 2026), { year: 2026 });
});
for (const bad of ["", "196", "19645", "1.964e3", "+1964", "abcd"]) {
  test(`"${bad}" → pikkuse viga`, () => assert.match(parseBirthYear(bad, 2026).error, /4 numbrit/));
}
for (const bad of ["1899", "2027"]) {
  test(`${bad} → vahemiku viga`, () => assert.match(parseBirthYear(bad, 2026).error, /1900–2026/));
}

// providers.md lugemine: õiged read õigetesse nimekirjadesse.
test("providers.md: tasulised koloskoopia kliinikud", () => {
  assert.deepStrictEqual(names(paidClinics), ["Confido", "Medicum"]); // Med4U on kinnitamata
  const medicum = paidClinics.find((p) => p.name === "Medicum");
  assert.deepStrictEqual(medicum.coupon, { code: "TULEVADISCOUNT", discount: "0%" });
  assert.strictEqual(medicum.price, "450");
  assert.strictEqual(paidClinics[0].sedation, "900");
});
test("providers.md: sõelkoloskoopia haiglad", () => {
  assert.deepStrictEqual(names(screeningHospitals),
    ["Põhja-Eesti Regionaalhaigla", "Ida-Tallinna Keskhaigla", "Tartu Ülikooli Kliinikum", "Pärnu Haigla"]);
  assert.strictEqual(screeningHospitals[0].phone, "617 1049");
});
test("providers.md: tasuline FIT (ilma ainult-sõeluuringu laborite ja perearstita)", () => {
  assert.deepStrictEqual(names(fitLabs), ["Ida-Tallinna Keskhaigla", "Tartu Ülikooli Kliinikum (ühendlabor)",
    "Lääne-Tallinna Keskhaigla", "SYNLAB Eesti", "Apteegid (Benu, Apotheka, Südameapteek jt)"]);
  assert.strictEqual(fitLabs[1].price, "13,99");
  assert.strictEqual(fitLabs[3].url, "https://ee.minu.synlab.ee/peitveri-roojas/");
});
test("providers.md: andmete kuupäev", () => assert.match(updated, /^\d{1,2}\.\d{1,2}\.\d{4}$/));

test("sooduskoodiga pakkujad on eespool, muu järjekord ei muutu", () => {
  assert.deepStrictEqual(names(byCoupon(paidClinics)), ["Medicum", "Confido"]);
  assert.deepStrictEqual(names(byCoupon(fitLabs)), ["SYNLAB Eesti", "Apteegid (Benu, Apotheka, Südameapteek jt)",
    "Ida-Tallinna Keskhaigla", "Tartu Ülikooli Kliinikum (ühendlabor)", "Lääne-Tallinna Keskhaigla"]);
});
