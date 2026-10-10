// Käivita: node --test tests/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const { isEligible, parseBirthYear, PAID_CLINICS, FIT_LABS, SCREENING_HOSPITALS } = require("../docs/screening.js");

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

// Sünniaasta sisend: ainult 4 numbrit, mitte tulevikus.
test("kehtiv sünniaasta", () => {
  assert.deepStrictEqual(parseBirthYear("1964", 2026), { year: 1964 });
  assert.deepStrictEqual(parseBirthYear(" 2026 ", 2026), { year: 2026 });
});
for (const bad of ["", "196", "19645", "1.964e3", "1964.0", "+1964", "-1964", "abcd", "19 4"]) {
  test(`"${bad}" ei ole neljakohaline aasta`, () => assert.ok(parseBirthYear(bad, 2026).error));
}
test("tulevikuaasta ei sobi", () => assert.match(parseBirthYear("2027", 2026).error, /tulevikus/));
test("liiga vana aasta ei sobi", () => assert.ok(parseBirthYear("1899", 2026).error));
