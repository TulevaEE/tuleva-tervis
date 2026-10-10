---
title: Backlog — ideed, mida tulevikus kaaluda
updated: 2026-10-10 (õhtu)
author: Tõnu Pekk
---

# Backlog

Siin on ideed ja parandused, mida me praegu ei tee, aga mida tasub hiljem kaaluda. Kliinilised muudatused kinnitab dr Seth. Kui midagi siit ära teed, märgi see tehtuks või kustuta rida.

Allikad: `muudatusettepanekud.md` (B ja C osa), `ulevaade-knowledge-base.md` (leiud L2–L11, K1), `tagasiside.md`.

## Tekstid ja sisu (vajavad dr Sethi pilku)

| # | Idee | Kus | Allikas |
|---|---|---|---|
| 1 | Eemalda Option 1 „Miks“ plokist väide „Test ei annaks sulle praegu kasu“. Asenda selgitusega vanuse ja riski järgi (nt „Sinu vanuses ja ilma riskiteguriteta sõeltesti praegu ei soovitata. Juhendid soovitavad alustada 45-aastaselt, Eesti riiklik sõeluuring algab 56-aastaselt.“). | `option-1.html` | muudatusettepanekud, L9 |
| 2 | Selgita koloskoopiat dr Sethi artikli põhjal: soole ettevalmistus, vesi ja CO₂, rahusti, narkoosi on harva vaja, polüüpide eemaldamine on valutu. | `option-2.html` „Miks“, `jamesoolevahk.html` | muudatusettepanekud, L10 |
| 3 | 🟡 Osaliselt: abitekst räägib nüüd rauavaegusaneemiast (10.10.2026), küsimus ise on „Kas sul on aneemia?“. Aneemia küsimus: „Kas sul on diagnoositud rauavaegusaneemia (rauapuudusest tingitud kehvveresus)?“ Kitsam küsimus vähendab valepositiivseid ja on kliiniliselt täpsem. Sobita kokku PR #16 abitekstiga. | `flow.js` 2.1, `option-2.html` põhjus 2.1, `kusimustik.md` | muudatusettepanekud |
| 4 | Elustiili soovitused Option 1 ja 3 lehele dr Sethi artiklist (suitsetamine, alkohol alla 4 ühiku päevas, punane liha kuni 350 g nädalas, kiudaineid 30 g päevas, liikumine) koos lausega „See ei asenda sõeluuringut“. | `option-1.html`, `option-3.html` | muudatusettepanekud, L11 |
| 5 | Option 4 toon: kas „kui püsib või kordub“ ja „Kiiret paanikat pole“ jäävad? Uuenda vastavalt `CLAUDE.md` ja `design-principles.md` („GP now / urgent“). | `option-4.html`, `CLAUDE.md` | PR #16 ülevaatus |
| 6 | PR #16 kliinilised väited („kõige sagedam põhjus on healoomuline (nt hemorroidid)“, „toit, stress või menstruatsioon“) ja rauavaegus kui healoomuline põhjus Option 2 „Miks“ plokis. | `option-2.html`, `option-4.html` | PR #16 ülevaatus |
| 7 | Option 3: lisa testi piirangud („võib harva jääda negatiivseks ka siis, kui midagi on“) ja kordamise aeg, positiivse tulemuse korral „ära lükka koloskoopiat edasi“. | `option-3.html` | L8 |
| 8 | Sümptomite küsimustele ajavahemik („viimase 3 kuu jooksul“) ja söögiisu vähenemine valikuks. | `flow.js` 2.x | L7 |

## Suunamise loogika (dr Seth otsustab)

| # | Idee | Allikas |
|---|---|---|
| 9 | Küsi sümptomeid ka neilt, kellel on koloskoopia tehtud viimase 5 aasta jooksul. Kas piir on 5 või 10 aastat (USPSTF: 10)? | L2 |
| 10 | Peitvere testi intervall: Eesti programm 2 aastat või USPSTF 1 aasta? | L3 |
| 11 | Küsi põletikulise soolehaiguse, varem eemaldatud polüüpide ja lähisugulaste Lynchi/FAP-i kohta. | L4 |
| 12 | Vanus küsimuse 3.4 juures (alla 40 → Option 1?) ja kas 2+ sugulast viib Option 2 juurde. | L5 |
| 13 | Vanuse ülempiir: 76+ → arutage perearstiga, 85+ sõeluuringut ei soovitata. | L6 |
| 14 | Sugu ja kõhuvalu seos menstruatsiooniga. PR #16 lahendas osaliselt („mitte menstruatsiooni ajal“). | muudatusettepanekud |
| 15 | Kas raseduse aneemia peaks koloskoopia teelt välja viima? | PR #16 |

## Toode ja väärtuspakkumine

| # | Idee | Allikas |
|---|---|---|
| 16 | Tervelt elatud eluaastad vahelehel „Miks see on oluline“. Kasuta allikaga numbrit, nt USPSTF: 45–75-aastaste sõeluuring võidab iga 1000 inimese kohta 286–337 eluaastat. | muudatusettepanekud |
| 17 | Selge hinnakiri: lisa puuduvad peitvere testi hinnad `screening.js`-i (ITK, Lääne-Tallinna Keskhaigla, SYNLAB, apteegid). | muudatusettepanekud |
| 18 | Terviseärevus kontrolli all: loe kõik tekstid läbi „anti-fear framing“ pilguga (`design-principles.md`). | muudatusettepanekud |
| 19 | Kogu tagasisidet tulemuse lehel („Kas kasutaksid, kui Tuleva liikmetele oleks uuring soodsam?“) ilma terviseandmeid salvestamata. | tagasiside #3 |
| 20 | Kui inimene tuleb Option 2 või 3 lehele otse vahelehelt (mitte küsimustikust), on põhjuse lause „Sinu vastuste põhjal…“ eksitav. Näita siis teistsugust lauset. | jamesoolevahk.html |
| 21 | Dr Mari Sethi video vahelehele. | jamesoolevahk.html |
| 22 | ✅ Tehtud. Nimeta `muudatusettepanekud` ümber `muudatusettepanekud.md`-ks, et GitHub seda vormindaks. | — |
| 25 | ✅ Tehtud (PR #21). Avaleht: tulevaste teemade kaardid (süda, emakakael, rind, „?“) tekitavad testijates tunde, et projekt ajab liiga paljut korraga taga. Vii need lehe lõppu või eemalda, kuni jämesoolevähi teekond on end tõestanud. | PR #20 persona-testid (Rauno, Enn) |
| 26 | ✅ Tehtud (PR #21). Avaleht: too usalduslubadused esiplaanile enne küsimusi. Need on praegu lahtikäivates plokkides peidus: pension jääb puutumata, terviseharu on fondidest lahus, andmed jäävad brauserisse. | PR #20 persona-testid (Enn) |

## Knowledge base

| # | Idee | Allikas |
|---|---|---|
| 23 | Lisa NICE NG12 (sümptomid), NCCN Colorectal Cancer Screening (praegune NCCN-i PDF on ravi kohta), BSG/ACPGBI 2020 (perekondlik risk), ESGE 2020 (polüüpide järgne jälgimine), Tervisekassa sõeluuringu tingimused. | K1 |
| 24 | Täida `kusimustik.md` „Alus“ read allikatega. | K2 |
