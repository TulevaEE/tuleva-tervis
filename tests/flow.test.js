// Käivita: node --test tests/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const { run } = require("../docs/flow.js");

const Y = true, N = false;

test("koloskoopias käinud → Option 5", () => assert.strictEqual(run([Y]), 5));
test("aneemia → Option 2", () => assert.strictEqual(run([N, Y]), 2));
test("veri väljaheites → Option 2", () => assert.strictEqual(run([N, N, Y]), 2));
test("kõik kolm sümptomit → Option 2", () => assert.strictEqual(run([N, N, N, 3]), 2));
test("üks sümptom → Option 4", () => assert.strictEqual(run([N, N, N, 1]), 4));
test("kaks sümptomit → Option 4", () => assert.strictEqual(run([N, N, N, 2]), 4));
test("sugulane alla 50 → Option 2", () => assert.strictEqual(run([N, N, N, 0, Y]), 2));
test("Lynchi-tüüpi suguvõsa → Option 2", () => assert.strictEqual(run([N, N, N, 0, N, Y]), 2));
test("positiivne geenitest → Option 2", () => assert.strictEqual(run([N, N, N, 0, N, N, Y]), 2));
test("sugulane hiljem → Option 3", () => assert.strictEqual(run([N, N, N, 0, N, N, N, Y]), 3));
test("alla 45 → Option 1", () => assert.strictEqual(run([N, N, N, 0, N, N, N, N, Y]), 1));
test("FIT viimase 2 a jooksul → Option 1", () => assert.strictEqual(run([N, N, N, 0, N, N, N, N, N, Y]), 1));
test("kõik ei → Option 3", () => assert.strictEqual(run([N, N, N, 0, N, N, N, N, N, N]), 3));

// "Ei tea" liigub edasi nagu "ei" (app.js annab answer()-ile false); märkus näitab, kuhu "jah" oleks viinud.
const { QUESTIONS, unsureNote } = require("../docs/flow.js");
test("Ei tea on küsimustel 2.1, 3.1, 3.2, 3.4", () =>
  assert.deepStrictEqual(QUESTIONS.filter((q) => q.unsure).map((q) => q.id), ["2.1", "3.1", "3.2", "3.4"]));
const row = (id, a) => { const q = QUESTIONS.find((x) => x.id === id); return { id, a, yes: q.yes, short: q.short, findOut: q.findOut }; };
test("ei tea 3.1 → Option 3 juures märkus koloskoopia kohta", () => {
  const n = unsureNote([row("3.1", "Ei tea"), row("3.4", "Ei")], 3);
  assert.strictEqual(n.target, "kohe koloskoopiasse");
  assert.deepStrictEqual(n.questions, ["lähisugulase jämesoolevähk enne 50. eluaastat"]);
});
test("ei tea 3.4 → Option 1 juures märkus peitvere testi kohta", () =>
  assert.strictEqual(unsureNote([row("3.4", "Ei tea")], 1).target, "peitvere testi juurde"));
test("ei tea 3.4 → Option 3 juures märkust pole (jah viiks samasse)", () =>
  assert.strictEqual(unsureNote([row("3.4", "Ei tea")], 3), null));
test("mitu ei tea → ettevaatlikum (koloskoopia)", () =>
  assert.strictEqual(unsureNote([row("3.4", "Ei tea"), row("3.2", "Ei tea")], 1).target, "kohe koloskoopiasse"));
test("ilma ei tea vastuseta märkust pole", () => assert.strictEqual(unsureNote([row("3.1", "Ei")], 3), null));
test("ei tea aneemia + suguvõsa → mõlemad juhised", () =>
  assert.deepStrictEqual(unsureNote([row("2.1", "Ei tea"), row("3.1", "Ei tea")], 3).findOut,
    ["küsi perearstilt vereanalüüsi kohta", "küsi sugulastelt"]));
