// Käivita: node --test tests/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { searchDoctors, registerUrl } = require("../docs/gp-search.js");
const { toListEntry, titleCase } = require("../scripts/update-gp-lists.js");

const lists = [
  { id: "a1", code: "N0001", doctor: "Mari Tamm", practice: "Tamme Perearstikeskus OÜ", area: "Tartu linn" },
  { id: "a2", code: "N0002", doctor: "Mari-Liis Õunapuu", practice: "Õuna OÜ", area: "Rae vald" },
  { id: "a3", code: "N0003", doctor: "Jaan Mets", practice: "Metsa OÜ", area: "Pärnu linn" },
];
const names = (xs) => xs.map((x) => x.doctor);

test("perearsti otsing nime algustähtede järgi", () => {
  assert.deepStrictEqual(names(searchDoctors(lists, "mari")), ["Mari Tamm", "Mari-Liis Õunapuu"]);
  assert.deepStrictEqual(names(searchDoctors(lists, "mar tam")), ["Mari Tamm"]);
  assert.deepStrictEqual(names(searchDoctors(lists, "liis")), ["Mari-Liis Õunapuu"]);
  assert.deepStrictEqual(names(searchDoctors(lists, "ounap")), ["Mari-Liis Õunapuu"]); // ilma täpitähtedeta
  assert.deepStrictEqual(searchDoctors(lists, "m"), []); // liiga lühike
  assert.deepStrictEqual(searchDoctors(lists, "tamm x"), []);
});

test("link viib registri nimistu lehele", () => {
  assert.strictEqual(registerUrl(lists[0]), "https://medre.tehik.ee/general-practitioner-lists/a1");
});

test("registri nimistu → indeksi kirje ilma kontaktideta", () => {
  assert.strictEqual(titleCase("MARI-LIIS ÕUNAPUU"), "Mari-Liis Õunapuu");
  const list = {
    id: "f657efa0", code: "N0529", status: "IN_REGISTER",
    generalPractitioner: { firstName: "JELENA", lastName: "KISSELJOVA" },
    licenses: [{ companyName: "Järve Tervisekeskus OÜ" }],
    serviceArea: { values: ["Kohtla-Järve linn"] },
    contacts: [{ email: "jelena@jtkeskus.ee", phone: "3395154" }],
  };
  assert.deepStrictEqual(toListEntry(list), { id: "f657efa0", code: "N0529", doctor: "Jelena Kisseljova",
    practice: "Järve Tervisekeskus OÜ", area: "Kohtla-Järve linn" });
  assert.strictEqual(toListEntry({ ...list, status: "IN_PROCEEDING" }), null);
  assert.strictEqual(toListEntry({ ...list, generalPractitioner: {} }), null);
});

test("gp-lists.json: igal kirjel id ja nimi, e-posti ega telefoni pole", () => {
  const raw = fs.readFileSync(path.join(__dirname, "../docs/gp-lists.json"), "utf8");
  const { lists: all } = JSON.parse(raw);
  assert.ok(all.length > 500, `liiga vähe nimistuid: ${all.length}`);
  for (const l of all) assert.ok(l.id && l.doctor, JSON.stringify(l));
  assert.ok(!/"(email|phone)"/.test(raw), "failis ei tohi olla e-posti ega telefoni");
  assert.ok(!/@/.test(raw), "failis ei tohi olla e-posti aadresse");
});
