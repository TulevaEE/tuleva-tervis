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
