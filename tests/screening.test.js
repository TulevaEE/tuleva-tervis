// Käivita: node --test tests/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const { isEligible, PAID_CLINICS, FIT_LABS, SCREENING_HOSPITALS } = require("../docs/screening.js");

for (const year of [1958, 1964, 1970]) {
  test(`${year} → sõeluuringu sihtrühmas`, () => assert.strictEqual(isEligible(year), true));
}
for (const year of [1956, 1959, 1971, 1990]) {
  test(`${year} → ei ole sihtrühmas`, () => assert.strictEqual(isEligible(year), false));
}

// Igal pakkujal peab olema nimi, asukoht ja vähemalt üks viis ühendust võtta (apteegid on erand).
for (const [label, items] of [["koloskoopia", PAID_CLINICS], ["FIT", FIT_LABS], ["sõeluuringu haigla", SCREENING_HOSPITALS]]) {
  test(`${label}: igal pakkujal on nimi, asukoht ja kontakt`, () => {
    for (const p of items) {
      assert.ok(p.name && p.place, JSON.stringify(p));
      if (!p.name.startsWith("Apteegid")) assert.ok(p.url || p.phone, p.name);
    }
  });
}
