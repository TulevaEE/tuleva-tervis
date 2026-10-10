---
title: Jämesoolevähi küsimustik (v3, rakendatud)
updated: 2026-10-10
author: Tõnu Pekk
source: docs/flow.js, docs/option-1…5.html, docs/jamesoolevahk.html
---

# Jämesoolevähi küsimustik

See dokument kirjeldab küsimustikku ja tulemuste lehti täpselt nii, nagu need on rakendatud aadressil https://tulevaee.github.io/tuleva-tervis/. Loogika on failis `docs/flow.js` ja tulemuste tekstid failides `docs/option-1…5.html`. Kui muudad siin reeglit või teksti, muuda seda ka rakenduses, ja vastupidi. Esimene versioon (Doc30) on alles git'i ajaloos, commit `df4979e`.

**Alus** on iga küsimuse juures koht, kuhu kirjutada, mille põhjal me soovituse anname: ravijuhend, allikas või arsti otsus. Sobivad allikad on loetletud failis `ulevaade-knowledge-base.md` (K2).

## Teekond

1. **Avaleht** (`index.html`) tutvustab mõttekatset. Nupp „Esimene asi: ennetame jämesoolevähki →“ viib vahelehele.
2. **Vaheleht** (`jamesoolevahk.html`), „Jämesoolevähi varajane avastamine“, sisaldab:
   - koht dr Mari Sethi videole;
   - „Miks see on oluline“;
   - kaks peamist uuringut: väljaheite peitvere test (FIT) ja koloskoopia;
   - „Kumb sulle sobib?“: 45+ ilma kaebusteta tavaliselt peitvere test, mõnel kohe koloskoopia;
   - nupp „Tee küsimustik (2 min)“;
   - „Kui juba tead, mida tahad“: otse Option 3 (peitvere test) või Option 2 (koloskoopia) lehele;
   - „Miks teha seda Tuleva kaudu?“.
3. **Küsimustik** (`index.html#alusta`): küsimused tulevad ükshaaval allpool toodud järjekorras. Esimene „jah“ viib kohe tulemuse lehele. „Ei“ viib järgmise küsimuse juurde. Kes vastab kõigele „ei“, jõuab küsimuse 4.2 juurde. Edenemisriba näitab sammu (nt „Samm 2/4“) ja „← Eelmine küsimus“ viib tagasi.
4. **Tulemuse leht** (Option 1–5), vaata allpool.

---

## Küsimused

### Samm 1. Vaatame, kas juba tegutsed

#### 1.1 Kas sul on viimase 5 aasta jooksul tehtud koloskoopia?

- Jah → **Option 5**
- Ei → 2.1

**Alus:**

### Samm 2. Kas sul on sümptomeid?

Enne küsimust 2.1 näidatakse teksti „Ei ole? Uurime siis edasi.“

#### 2.1 Kas sul on aneemia?

Abitekst: „Siin mõtleme rauavaegusaneemiat ehk rauapuudusest tingitud kehvveresust. Selle tuvastab arst vereanalüüsi põhjal. Märgi „jah“, kui arst on selle sul tuvastanud.“

- Jah → **Option 2**. Põhjuse lause: „Sa märkisid, et sul on rauavaegusaneemia. Aneemial on palju põhjuseid ja enamik neist on healoomulised — kuid et tõsisem põhjus kindlalt välistada, tasub teha täpsem uuring.“
- Ei → 2.2

**Alus:**

#### 2.2 Kas oled märganud verd väljaheites?

Abitekst: „Nähtav veri väljaheites või tualettpaberil.“

- Jah → **Option 2**. Põhjuse lause: „Sa märkisid, et oled näinud verd väljaheites. Kõige sagedam põhjus on healoomuline (näiteks hemorroidid) — kindluse mõttes tasub see siiski täpsema uuringuga üle vaadata.“
- Ei → 2.3

**Alus:**

#### 2.3 Kas sul on mõni neist sümptomitest?

Abitekst: „Märgi vaid need, millele sa ei tea kindlat põhjust — mitte neid, mille põhjust sa tead (nt menstruatsioon või teadaolev haigus).“

