// Riikliku jämesoolevähi sõeluuringu sihtrühm ja koloskoopia pakkujad (landing_page.md, 10.10.2026).
// Sihtrühm on määratud sünniaastate järgi ja muutub igal aastal – uuenda aastavahetusel.

const SCREENING_YEAR = 2026;
const SCREENING_BIRTH_YEARS = [1958, 1960, 1962, 1964, 1966, 1968, 1970];

// Sõelkoloskoopiat teevad ainult need 4 haiglat (Tervisekassa nimekiri), saatekirjaga perearstilt.
const SCREENING_HOSPITALS = [
  { name: "Põhja-Eesti Regionaalhaigla", place: "Tallinn", phone: "617 1049" },
  { name: "Ida-Tallinna Keskhaigla", place: "Tallinn, Ravi tn 18, C-korpus", phone: "620 7077",
    url: "https://www.itk.ee/patsiendile/kliinikud/gastroenteroloogiakeskus/jamesoolevahi-soeluuringu-koloskoopia" },
  { name: "Tartu Ülikooli Kliinikum", place: "Tartu", phone: "731 9871",
    url: "https://www.kliinikum.ee/valdkond/gastroenteroloogia/" },
  { name: "Pärnu Haigla", place: "Pärnu, Ristiku 1", phone: "447 3300",
    url: "https://www.ph.ee/et/patsiendile-ja-kulastajale/patsiendi-infomaterjalid/protseduurid/soeluuringu-koloskoopia" },
];

// Tasulised, saatekirjata. Med4U on välja jäetud, sest koloskoopia pakkumine pole kinnitatud.
const PAID_CLINICS = [
  { name: "Confido", place: "Tallinn (Veerenni 51), Tartu (Raatuse 21)", price: 300, sedation: 900,
    note: "Alates-hinnad; Tartus narkoosis alates 750 €",
    url: "https://minu.confido.ee/services?lang=et&serviceCodes=C0002,C0401,C01108" },
  { name: "Medicum", place: "Tallinn", price: 450, phone: "605 0601",
    note: "Hind varasemast hinnakirjast; ka narkoosis",
    url: "https://www.medicum.ee/mao-ja-sooleuuringud/broneeri-vastuvott/" },
  { name: "Seirekliinik", place: "Viimsi, Ravi tee 4 (Haabneeme)", price: 450, sedation: 750, phone: "+372 50 49 375",
    note: "Biopsia 70 €, polüpektoomia 110 €",
    url: "https://seirekliinik.ee/broneering/" },
  { name: "Sooleravi kliinik", place: "Tallinn, Vesivärava 50", price: 450, sedation: 800, phone: "619 0021",
    note: "Polüpektoomia 110 €",
    url: "https://sooleravikliinik.ee/kolonoskoopia/" },
];

// Tasuline FIT-test eraisikule. Regionaalhaigla ja Pärnu Haigla on välja jäetud, sest müüki eraisikule ei kontrollitud.
const FIT_LABS = [
  { name: "Ida-Tallinna Keskhaigla", place: "Tallinn",
    how: "Ilma saatekirjata; proov Ravi tn, Magdaleena või Tõnismäe verevõtukabinetti ilma broneeringuta",
    phone: "666 1900", url: "https://www.itk.ee/patsiendile/analuusid/tasulised-laboripaketid" },
  { name: "Tartu Ülikooli Kliinikum (ühendlabor)", place: "Tartu, L. Puusepa 8", price: "13,99",
    how: "Tasuline analüüs ühendlaboris",
    phone: "731 8316", url: "https://www.kliinikum.ee/yhendlabor/" },
  { name: "Lääne-Tallinna Keskhaigla", place: "Tallinn",
    how: "Telli e-poest või registratuurist, seejärel vii proov protseduurikabinetti",
    phone: "626 1314", url: "https://www.keskhaigla.ee/en/labori-teenused" },
  { name: "SYNLAB Eesti", place: "Üle Eesti",
    how: "Telli patsiendiportaalist või proovivõtupunktis",
    phone: "17123", url: "https://ee.minu.synlab.ee/peitveri-roojas/" },
  { name: "Apteegid (Benu, Apotheka, Südameapteek jt)", place: "Üle Eesti",
    how: "Kodune kiirtest apteegist või e-apteegist",
    note: "Täpsus erineb tootjati (nt 86–99%). Positiivse tulemuse korral pöördu perearsti poole." },
];

function isEligible(birthYear) {
  return SCREENING_BIRTH_YEARS.includes(birthYear);
}

if (typeof module !== "undefined") {
  module.exports = { SCREENING_YEAR, SCREENING_BIRTH_YEARS, SCREENING_HOSPITALS, PAID_CLINICS, FIT_LABS, isEligible };
}
