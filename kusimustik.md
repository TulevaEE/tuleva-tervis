---
title: Jämesoolevähi küsimustik (v2, rakendatud)
updated: 2026-10-10
author: Tõnu Pekk
source: docs/flow.js
---

# Jämesoolevähi küsimustik

Siin on küsimustik täpselt sellisena, nagu see on rakendatud aadressil https://tulevaee.github.io/tuleva-tervis/. Loogika asub failis `docs/flow.js`. Kui muudad siin reeglit, muuda seda ka seal. Esimene versioon (Doc30) on alles git'i ajaloos, commit `df4979e`.

**Kuidas küsimustik töötab:** küsimused tulevad ükshaaval allpool toodud järjekorras. Esimene „jah“ viib kohe tulemuseni (Option). „Ei“ viib järgmise küsimuse juurde. Kui inimene vastab kõigele „ei“, jõuab ta küsimuse 4.2 juurde.

**Alus** on iga teema juures koht, kuhu kirjutada, mille põhjal me soovituse anname: ravijuhend, allikas või arsti otsus.

## Tulemused

| Option | Pealkiri lehel | Leht |
|---|---|---|
| 1 | Praegu pole vaja midagi teha. Tee küsimustik uuesti 2 aasta pärast | `option-1.html` |
| 2 | Tee koloskoopia | `option-2.html` |
| 3 | Tee FIT-test | `option-3.html` |
| 4 | Mine kiiresti perearsti juurde | `option-4.html` |
| 5 | Järgi oma koloskoopia teinud raviarsti juhiseid (link Option 2-le, kui soovid koloskoopia broneerida meie kaudu) | `option-5.html` |

Kõigil Optioni lehtedel saab inimene oma vastused alla laadida .md või PDF failina. Vastused on ainult tema brauseri vahekaardis ja kaovad selle sulgemisel.

---

## Samm 1. Vaatame, kas juba tegutsed

### 1.1 Kas oled käinud koloskoopias?

- Jah → **Option 5**
- Ei → 2.1

**Alus:**

---

## Samm 2. Kas sul on sümptomeid?

Enne küsimust 2.1 näidatakse teksti „Ei ole? Uurime siis edasi.“

### 2.1 Kas sul on aneemia?

- Jah → **Option 2**
- Ei → 2.2

**Alus:**

### 2.2 Kas sul on veri väljaheites?

- Jah → **Option 2**
- Ei → 2.3

**Alus:**

### 2.3 Kas sul on mõni neist sümptomitest?

Abitekst: „Märgi kõik, mis sobivad.“ Märkeruudud: kõhuvalu, seedetegevuse muutus, kaalulangus.

- Kõik kolm märgitud → **Option 2**
- Üks või kaks märgitud → **Option 4**
- Ükski märkimata → 3.1

**Alus:**

---

## Samm 3. Perekonna anamnees

### 3.1 Kas lähisugulasel on olnud jämesoolevähk enne 50. eluaastat?

Abitekst: „Lähisugulane on vanem, laps, õde või vend.“

- Jah → **Option 2**
- Ei → 3.2

**Alus:**

### 3.2 Kas samal poolel suguvõsast on kahel või enamal lähisugulasel esinenud endomeetriumi-, munasarja-, mao-, peensoole-, kuseteede-, kõhunäärme- või sapiteedevähki või ajukasvajat (glioblastoom)?

- Jah → **Option 2**
- Ei → 3.3

**Alus:**

### 3.3 Kas sul on tehtud geenitest jämesoolevähi tõusnud riski kohta ja see oli positiivne?

- Jah → **Option 2**
- Ei → 3.4

**Alus:**

### 3.4 Kas lähisugulasel on olnud jämesoolevähk 50. eluaastal või hiljem?

- Jah → **Option 3**
- Ei → 4.1

**Alus:**

---

## Samm 4. Vanus ja varasemad testid

### 4.1 Kas oled noorem kui 45 aastat?

- Jah → **Option 1**
- Ei → 4.2

**Alus:**

### 4.2 Kas oled viimase 2 aasta jooksul teinud FIT-testi?

- Jah → **Option 1**
- Ei → **Option 3**

**Alus:**

---

Lehe jaluses on kõigil lehtedel tekst: „See ei ole meditsiiniline diagnoos. Kui sul on muresid tervisega, räägi perearstiga.“