Märkeruudud:
- Seletamatu kõhuvalu (mitte menstruatsiooni ajal)
- Seedetegevuse muutus üle 4 nädala
- Seletamatu kaalulangus

Suunamine:
- Kõik kolm märgitud → **Option 2**. Põhjuse lause: „Sa märkisid korraga mitu sümptomit, mida tasub koos põhjalikumalt uurida.“
- Üks või kaks märgitud → **Option 4**
- Ükski märkimata → 3.1

**Alus:**

### Samm 3. Su suguvõsa tervis

#### 3.1 Kas lähisugulasel on olnud jämesoolevähk enne 50. eluaastat?

Abitekst: „Lähisugulane on vanem, laps, õde või vend.“

- Jah → **Option 2**. Põhjuse lause: „Lähisugulasel oli jämesoolevähk enne 50. eluaastat. See tõstab sinu riski.“
- Ei → 3.2

**Alus:**

#### 3.2 Kas samal poolel suguvõsast on kahel või enamal lähisugulasel esinenud endomeetriumi-, munasarja-, mao-, peensoole-, kuseteede-, kõhunäärme- või sapiteedevähki või ajukasvajat (glioblastoom)?

Abitekst: „See loetelu aitab märgata pärilikku vähiriski. „Samal poolel“ tähendab kas ema või isa suguvõsa. Märgi „jah“, kui mitmel su veresugulasel samal poolel on olnud mõni neist vähkidest.“

- Jah → **Option 2**. Põhjuse lause: „Su suguvõsas on mitmel lähisugulasel esinenud vähke, mis võivad viidata päritavale kõrgemale riskile.“
- Ei → 3.3

**Alus:**

#### 3.3 Kas sul on tehtud geenitest jämesoolevähi tõusnud riski kohta ja see oli positiivne?

- Jah → **Option 2**. Põhjuse lause: „Sulle tehtud geenitest näitas jämesoolevähi kõrgemat riski.“
- Ei → 3.4

**Alus:**

#### 3.4 Kas lähisugulasel on olnud jämesoolevähk 50. eluaastal või hiljem?

- Jah → **Option 3**. Põhjuse lause: „Lähisugulasel oli jämesoolevähk 50-aastaselt või hiljem. See tõstab su riski veidi — kuid mitte nii palju, et minna kohe koloskoopiasse.“
- Ei → 4.1

**Alus:**

### Samm 4. Vanus ja varasemad testid

#### 4.1 Kas oled noorem kui 45 aastat?

- Jah → **Option 1**. Põhjuse lause: „Tubli, et kontrollisid! Oled alla 45-aastane ega märkinud sümptomeid ega teadaolevat kõrgemat riski — sinu eas on jämesoolevähk harv.“
- Ei → 4.2

**Alus:**

#### 4.2 Kas oled viimase 2 aasta jooksul teinud väljaheite peitvere testi (FIT)?

- Jah → **Option 1**. Põhjuse lause: „Tubli, et kontrollisid! Tegid viimase kahe aasta jooksul peitvere testi ega märkinud uusi sümptomeid.“
- Ei → **Option 3**. Põhjuse lause: „Oled 45-aastane või vanem ega ole viimase kahe aasta jooksul peitvere testi teinud.“

**Alus:**

---

## Tulemuste lehed

Iga lehe ülesehitus on sama:
1. pealkiri;
2. põhjuse lause: valitakse küsimuse järgi, mis lehele viis (vt küsimuste juures). Kui küsimust pole (nt otse vahelehelt tulles), näidatakse üldist lauset;
3. järgmine samm, tegevus on paksus kirjas;
4. lahtikäiv plokk „Miks see on sinu jaoks õige?“;
5. lisaplokk (Option 2 ja 3);
6. turvavõrgu tekst;
7. „Sinu vastused“ koos allalaadimisega .md või PDF failina. Vastused on ainult brauseri vahekaardis ja kaovad selle sulgemisel;
8. lingid „← Tagasi küsimuse juurde“ ja „Alusta küsimustikku uuesti“.

### Option 1. Praegu pole sul vaja midagi teha — ja see on hea uudis

