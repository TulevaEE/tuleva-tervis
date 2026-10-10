// Küsimustiku loogika (plaan.md). Iga küsimus on kas jah/ei või mitmikvalik.
// `yes` / `pick` tagastab Optioni numbri (1–5) või null, mis tähendab: liigu edasi.
// `last` küsimuse "ei" viib `no` Optionile.
// `unsure: true` küsimustel on ka vastus "Ei tea": see liigub edasi nagu "ei", aga tulemuse lehel
// näitame märkust, kuhu "jah" oleks viinud (`unsureNote`). `short` on küsimuse lühinimi märkuse jaoks,
// `findOut` ütleb, kuidas vastus järele uurida.

const STEPS = {
  1: "Vaatame, kas juba tegutsed",
  2: "Kas sul on sümptomeid?",
  3: "Su suguvõsa tervis",
  4: "Vanus ja varasemad testid",
};

const QUESTIONS = [
  { id: "1.1", step: 1, text: "Kas sul on viimase 5 aasta jooksul tehtud koloskoopia?", yes: 5 },

  { id: "2.1", step: 2, text: "Kas sul on aneemia?", yes: 2, unsure: true,
    short: "rauavaegusaneemia", findOut: "küsi perearstilt vereanalüüsi kohta",
    intro: "Ei ole? Uurime siis edasi.",
    hint: "Siin mõtleme rauavaegusaneemiat ehk rauapuudusest tingitud kehvveresust. Selle tuvastab arst vereanalüüsi põhjal. Märgi „jah“, kui arst on selle sul tuvastanud." },
  { id: "2.2", step: 2, text: "Kas oled märganud verd väljaheites?", yes: 2,
    hint: "Nähtav veri väljaheites või tualettpaberil." },
  { id: "2.3", step: 2, text: "Kas sul on mõni neist sümptomitest?", type: "multi",
    hint: "Märgi vaid need, millele sa ei tea kindlat põhjust — mitte neid, mille põhjust sa tead (nt menstruatsioon või teadaolev haigus).",
    options: ["Seletamatu kõhuvalu (mitte menstruatsiooni ajal)", "Seedetegevuse muutus üle 4 nädala", "Seletamatu kaalulangus"],
    // Kõik kolm koos: koloskoopia. Mõni neist: perearsti juurde.
    pick: (n) => (n === 3 ? 2 : n > 0 ? 4 : null) },

  { id: "3.1", step: 3, text: "Kas lähisugulasel on olnud jämesoolevähk enne 50. eluaastat?", yes: 2, unsure: true, findOut: "küsi sugulastelt",
    short: "lähisugulase jämesoolevähk enne 50. eluaastat",
    hint: "Lähisugulane on vanem, laps, õde või vend." },
  { id: "3.2", step: 3, text: "Kas samal poolel suguvõsast on kahel või enamal lähisugulasel esinenud endomeetriumi-, munasarja-, mao-, peensoole-, kuseteede-, kõhunäärme- või sapiteedevähki või ajukasvajat (glioblastoom)?", yes: 2, unsure: true, findOut: "küsi sugulastelt",
    short: "mitu vähijuhtu samal poolel suguvõsas",
    hint: "See loetelu aitab märgata pärilikku vähiriski. „Samal poolel“ tähendab kas ema või isa suguvõsa. Märgi „jah“, kui mitmel su veresugulasel samal poolel on olnud mõni neist vähkidest." },
  { id: "3.3", step: 3, text: "Kas sul on tehtud geenitest jämesoolevähi tõusnud riski kohta ja see oli positiivne?", yes: 2 },
  { id: "3.4", step: 3, text: "Kas lähisugulasel on olnud jämesoolevähk 50. eluaastal või hiljem?", yes: 3, unsure: true, findOut: "küsi sugulastelt",
    short: "lähisugulase jämesoolevähk 50. eluaastal või hiljem" },

  { id: "4.1", step: 4, text: "Kas oled noorem kui 45 aastat?", yes: 1 },
  { id: "4.2", step: 4, text: "Kas oled viimase 2 aasta jooksul teinud väljaheite peitvere testi (FIT)?", yes: 1, no: 3 },
];

// Tagastab { option } kui vastus viib tulemuseni, muidu { next } järgmise küsimuse indeksiga.
function answer(index, value) {
  const q = QUESTIONS[index];
  const option = q.type === "multi" ? q.pick(value) : value ? q.yes : q.no ?? null;
  if (option) return { option };
  return { next: index + 1 };
}

// Jookseb vastuste massiivi läbi ja tagastab Optioni (testide jaoks).
function run(answers) {
  let i = 0;
  for (const a of answers) {
    const r = answer(i, a);
    if (r.option) return r.option;
    i = r.next;
  }
  return null;
}

// Kuhu oleks "jah" viinud: tekst märkuse jaoks.
const YES_TARGET = { 2: "kohe koloskoopiasse", 3: "peitvere testi juurde" };

// Kui inimene vastas "Ei tea" ja "jah" oleks viinud teise tulemuseni, tagastab märkuse andmed.
// rows: [{ id, a, yes, short, findOut }], option: tulemuse number. Mitme puhul valime ettevaatlikuma (väiksema numbri).
function unsureNote(rows, option) {
  const unsure = rows.filter((r) => r.a === "Ei tea" && r.yes && r.yes !== option);
  if (!unsure.length) return null;
  const target = Math.min(...unsure.map((r) => r.yes));
  const findOut = [...new Set(unsure.map((r) => r.findOut).filter(Boolean))];
  return { questions: unsure.map((r) => r.short), target: YES_TARGET[target], findOut };
}

if (typeof module !== "undefined") module.exports = { STEPS, QUESTIONS, answer, run, unsureNote };
