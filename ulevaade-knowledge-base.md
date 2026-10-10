---
title: Küsimustiku ja soovituste kriitiline ülevaade knowledge base'i põhjal
date: 2026-10-10
author: Tõnu Pekk (koostatud Claude'iga)
reviewed: docs/flow.js, docs/option-1…5.html, docs/screening.js, docs/result-screening.js (seis 10.10.2026, commit 801a2f5)
---

# Küsimustiku ja soovituste kriitiline ülevaade

Võrdlesin meie küsimustikku (`docs/flow.js`) ja viie Optioni lehe tekste kausta `knowledge base/` allikatega. **Kõik kliinilised ettepanekud vajavad dr Sethi otsust.** See dokument toob välja kohad, kus allikad ja meie lahendus lähevad lahku, aga ei otsusta nende üle.

## Allikad ja nende kasutatavus

| Fail | Mis see on | Kas sobib küsimustiku hindamiseks |
|---|---|---|
| `colorectal-cancer-screening-final-recommendation-updated.pdf` | USPSTF 2021 sõeluuringu soovitus (JAMA 2021;325(19):1965–77) | **Jah**, peamine allikas. Käsitleb sümptomiteta ja keskmise riskiga täiskasvanuid. |
| `mari-seth-algstaadiumis-avastatud-jamesoolevahk.md` | Dr Mari Sethi artikkel | **Jah**, eriti sümptomite, riskitegurite ja koloskoopia selgitamise kohta. |
| `nihms701694.pdf` | EL-i 2010 sõeluuringu kvaliteedijuhendi ülevaateartikkel (Endoscopy 2013;45:51–59) | **Osaliselt.** Annab programmi raamistiku (FIT, 50–74, informeeritud valik), aga mitte sümptomeid ega intervalle. |
| `jnccn-article-p329.pdf` | NCCN Colon Cancer v2.2021, **metastaatilise vähi ravi** (JNCCN 2021;19(3):329–59) | **Ei.** See ei ole sõeluuringu juhend. Sealt sobib ainult fakt, et alla 50-aastaste haigestumus kasvab umbes 2% aastas (lk 330). |

Allikatest puudub mitu olulist osa, vaata [ettepanekut K1](#k1-täienda-knowledge-basei).

---

## Leiud

Leiud on järjestatud raskuse järgi: 🔴 võib suunata inimese valele teele · 🟠 lahkneb juhendist, otsus on dr Sethil · 🟡 teksti või selguse küsimus.

### 🔴 L1. Option 2 saadab sümptomitega inimese peitvere testile

> **Parandatud 10.10.2026:** Option 2 lehel pole enam sünniaasta kontrolli ega sõeluuringu juttu, ainult perearsti saatekiri ja tasulised kliinikud.

**Mis meil on.** Option 2 („Tee koloskoopia“) lehele jõuavad inimesed, kellel on aneemia, veri väljaheites, kõik kolm sümptomit või kõrge perekondlik risk. Kui selline inimene sisestab sünniaasta kontrolli plokki sünniaasta, mis kuulub sihtrühma (nt 1964), on esimene samm „Pöördu oma perearstikeskuse pereõe poole – saad tasuta peitveretesti (FIT) komplekti“ (`docs/result-screening.js`, `colonoscopy(eligible)`).

**Mida allikad ütlevad.** USPSTF soovitus kehtib ainult inimestele, „who do not have signs or symptoms of colorectal cancer“, ja välistab kõrge riskiga inimesed (lk 1, 4). Dr Seth kirjutab, et sümptomite korral tuleb rääkida arstiga. Meie enda leht ütleb samuti: „Sümptomite või suguvõsast tuleva kõrgema riski korral peitvere testist ei piisa.“

**Ettepanek.** Option 2 sünniaasta plokk ei tohi pakkuda peitvere testi. Option 2 lehel peaks sünniaastast sõltumata olema ainult kaks teed: perearsti saatekiri koloskoopiale ja tasulised kliinikud. Sõeluuringu sihtrühma info sobib ainult Option 3 lehele. **See on viga, mitte kliiniline otsus, ja selle saab parandada kohe.**

### 🔴 L2. Varasem koloskoopia viib alati Option 5 juurde

**Mis meil on.** Esimene küsimus on „Kas oled käinud koloskoopias?“. Jah-vastus viib Option 5 juurde, olenemata sellest, millal koloskoopia tehti ja mis leiti. Sümptomite kohta neilt ei küsita.

**Mida allikad ütlevad.**
- USPSTF: pärast normaalset koloskoopiat on järgmine sõeluuring **10 aasta pärast**. Intervallid „not intended for persons in surveillance programs“, st polüüpide järel on jälgimisskeem eraldi (lk 3, 6).
- Dr Seth: polüüpide suuruse, arvu ja histoloogia järgi jäetakse patsient jälgimisele, „tavaliselt vajavad need patsiendid regulaarseid koloskoopiaid kindlate ajavahemike tagant“.
- EL 2010: osa vähkidest tekib koloskoopiate vahepeal, seega varasem koloskoopia ei anna täielikku kaitset (lk 11).

**Risk.** Kui inimesel oli 15 aastat tagasi normaalne koloskoopia ja nüüd on tal veri väljaheites, saab ta praegu vastuse „järgi oma raviarsti juhiseid“.

> **Osaliselt lahendatud 10.10.2026:** küsimus on nüüd „Kas sul on viimase 5 aasta jooksul tehtud koloskoopia?“. Kes tegi koloskoopia üle 5 aasta tagasi, läheb edasi tavalisele teele. Lahtine on veel: sümptomeid ei küsita neilt, kes vastavad „jah“, ja 5 aastat on lühem kui USPSTF-i 10 aastat (dr Seth kinnitab).

**Ettepanek (dr Sethi otsustada).**
1. Küsi sümptomid enne koloskoopia küsimust.
2. Küsi, millal koloskoopia tehti: kui üle 10 aasta tagasi ja leid oli normaalne, suuna tagasi tavalisele teele (vanus ja peitvere test).
3. Option 5 jääb neile, kellel leiti polüübid või kes on jälgimisel.

### 🟠 L3. Peitvere testi intervall on 2 aastat, USPSTF-is 1 aasta

**Mis meil on.** Küsimus 4.2 „Kas oled viimase 2 aasta jooksul teinud FIT-testi?“ suunab jah-vastuse korral Option 1 juurde („Tee küsimustik uuesti 2 aasta pärast“).

**Mida allikad ütlevad.** USPSTF soovitab FIT-i **igal aastal** (tabel 1, lk 3). Eesti riiklik programm teeb testi iga 2 aasta tagant. EL-i ülevaade intervalli ei anna.

**Ettepanek (dr Sethi otsustada).** Kas järgime Eesti programmi (2 aastat) või USPSTF-i (1 aasta)? Kui jääme 2 aasta juurde, kirjuta see `kusimustik.md` „Alus“ reale Eesti programmi põhjendusena. Tasulise testi teel (45–55-aastased, kes riikliku programmi alla ei kuulu) võiks kaaluda 1 aastat.

### 🟠 L4. Kõrge riski grupid jäävad küsimata

**Mis meil on.** Me ei küsi põletikulise soolehaiguse (Crohni tõbi, haavandiline koliit), varem eemaldatud polüüpide, enda varasema jämesoolevähi ega lähisugulaste Lynchi sündroomi või FAP-i kohta. Selline inimene võib jõuda Option 1 (mitte midagi teha) või Option 3 (peitvere test) juurde.

**Mida allikad ütlevad.**
- USPSTF välistab keskmise riski hulgast inimesed, kellel on „prior diagnosis of colorectal cancer, adenomatous polyps, or inflammatory bowel disease“ või teadaolev pärilik sündroom (Lynch, FAP). Nemad „may need screening strategies that go beyond“ ja peaksid rääkima arstiga (lk 1, 2, 11).
- Dr Seth nimetab riskiteguritena põletikulist soolehaigust ja jämesoolevähki perekonnas.
- EL 2010: kõrge riskiga inimesed tuleb suunata „more intensive protocols“ juurde (lk 2–3).

**Ettepanek.** Lisa sammu 3 küsimus: „Kas sul on diagnoositud põletikuline soolehaigus (Crohni tõbi või haavandiline koliit) või on sul varem eemaldatud soolepolüüpe?“ Jah-vastus viiks Option 2 või 4 juurde. Küsimusele 3.2 lisa Lynchi sündroom ja FAP. Mõlemad punktid on ka `plaan.md` lünkade nimekirjas.

### 🟠 L5. Sugulane, kes haigestus 50-aastaselt või hiljem: peitvere test igas vanuses

**Mis meil on.** Kui inimene vastab küsimusele 3.4 jah, suunatakse ta Option 3 (peitvere test) juurde. Vanust seal ei küsita, nii et ka 25-aastane, kelle isa haigestus 70-aastaselt, jõuab peitvere testi juurde.

**Mida allikad ütlevad.**
- EL 2010: perekonnaanamneesiga, aga ilma päriliku sündroomita inimesed kuuluvad keskmise riski sõeluuringusse (lk 2–3). See toetab peitvere testi, aga sõeluuringu eas, mitte 25-aastaselt.
- USPSTF viitab USMSTF-i soovitusele: perekonnaanamneesi korral alusta 40-aastaselt või 10 aastat enne sugulase diagnoosi vanust (lk 12). Ühes uuringus kadus koloskoopia kaitse esimese astme sugulasega inimestel 5 aasta pärast (lk 8).
- USPSTF ei käsitle kahte või enamat haiget sugulast eraldi. Meil viivad kaks sugulast, kes mõlemad haigestusid 50-aastaselt või hiljem, samuti Option 3 juurde.

**Ettepanek (dr Sethi otsustada).** Küsi vanust enne küsimust 3.4 või pärast seda. Alla 40-aastane (või sugulase diagnoosi vanus miinus 10 aastat) võiks jõuda Option 1 juurde turvavõrgu tekstiga. Lisaks: kas kaks või enam sugulast peaks viima Option 2 juurde?

### 🟠 L6. Vanuse ülempiiri pole

**Mis meil on.** 45+ vanuses inimene, kes pole viimase 2 aasta jooksul testi teinud, jõuab Option 3 juurde. Nii suuname ka 90-aastase peitvere testile. Tiim otsustas 10.10.2026 vanust 75+ mitte eraldada.

**Mida allikad ütlevad.** USPSTF: 76–85-aastastel on otsus individuaalne (grade C) ja sõltub tervisest ning varasemast sõeluuringust. 85+ puhul tuleb sõeluuring lõpetada (lk 1, 5, 7). EL-i sihtrühm on 50–74.

**Ettepanek.** Vaata tiimi otsus koos dr Sethiga üle. Lihtne lahendus: küsimus „Kas oled 76-aastane või vanem?“ ja jah-vastuse korral Option 4 tekstiga „arutage perearstiga, kas sõeluuringust on sulle kasu“.

### 🟡 L7. Sümptomite loetelu on dr Sethi artiklist kitsam

**Mis meil on.** Küsime aneemia, vere väljaheites, kõhuvalu, seedetegevuse muutuse ja kaalulanguse kohta. Ajavahemikku ega kestust me ei täpsusta.

**Mida allikad ütlevad.** Dr Seth loetleb: veri väljaheites, seedetegevuse muutus („kõhukinnisus või -lahtisus“), kõhuvalu, **rauavaegus**aneemia, **söögiisu vähenemine** ja **seletamatu** kaalulangus. Doc30 ankeedis oli „viimase kolme kuu jooksul“ ja „kestnud kauem kui 4 nädalat“.

**Ettepanek.** Lisa küsimusse 2.3 söögiisu vähenemine. Kirjuta „seletamatu kaalulangus“ ja „seedetegevuse muutus (kõhukinnisus või -lahtisus), mis on kestnud üle 4 nädala“. Lisa sümptomite küsimustele ajavahemik „viimase 3 kuu jooksul“. Kas aneemia küsimus peaks olema „rauavaegusaneemia“, otsustab dr Seth.

### 🟡 L8. Option 3 tekstist puuduvad testi piirangud ja kordamise aeg

**Mis meil on.** Option 3 „Miks“ plokk ütleb: „Kui verd ei leita, on jämesoolevähk ebatõenäoline.“ Lehel pole kirjas, millal testi korrata.

**Mida allikad ütlevad.** EL 2010: inimene vajab teadlikuks otsuseks infot ka „potential risks, side-effects and limitations“ kohta (lk 8–9). Positiivse tulemuse järel tuleb teha koloskoopia viivituseta (lk 7). USPSTF: sõeluuringu kasu saavutatakse ainult siis, kui positiivsele testile järgneb koloskoopia (lk 6, 11).

**Ettepanek.** Lisa üks lause: „Test võib harva jääda negatiivseks ka siis, kui midagi on. Seepärast korda seda [1 või 2] aasta pärast.“ Positiivse tulemuse lausesse lisa: „Pöördu kohe perearsti poole, ära lükka koloskoopiat edasi.“

### 🟡 L9. Option 1 põhjendab kinnitamata väitega

**Mis meil on.** Option 1 „Miks“ plokk ütleb kõigile, kes sinna jõuavad: „Test ei annaks sulle praegu kasu, vaid tooks pigem asjatut muret ja kulu.“

**Mida allikad ütlevad.** USPSTF: alla 45-aastaste kohta soovitus puudub. 45–49 on grade B, sest haigestumus noorematel kasvab (lk 5). NCCN-i ülevaade (lk 330) ja dr Seth märgivad, et alla 50-aastaste haigestumus kasvab.

**Ettepanek.** Pehmenda: „Sinu vanuses ja ilma riskiteguriteta sõeltesti praegu ei soovitata.“ Väide „ei annaks kasu“ jäta välja. Kui inimene jõudis siia küsimuse 4.2 kaudu, sõltub sobiv tekst sellest, milline intervall valitakse leius L3.

### 🟡 L10. Dr Sethi artikkel sobib Option 2 selgituseks

Dr Sethi artiklis on lihtsas keeles selgitused, mida Option 2 „Miks“ plokk ja koloskoopia hirmud vajavad:
- uuring on „veidi ebameeldiv“, aga hästi talutav;
- soolt laiendatakse vee ja CO₂-ga ning vajadusel antakse rahustit;
- polüüpide eemaldamine on valutu;
- polüübist võib vähk areneda kuni 10 aasta jooksul, seega leitud polüübid eemaldatakse.

**Ettepanek.** Kasuta neid fakte Option 2 tekstis ja märgi allikaks dr Seth. NB: artiklis on sõeluuringu vanuseks 58–68, mis oli 2025. aasta seis. 2026. aastal on see 56–68.

### 🟡 L11. Elustiili riskitegurid ei mõjuta suunamist ega ole lehtedel kirjas

**Mida allikad ütlevad.** USPSTF loetleb riskitegurina ülekaalu, diabeedi, pikaajalise suitsetamise ja alkoholi. Samas ütleb, et sõeluuringut tuleb pakkuda kõigile 45+, „even if these risk factors are absent“ (lk 2). Dr Seth lisab punase ja töödeldud liha (kuni 350 g nädalas), kiudained (30 g päevas) ja liikumise.

**Ettepanek.** Suunamise jaoks neid küsida pole vaja. Option 1 ja 3 lehele võiks aga lisada lühikese ploki „Mida saad ise teha“ dr Sethi soovitustega. See sobib Tuleva hoiaku juurde: midagi, mida inimene saab teha ka siis, kui testi pole vaja.

---

## Mis on allikatega kooskõlas

- **Alampiir 45 aastat** (küsimus 4.1): USPSTF 2021 grade B (lk 1, 4). Dr Seth toetab samuti vanusepiiri langetamist 45-le.
- **Peitvere test sümptomiteta keskmise riskiga inimesele** (Option 3): USPSTF ja EL 2010 („FIT is the test of choice“, lk 5).
- **Positiivse testi järel koloskoopia** (Option 3 tekst): kõik allikad.
- **Aneemia ja veri väljaheites ei vii peitvere testile:** USPSTF-i sõeluuringu soovitus ei kehti sümptomitega inimestele.
- **Ükski sümptom ei jää tähelepanuta:** üks sümptom kolmest viib perearsti juurde, mis vastab dr Sethi soovitusele rääkida igast kaebusest arstiga.
- **Sihtrühm saab tasuta testi** (Option 3): vastab dr Sethi artiklile („Uuring on tasuta, ka ravikindlustamata isikutele“).

---

## Ettepanekud knowledge base'i kohta

### K1. Täienda knowledge base'i

Praegustest allikatest ei saa kontrollida mitut meie reeglit. Ettepanek lisada:
- **NICE NG12** (sümptomite suunamiskriteeriumid). Ainus allikas, mis ütleb, millised sümptomid üksi õigustavad suunamist.
- **NCCN Colorectal Cancer Screening** juhend. Praegune NCCN-i PDF on vale dokument, metastaatilise vähi ravi kohta.
- **BSG/ACPGBI 2020** perekondliku riski juhend (kaks või enam sugulast, vanusepiirid).
- **ESGE 2020** polüüpide eemaldamise järgse jälgimise juhend (leiu L2 jaoks).
- **Tervisekassa** jämesoolevähi sõeluuringu tingimused ja patsiendi infoleht (Eesti tee, 2-aastane intervall).

### K2. Allikad „Alus“ ridadele

`kusimustik.md` „Alus“ ridade täitmiseks sobivad juba olemasolevad allikad nii:

| Küsimus | Allikas |
|---|---|
| 1.1 koloskoopia | USPSTF lk 3, 6 (10 a intervall); dr Seth (jälgimine leiu järgi) |
| 2.1–2.3 sümptomid | dr Seth (sümptomite loetelu); USPSTF lk 4 (sümptomitega inimesed ei kuulu sõeluuringusse). Täpsed suunamiskriteeriumid vajavad NICE NG12-t. |
| 3.1–3.4 perekond | USPSTF lk 2, 12; EL 2010 lk 2–3 |
| 3.3 geenitest | USPSTF lk 1, 11 |
| 4.1 vanus 45 | USPSTF lk 1, 4, 5 |
| 4.2 FIT 2 a | Eesti programm (allikas puudub, vt K1); USPSTF lk 3 ütleb 1 a |

---

## Kokkuvõte: mida teha

| # | Mis | Kes otsustab | Kiirus |
|---|---|---|---|
| L1 | Option 2 sünniaasta ploki parandus | tiim | ✅ parandatud |
| L2 | Koloskoopia küsimuse järjekord ja aeg | dr Seth | 🟠 osaliselt (küsimus on nüüd „viimase 5 aasta jooksul“) |
| L4 | Põletikuline soolehaigus, polüübid, Lynch/FAP | dr Seth | 🟠 |
| L3 | FIT-i intervall 1 või 2 aastat | dr Seth | 🟠 |
| L5 | Vanus küsimuse 3.4 juures, 2+ sugulast | dr Seth | 🟠 |
| L6 | 76+ vanus | dr Seth + tiim (varasem otsus) | 🟠 |
| L7–L11 | Tekstid | tiim, dr Seth vaatab üle | 🟡 |
| K1 | Knowledge base'i täiendamine | tiim | 🟡 |