- **Üldine põhjuse lause:** „Sinu vastuste põhjal ei ole sul praegu sõeltesti vaja.“
- **Järgmine samm:** „Praegu ei ole sul sõeltesti vaja. **Tee see küsimustik uuesti umbes kahe aasta pärast** — või varem, kui midagi muutub.“
- **Lisaplokk (ainult küsimuse 4.1 kaudu tulnutele):** „Kõige rohkem aitad sa praegu kedagi teist“. Kutsub saatma lingi 45-aastasele või vanemale lähedasele, nupp „Saada link edasi →“ avab e-kirja.
- **Turvavõrk:** „Pöördu perearsti poole varem, kui tekib veri väljaheites, seedetegevuse muutus, seletamatu kaalulangus, püsiv kõhuvalu või kui sulle öeldakse, et oled aneemias. Siis ära oota küsimustikku.“

<details><summary>„Miks“ tekst</summary>

Sõeluuringu mõte on leida muutused enne, kui need vaevusi tekitavad. Sinu vastuste põhjal on su risk praegu madal. Test ei annaks sulle praegu kasu, vaid tooks pigem asjatut muret ja kulu. Me ütleme ausalt, kui midagi pole vaja teha. Vaata olukord üle, kui tekivad sümptomid või kui jõuad sõeluuringu vanusesse — Eestis kutsutakse 56–68-aastaseid iga kahe aasta tagant tasuta peitvere testile.

</details>

### Option 2. Tee koloskoopia

- **Üldine põhjuse lause:** „Sinu vastuste põhjal on koloskoopia sinu jaoks sobivaim järgmine samm.“
- **Järgmine samm:** „**Tee koloskoopia (sooleuuring).** Saatekirja saad oma perearstilt; soovi korral saad uuringu teha ka erakliinikus erateenusena.“
- **Lisaplokk:** sõeluuringust ega sünniaastast juttu pole. Näidatakse kahte teed:
  - perearsti saatekirjaga;
  - tasulises kliinikus ilma saatekirjata: Confido, Medicum, Seirekliinik, Sooleravi kliinik, hindade ja broneerimislinkidega (`docs/screening.js`).
- **Turvavõrk:** „Kui sümptomid süvenevad või tekib tugev verejooks või äge kõhuvalu, pöördu kohe perearsti poole või EMO-sse — ära oota uuringut.“

<details><summary>„Miks“ tekst</summary>

Aneemial ja soolesümptomitel on sageli healoomuline põhjus — näiteks rauavaegus, menstruatsioon või rasedus. Just seepärast tasub täpsema uuringuga veenduda, et midagi tõsisemat ei jääks märkamata. Koloskoopia on täpseim viis jämesoolt kontrollida. Õhuke painduv kaamera vaatab soole seest üle ja arst saab vajadusel polüübid — vähieelsed muutused — kohe eemaldada. Sümptomite või suguvõsast tuleva kõrgema riski korral peitvere testist ei piisa, seega on mõistlik minna kohe täpsema uuringu juurde. Kui su kõrgem risk tuleb suguvõsast, võib perearst suunata su ka geneetilisele nõustamisele ja korralisele jälgimisele.

</details>

### Option 3. Tee väljaheite peitvere test (FIT)

- **Üldine põhjuse lause:** „Sinu vastuste põhjal on peitvere test sinu jaoks sobiv järgmine samm.“
- **Järgmine samm:**
  - „Kui oled sündinud 1958, 1960, 1962, 1964, 1966, 1968 või 1970, kuulud 2026. aastal riiklikku sõeluuringu sihtrühma. Siis saad peitvere testi tasuta. **Registreeru oma perearstikeskuses pereõe vastuvõtule.**“
  - „Kui sa sihtrühma ei kuulu, saad testi osta apteegist või teha laboris, näiteks SYNLAB-is.“
- **Lisaplokk:** küsib sünniaastat.
  - Sihtrühmas: tasuta testi sammud pereõe kaudu ja tasulised laborid.
  - Muidu: tasulised laborid ja apteegid (`docs/screening.js`).
