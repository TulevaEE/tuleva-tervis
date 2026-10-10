# tuleva-tervis
Tuleva hackaton project to create an app for early screening of colon cancer

> **Working here (human or AI)? Read [CLAUDE.md](./CLAUDE.md) first** — design principles and the hard safety/pathway guardrails. Background for the team: [docs/clinical-background.md](./docs/clinical-background.md) (evidence, validation, pathway, terminology, sources) · [docs/design-principles.md](./docs/design-principles.md) (behavioural design & copy templates).

## Veebirakendus

Küsimustik asub kaustas `docs/` ja on avaldatud aadressil https://tulevaee.github.io/tuleva-tervis/. Loogika on failis `docs/flow.js` ja testid käivitad käsuga `node --test tests/*.test.js`.

## Failid

| Fail või kaust | Mis seal on |
|---|---|
| `docs/` | Veebirakendus (GitHub Pages): avaleht, vaheleht `jamesoolevahk.html`, tulemuste lehed `option-1…5.html`, loogika `flow.js`, pakkujad `providers.md` |
| `kusimustik.md` | Küsimustik ja tulemuste tekstid täpselt nagu rakenduses, „Alus“ read kliinilise aluse jaoks. Test kontrollib, et see vastab rakendusele |
| `CLAUDE.md`, `AGENTS.md` | Reeglid kõigile, kes repos töötavad (inimesed ja AI), sh PR-i kontrollnimekiri |
| `backlog.md` | Ideed ja lahtised asjad, mida hiljem kaaluda |
| `ulevaade-knowledge-base.md` | Küsimustiku kriitiline ülevaade `knowledge base/` allikate põhjal (leiud L1–L11) |
| `tagasiside.md` | Kasutajate tagasiside |
| `knowledge base/` | Allikad: USPSTF 2021, dr Mari Sethi artikkel jt |
| `kirjeldus.md` | Häkatoni algne kirjeldus: visioon, teekaart, keda on vaja |
| `pitch/` | Esitluse näidised (ei ole veebis avaldatud) |
| `screencast/` | Pitchi videod; uuesti salvestamiseks `scripts/record-screencast.js` |
| `tests/` | `flow.test.js` (suunamine), `screening.test.js` (sihtrühm, pakkujad), `consistency.test.js` (versioonid ja `kusimustik.md`) |
