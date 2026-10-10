// Käivita: node --test tests/*.test.js
// Kontrollib kahte asja, mis 10.10.2026 korduvalt käsitsi katki läksid:
// 1) iga kohalik .js/.css fail on kõigil lehtedel sama ?v= versiooniga (muidu jääb mõni leht vana koodi peale);
// 2) kusimustik.md vastab rakendusele: küsimused, abitekstid, tulemuste pealkirjad ja põhjuse laused.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { QUESTIONS } = require("../docs/flow.js");

const DOCS = path.join(__dirname, "..", "docs");
const pages = fs.readdirSync(DOCS).filter((f) => f.endsWith(".html"));
const html = Object.fromEntries(pages.map((f) => [f, fs.readFileSync(path.join(DOCS, f), "utf8")]));
const kusimustik = fs.readFileSync(path.join(__dirname, "..", "kusimustik.md"), "utf8");

test("iga kohalik fail on kõigil lehtedel sama versiooniga", () => {
  const versions = {}; // fail → { versioon → [lehed] }
  for (const [page, s] of Object.entries(html)) {
    for (const [, file, v] of s.matchAll(/(?:src|href)="([\w-]+\.(?:js|css))(?:\?v=(\d+))?"/g)) {
      ((versions[file] ??= {})[v ?? "puudub"] ??= []).push(page);
    }
  }
  for (const [file, byVersion] of Object.entries(versions)) {
    assert.strictEqual(Object.keys(byVersion).length, 1,
      `${file} on lehtedel eri versioonidega: ${JSON.stringify(byVersion)}`);
  }
});

test("kusimustik.md sisaldab kõiki küsimusi ja abitekste", () => {
  for (const q of QUESTIONS) {
    assert.ok(kusimustik.includes(q.text), `küsimus ${q.id} puudub: ${q.text}`);
    if (q.hint) assert.ok(kusimustik.includes(q.hint), `küsimuse ${q.id} abitekst puudub: ${q.hint}`);
    for (const o of q.options || []) assert.ok(kusimustik.includes(o), `küsimuse ${q.id} valik puudub: ${o}`);
  }
});

test("kusimustik.md sisaldab tulemuste pealkirju ja põhjuse lauseid", () => {
  for (const n of [1, 2, 3, 4, 5]) {
    const s = html[`option-${n}.html`];
    const h1 = s.match(/<h1>([^<]+)<\/h1>/)[1].trim();
    assert.ok(kusimustik.includes(h1), `Option ${n} pealkiri puudub: ${h1}`);
    const reasons = s.match(/window\.REASONS = (\{[\s\S]*?\});/);
    if (!reasons) continue;
    for (const [id, text] of Object.entries(JSON.parse(reasons[1]))) {
      assert.ok(kusimustik.includes(text), `Option ${n} põhjuse lause (${id}) puudub: ${text}`);
    }
  }
});
