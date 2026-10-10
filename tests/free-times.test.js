// Käivita: node --test tests/*.test.js
const test = require("node:test");
const assert = require("node:assert");
const { cellText, setCell } = require("../scripts/update-free-times.js");
const { parseProviders } = require("../docs/screening.js");

const md = `## Koloskoopia

| Teenusepakkuja | Tüüp | Märkused | Järgmine vaba aeg |
|---|---|---|---|
| Confido | Tasuline |  | — |
| Medicum | Tasuline | Ka narkoosis | — |

## Allikad

| Allikas | URL |
|---|---|
| Confido | https://confido.ee |
`;

test("vaba aja lahter", () => {
  assert.strictEqual(cellText({ at: "2026-10-12T13:30:00", name: "Gastroenteroloogi vastuvõtt" }),
    "2026-10-12 13:30 · Gastroenteroloogi vastuvõtt");
  assert.strictEqual(cellText(null), "—");
});

test("setCell muudab ainult õige tabeli õiget rida", () => {
  const out = setCell(md, "Confido", "Järgmine vaba aeg", "2026-10-12 13:30 · Gastroenteroloogi vastuvõtt");
  assert.match(out, /\| Confido \| Tasuline \|  \| 2026-10-12 13:30 · Gastroenteroloogi vastuvõtt \|/);
  assert.match(out, /\| Medicum \| Tasuline \| Ka narkoosis \| — \|/);
  assert.match(out, /\| Confido \| https:\/\/confido\.ee \|/); // allikate tabel jääb puutumata
});

test("leht loeb vaba aja providers.md-st", () => {
  const filled = setCell(md, "Confido", "Järgmine vaba aeg", "2026-10-12 13:30 · Gastroenteroloogi vastuvõtt");
  const [confido, medicum] = parseProviders(filled).paidClinics;
  assert.deepStrictEqual(confido.nextSlot, { date: "2026-10-12", time: "13:30", label: "Gastroenteroloogi vastuvõtt" });
  assert.strictEqual(medicum.nextSlot, undefined);
});
