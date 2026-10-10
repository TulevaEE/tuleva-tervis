---
title: Kasutajate tagasiside
date: 2026-10-10
author: Tõnu Pekk
---

# Kasutajate tagasiside

Tagasiside rakenduse kohta (https://tulevaee.github.io/tuleva-tervis/). Iga punkti juures on kirjas, mida kasutaja ütles, kus see rakenduses on ja mis võiks olla lahendus. Lahendusi pole veel tehtud. Kliinilised muudatused (sümptomite sõnastus) kinnitab dr Seth.

| # | Teema | Staatus |
|---|---|---|
| 1 | Kõhuvalu küsimus on liiga lai | lahtine |
| 2 | Koloskoopia „jah“ lõpetab küsimustiku ootamatult kiiresti | lahtine |
| 3 | Pole selge, miks küsimustikku teha ja miks Tuleva seda teeb | lahtine |

---

## 1. Kõhuvalu küsimus on liiga lai

**Tagasiside.** Paljudel naistel on kõhuvalu iga menstruatsiooni ajal. Praegu peaks selline naine märkima „Kõhuvalu“ ja jõuaks perearsti juurde (Option 4). Küsimust tuleb täpsustada, näiteks „seletamatu tugev kõhuvalu“.

**Kus see on.** Küsimus 2.3 „Kas sul on mõni neist sümptomitest?“ Selle valikud on kõhuvalu, seedetegevuse muutus ja kaalulangus (`docs/flow.js`).

**Võimalik lahendus (dr Seth kinnitab).**
- Valiku sõnastus: „Seletamatu kõhuvalu, mis ei ole seotud menstruatsiooniga ja on kestnud üle [X] nädala“.
- Sama probleem on ka teistes valikutes, sest neil puudub kestus ja ajavahemik. Doc30 ankeedis oli „viimase kolme kuu jooksul“ ja „seedetegevuse muutus, mis on kestnud kauem kui 4 nädalat“. Dr Sethi artiklis on „seletamatu kaalulangus“. Vaata ka `ulevaade-knowledge-base.md` leidu L7.
- Kõik kolm valikut võiks täpsustada korraga:
  - seletamatu kõhuvalu (mitte menstruatsiooni ajal);
  - seedetegevuse muutus, mis on kestnud üle 4 nädala;
  - seletamatu kaalulangus.

## 2. Koloskoopia „jah“ lõpetab küsimustiku ootamatult kiiresti

**Tagasiside.** Kui vastad, et sul on viimase 5 aasta jooksul tehtud koloskoopia, oled kohe tulemuse lehel. See tundub järsk ja vajab selgitust: me ei taha sekkuda raviarsti töösse.

**Kus see on.** Küsimus 1.1 viib jah-vastuse korral kohe Option 5 lehele („Järgi oma koloskoopia teinud raviarsti juhiseid“).

**Võimalik lahendus.**
- Option 5 lehe põhjuse lause või „Järgmine samm“ lõik ütleks otse: „Küsimustik lõppes siin meelega. Sinu koloskoopia teinud arst teab sinu leidu ja on teinud sulle plaani. Me ei taha sinna sekkuda ega anda talle vastukäivaid soovitusi.“
- Teine võimalus: näita kohe pärast jah-vastust enne Option 5 lehele minekut üht vahelauset, näiteks „Sul on juba arst, kes sind jälgib. Seepärast me rohkem ei küsi.“
- Seotud lahtine küsimus: praegu ei küsi me neilt sümptomeid (`ulevaade-knowledge-base.md`, L2). Kui lisame sümptomite küsimuse enne küsimust 1.1, muutub ka see tagasiside väiksemaks, sest küsimustik ei lõpe enam esimese küsimusega.

## 3. Pole selge, miks küsimustikku teha ja miks Tuleva seda teeb

**Tagasiside.** Miks ma peaksin üldse küsimustikku tegema? Miks Tuleva seda teeb? Kasutaja pakkus põhjuse ise: näiteks sellepärast, et koos saame soodustust.

**Kus see on.** Kristeli avaleht (`docs/index.html`) selgitab põhjust üldiselt: ühistu on sinu poolel, võib öelda „ära tee“ ja võiks „kasutada liikmete ühist jõudu, et vajalikud uuringud oleksid soodsamad“. Tagasiside järgi see kasutajani ei jõua või pole piisavalt konkreetne. Küsimustiku alguses ja tulemuse lehtedel seda põhjust ei korrata.

**Võimalik lahendus.**
- **Kasu inimesele ühe lausega,** avalehe nupu kõrval ja küsimustiku alguses, nt „2 minutiga saad teada, kas sul on vaja midagi teha, ja kui on, siis mida.“
- **Ühine ostujõud konkreetseks,** kui see on päriselt plaanis. Näiteks Option 2 ja 3 lehel tasuliste kliinikute ja laborite juures: „Kui piisavalt liikmeid on huvitatud, läbirääkime Tuleva liikmetele soodsama hinna.“ Kuni soodustust pole, ei tohi seda lubada. Kirjuta see kui eesmärk või küsimus.
- **Tagasiside küsimine,** mis on ka avalehel kirjas: tulemuse lehel üks küsimus „Kas kasutaksid sellist teenust, kui Tuleva liikmetele oleks uuring soodsam?“ See ühendab punkti 3 ja avalehe „sinu tagasiside on meile teejuhiks“. Tagasiside kogumine vajab lahendust, mis ei salvesta terviseandmeid.
