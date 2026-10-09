---
title: Häkatoni plaan: tervisenavigaator (jämesoolevähk)
date: 2026-10-09
author: Tõnu Pekk
status: töös
---

# Häkatoni plaan: tervisenavigaator

Tuleva projekt. Kirjeldus: `kirjeldus.md`.

| Päev | Mis |
|---|---|
| **Reede 09.10** | Ettevalmistus: sisu valmis enne, kui arendaja alustab |
| **Laupäev 10.10** | Ehitus |
| **Pühapäev 11.10** | Pitch + esimesed 500 inimest kirja |

**Tiim laupäeval:** Tõnu (sisu, tekstid, suunajad, otsused), dr Seth online (reeglite ja tekstide kinnitus), arendaja (rakendus). Teised võivad juurde tulla, aga plaan ei sõltu neist.

---

## 1. Otsused (tehtud 09.10)

- **Tuleva projekt.** Tuleva bränd, Tuleva kanalid ja Tuleva vastutab andmetöötluse eest.
- **v1 ei võta PDF-i vastu.** Küsimustik ja reeglimootor jooksevad brauseris, ükski terviseandmeid sisaldav väli ei lähe serverisse. Tuleva salvestab ainult registreerumise (e-post + nõusolek). Hemoglobiini/ferritiini sisestab inimene ise, kui teab. PDF + LLM on hilisem samm.

### Mida „Tuleva projekt" kaasa toob (enne pühapäeva)

- [ ] **Andmekaitse register:** uus töötlemistoiming „terviseuuringute navigaatori registreerumine" (e-post, nõusolek, eesmärk: meeldetuletus ja tagasiside küsimine). Lisa `knowledge/regulations/andmekaitse/register.csv`-i (andmekaitsesprindi oskus aitab).
- [ ] **Nõusolekutekst ja lehe vastutusklausel:** Maria vaatab üle enne pühapäeva. Klausel: „See ei ole diagnoos. Soovitused põhinevad ravijuhenditel, sisu vastutaja dr Mari Seth."
- [ ] **Tuleva sisselogimine:** küsi Erkolt, kas onboarding-service'i OAuth klient on nädalavahetusel tehtav. Kasu: isikukoodist tulevad sünniaasta ja sugu, mis on täpselt programmi sobivuse sisend. Kui ei, siis v1 küsib sünniaastat ja sugu, sisselogimist pole vaja.
- [ ] **Kood:** kus see elab? Ettepanek: eraldi repo TulevaEE organisatsioonis, staatiline leht (nt GitHub Pages / Vercel), sest serveripoolt peaaegu pole. Arendaja otsustab.

### Kust tulevad pühapäeva 500 inimest?

- [ ] Kanal: Tuleva liikmete list Mailchimpis, segment **45+**. Lisaks Tõnu LinkedIn ja Facebook.
- [ ] Kirja tekst: tõuke ja toe mudeli järgi, Tõnu allkirjaga. Mõõdik on paigas enne saatmist (vt p 4).

---

## 2. Täna (reede): sisu valmis enne laupäeva

Kolmeliikmelises tiimis on kitsaskoht see, et dr Seth on online ja tal on piiratud aeg. Kõige suurem võit: **laupäeva hommikul on tal ees konkreetsed asjad, mida kinnitada**, mitte tühi leht. Ka arendaja saab siis kohe ehitama hakata.

Tänased mustandid (Claude kirjutab, Tõnu loeb üle):

- [ ] `kysimustik.md`: ≤ 10 küsimust, iga küsimuse juures, millist reeglit see toidab
- [ ] `reeglid.md`: reeglitabel (allpool) täpsete piiridega + 15 testjuhtumit (näidisinimene → oodatav haru)
- [ ] `valjundid.md`: 7 haru tekst, igaühes **üks järgmine samm** (tõuke ja toe mudel)
- [ ] `perearsti-kiri.md`: kirja mall (sümptomid / perekondlik risk / positiivne FIT)
- [ ] `suunajad.md`: riikliku sõeluuringu juhis, FIT-testid apteegis (nimed, hinnad), Synlabi variant
- [ ] `engine/`: reeglimootor puhta JS-funktsioonina + testid, et arendaja saaks selle otse rakendusse panna
- [ ] Saada dr Sethile täna õhtul `reeglid.md` + küsimused (p 3 lõpus), et ta saaks need laupäeva hommikuks läbi lugeda

---

## 3. Reeglid (jämesoolevähk)

**Kõik piirid kinnitab dr Seth.** Allikad: EL nõukogu soovitus 2022, ESGE, BSG/ACPGBI 2019, USPSTF 2021, Eesti Tervisekassa sõeluuringu tingimused.