- **Turvavõrk:** „Kui sul tekivad sümptomid — veri väljaheites, seedetegevuse muutus, kaalulangus, püsiv kõhuvalu — või kui sulle öeldakse, et oled aneemias, ära oota testi, vaid pöördu perearsti poole. Sümptomite korral peitvere testist ei piisa.“

<details><summary>„Miks“ tekst</summary>

Peitvere test on hea esimene samm: see on lihtne, odav ega tee haiget. Kui verd ei leita, on jämesoolevähk ebatõenäoline. Kui verd leitakse, ei tähenda see veel vähki — enamasti on põhjus mujal —, kuid siis on vaja täpsemat uuringut, koloskoopiat. Riik pakub 56–68-aastastele testi tasuta iga kahe aasta tagant. Tulemus on lihtsalt „leiti“ või „ei leitud“.

</details>

### Option 4. Tasub sellest perearstiga rääkida

- **Põhjuse lause:** „Sa märkisid sümptomi, millele sa ei tea kindlat põhjust. Enamasti ei ole selle taga midagi tõsist — aga kui see püsib või kordub, tasub sellest perearstiga rääkida.“
- **Järgmine samm:** „Kui sümptom püsib või kordub ja sa ei tea, mis seda põhjustab, **lepi lähiajal oma perearstiga aeg kokku** ja räägi sellest. Kiiret paanikat pole — aga kui sul on sümptom, ei ole peitvere test ega sõeluuring praegu õige tee, parem räägi otse arstiga.“
- **Turvavõrk:** „Kui sümptomid on tugevad — rohke verejooks, äge või talumatu kõhuvalu, järsk halvenemine —, pöördu kohe EMO-sse või helista 112.“

<details><summary>„Miks“ tekst</summary>

Enamasti on neil sümptomitel healoomuline põhjus — näiteks toit, stress või menstruatsioon — ja kõik on korras. Aga kuna harva võib olla ka tõsisem põhjus, tasub need korra arstil üle vaadata. See küsimustik ei pane diagnoosi ega asenda arsti — see juhatab sind lihtsalt õige inimese juurde. Sümptomite korral otsustab arst, kas ja milline uuring on vajalik.

</details>

### Option 5. Järgi oma koloskoopia teinud raviarsti juhiseid

- **Põhjuse lause:** „Tubli — oled oma soolestiku tervise eest juba hoolt kandnud. Küsimustik lõppes siin meelega: kuna sul on koloskoopia tehtud, on sul juba arst, kes su leidu teab ja oskab sind kõige paremini juhendada.“
- **Järgmine samm:** „**Järgi oma koloskoopia teinud arsti juhiseid** — tema teab, mida su uuringul leiti ja millal tasub järgmine kord minna. Kui sul pole selget plaani, räägi sellest oma perearstiga.“
- **Turvavõrk:** „Varasem koloskoopia ei välista uusi muresid. Kui sul tekivad nüüd sümptomid — veri väljaheites, seedetegevuse muutus, kaalulangus, püsiv kõhuvalu — või kui sulle öeldakse, et oled aneemias, pöördu perearsti poole, isegi kui su järgmine plaaniline uuring on alles tulemas.“
- **Lisaks:** „Kui soovid koloskoopia broneerida meie kaudu, vaata siit.“ (link Option 2-le)

<details><summary>„Miks“ tekst</summary>

Me keskendume selle küsimustikuga eelkõige neile, kes pole veel sõeluuringus käinud — sina oled juba sammu võrra ees, ja see on hea uudis. Pärast koloskoopiat sõltub järgmine samm sellest, mida leiti. Kui kõik oli korras, piisab tavaliselt pikast vahest enne järgmist uuringut. Kui eemaldati polüüpe, võib arst soovitada korralist jälgimist kindla aja tagant. Parim juhis tuleb just sinu raviarstilt — meie küsimustik ei tea su uuringu tulemust. Kui sa ei mäleta või sul pole plaani, aitab perearst selle selgeks teha.

</details>

---

Lehe jaluses on kõigil lehtedel tekst: „See küsimustik ei pane diagnoosi ega asenda arsti hinnangut. Kui sul on muresid tervisega, räägi perearstiga.“