| Järjekord | Tingimus | Väljund |
|---|---|---|
| 1 | **Sümptomid**: veri väljaheites, püsiv roojamisharjumuse muutus, seletamatu kaalulangus, rauavaegusaneemia | Ära tee sõeltesti. **Mine perearsti juurde kohe.** Kiri perearstile. |
| 2 | **Kõrge risk**: varasem jämesoolevähk või adenoom, põletikuline soolehaigus (Crohn, haavandiline koliit), teadaolev pärilik sündroom (Lynch, FAP) | Jälgimiskolonoskoopia skeemi järgi. Gastroenteroloogi juurde. |
| 3 | **Perekondlik risk**: 1. astme sugulane diagnoositud < 50 a või ≥ 2 esimese astme sugulast | Kolonoskoopia alates 40 a (või 10 a enne sugulase diagnoosi vanust). Kiri perearstile. |
| 4 | **Keskmine risk, 2026 riikliku programmi sihtrühmas** (sündinud 1958, 1960 … 1970, st 56–68 a) | Tasuta riiklik sõeluuring: registreeru pereõe vastuvõtule, kutset ei pea ootama. Välja jäävad need, kes on teinud kolonoskoopia viimase 10 a jooksul. |
| 5 | **Keskmine risk, 45/50–74, kes ei kuulu 2026 sihtrühma** (alla 56, 69–74, ka paaritutel aastatel sündinud 57–67) | FIT apteegist / Synlab link (soodushind). Alternatiiv: kiri perearstile. |
| 6 | **< 45 ilma riskita** | Praegu ei ole vaja. Meeldetuletus vanuses X (nõusolekul). |
| 7 | **≥ 75** | Individuaalne otsus perearstiga. |

**Tulemuse järel:**
- FIT negatiivne → korda 2 a pärast (meeldetuletus).
- FIT positiivne → kolonoskoopia **lähinädalatel** (EL kvaliteedijuhend: sihiks ~30 päeva). Kiri perearstile / saatekiri gastroenteroloogile. See on lekke c) koht, siin peab tugi olema kõige tugevam.

Lahtised küsimused dr Sethile: alumine vanus 45 või 50? Perekondliku riski täpsed piirid? Kas apteegi FIT-testid on kvaliteedilt võrreldavad Synlabi/riikliku omaga? Kuhu positiivse FIT-iga inimene kõige kiiremini pääseb? Kas paaritul aastal sündinud 57–67-aastane, kes 2025 testi ei teinud, saab 2026 ikka perearsti kaudu tasuta testi, või suuname ta tasulisele?

---

## 4. Laupäev: ehitus

| Kell | Tõnu | Dr Seth (online) | Arendaja |
|---|---|---|---|
| 09:00 | Kõne: reeglid ja küsimused läbi | **Kinnitab reeglid** (30–45 min) | Kuulab, siis skelett |
| 10:00 | Parandab reeglid ja tekstid | – | Küsimustik → mootor → tulemus |
| 12:00 | Esimene läbijooks telefonis | – | Esimene läbijooks |
| 13:00 | Suunajad, perearsti kiri, registreerumise tekst | – | Kirja allalaadimine, registreerumisvorm |
| 15:00 | Saadab lingi | **Vaatab kõik 7 väljundit läbi** (30 min) | Parandused |
| 17:00 | Pühapäeva kiri + nõusolekutekst Mariale | – | Testjuhtumid rohelised, deploy |
| 18:00 | Külmutus | | |

### Valmis (laupäeva õhtu definitsioon)

- [ ] Inimene läbib küsimustiku telefonis < 3 minutiga.
- [ ] Kõik testjuhtumid annavad õige haru (arst kinnitanud).
- [ ] Perearsti kiri tekib ja on alla laaditav.
- [ ] Ükski terviseandmeid sisaldav väli ei lahku brauserist (kontroll: võrguliiklus DevToolsis).
- [ ] Registreerumisvorm salvestab ainult e-posti + nõusoleku.
- [ ] Vastutusklausel ja sisu vastutaja nimi on lehel.

---

## 5. Pühapäev: pitch ja 500 inimest

### Lehter ja mõõdik

- Mõõda: avas → täitis → sai tulemuse → registreerus. Harude jaotus koondina (anonüümne loendur, mitte inimese kaupa).
- Päris tõend: 2 nädala pärast küsimus registreerunutele „kas tegid testi / said aja?". Ilma selleta ei tea, kas navigaator midagi muutis.

### Pitch

#### Üks lause

> Eestis jääb pool jämesoolevähist varajases staadiumis leidmata, kuigi varakult leituna eemaldatakse see sama protseduuri käigus, millega see leiti. Ehitame navigaatori, mis ütleb sulle ravijuhendi järgi, kas ja millisele uuringule minna, ja viib su sinna kohale.

#### 2-minutiline struktuur

1. **Lugu (20 s).** Kaks inimest, sama polüüp. Üks läheb kolonoskoopialt õhtul trenni. Teine leiab selle sümptomite järel: operatsioon, kuudepikkune keemiaravi.
2. **Miks see juhtub (20 s).** Kolm leket: a) sõeluuring algab 56-aastaselt (EL soovitab 50, USA 45), b) osalus on 62% (mehed 57%), c) positiivne tulemus ei jõua kiiresti kolonoskoopiani.
3. **Mida ehitame (40 s).** Neli sammu, igaüks parandab ühte leket:
   küsimustik → reeglimootor (ravijuhend, mitte AI) → suunaja (registreeru / osta test / kiri perearstile) → tulemuse järel arsti juurde.
4. **Mõõdik (15 s).** Mitu inimest täna kirja pani (eesmärk 500). Päris mõõdik hiljem: mitu riskigrupi inimest jõudis testini ja positiivse tulemusega kolonoskoopiani.
5. **Kuhu edasi (10 s).** Sama raam: isheemiatõbi, insult, kopsu-/rinnavähk, emakakaelavähk. Raha on süsteemis juba olemas (sotsiaalmaks, „terve mehe paketid", elukindlustuse preemia), see töötab lihtsalt halvasti.
6. **Keda vajame (15 s).** Neli rolli: tervishoiuökonomist, labori-/kliinikulogistik, arst (gastroenteroloog olemas, otsime kardioloogi või perearsti), andmeturbes tugev arendaja.

#### Numbrid laval (kontrollitud 09.10.2026)

| Väide | Number | Allikas |
|---|---|---|
| Eesti sõeluuring algab hilja | **56–68 a**, FIT iga 2 a tagant, pereõe juures. 2026 kutsutakse paarisaastatel sündinud 1958–1970. Vanuse alampiiri tuuakse alla aasta kaupa: 2024 oli see 60, 2025 58 ja 2026 56. | [Terviseportaal](https://www.terviseportaal.ee/haiguste-ennetus/soeluuringud/soolevahk), [ERR](https://www.err.ee/1609312602/arstid-tahaksid-soolevahi-soeluuringu-vanusevahemiku-suurendamist) |
| Mujal alustatakse varem | EL nõukogu soovitus 2022: **50–74**, FIT. USPSTF 2021: **45–75**. Läti ja Leedu alustavad 50-aastaselt. | EL nõukogu soovitus 9.12.2022, USPSTF mai 2021, ERR |
| Osalus on madal | 2025: **62,3%** (60 309 inimest). WHO eesmärk on 70%. Mehed **56,7%**, naised 66,9%. Kõige madalam on Harjumaal **58,2%** ja Ida-Virumaal 53,0%. | [TAI, Vähi sõeluuringud Eestis 2025](https://www.tai.ee/sites/default/files/2026-06/vahi_soeluuringud_eestis_2025_aastal.pdf) |
| Pool avastatakse hilja | 2023. aasta 978 juhtumist leiti **42% I–II staadiumis** ja **49% III–IV staadiumis** (IV staadiumis 22%), staadium teadmata 9%. Kui staadium on teada, on hiliseid **54%**. Arvutasin need soo ja paiksuse (käärsool/pärasool) tabelite kaalutud keskmisena. | [TAI, Cancer in Estonia 2023](https://tai.ee/sites/default/files/2026-07/cancer_in_estonia_2023.pdf), tabelid 8a–8b |

Laval saab nüüd öelda: **„Pooled jämesoolevähid leitakse Eestis III või IV staadiumis. Iga viies juhtum on juba metastaatiline."**

Pitchi jaoks on hea nurk see, et kõige vähem osalevad mehed ja Harjumaa. See on suur osa meie võimalikust publikust.

#### Kaks asja, mida laval ise öelda, enne kui keegi küsib

- **„Kas see on meditsiiniseade?"** Vastus: reeglistik on avalik ravijuhend, mille sisu eest vastutab arst; me ei diagnoosi, vaid navigeerime. Pikemas plaanis tuleb MDR-i küsimus (tarkvara, mis annab isikustatud soovituse, võib olla IIa klass) lahendada enne skaleerimist. Häkatonil: info ja suunamine, mitte diagnoos.
- **„Kuhu mu terviseandmed lähevad?"** Vastus: v1-s mitte kuhugi. Küsimustik jookseb brauseris, Tuleva hoiab ainult e-posti ja nõusolekut.

---

## 6. Avatud küsimused

1. Kui pikk on pitch ja kellele?
2. Kas Erko jõuab Tuleva sisselogimise teha või läheme ilma?
3. Kas Mailchimpi kiri läheb välja pühapäeval enne või pärast pitchi?
