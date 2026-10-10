// Küsimustiku loogika (plaan.md). Iga küsimus on kas jah/ei või mitmikvalik.
// `yes` / `pick` tagastab Optioni numbri (1–5) või null, mis tähendab: liigu edasi.
// `last` küsimuse "ei" viib `no` Optionile.

const STEPS = {
  1: "Vaatame, kas juba tegutsed",
  2: "Kas sul on sümptomeid?",
  3: "Perekonna anamnees",
  4: "Vanus ja varasemad testid",
};

const QUESTIONS = [
  { id: "1.1", step: 1, text: "Kas oled käinud koloskoopias?", yes: 5 },

  { id: "2.1", step: 2, text: "Kas sul on aneemia?", yes: 2,
    intro: "Ei ole? Uurime siis edasi." },
  { id: "2.2", step: 2, text: "Kas sul on veri väljaheites?", yes: 2 },
  { id: "2.3", step: 2, text: "Kas sul on mõni neist sümptomitest?", type: "multi",
    hint: "Märgi kõik, mis sobivad.",
    options: ["Kõhuvalu", "Seedetegevuse muutus", "Kaalulangus"],
    // Kõik kolm koos: koloskoopia. Mõni neist: perearsti juurde.
    pick: (n) => (n === 3 ? 2 : n > 0 ? 4 : null) },

  { id: "3.1", step: 3, text: "Kas lähisugulasel on olnud jämesoolevähk enne 50. eluaastat?", yes: 2,
    hint: "Lähisugulane on vanem, laps, õde või vend." },
  { id: "3.2", step: 3, text: "Kas samal poolel suguvõsast on kahel või enamal lähisugulasel esinenud endomeetriumi-, munasarja-, mao-, peensoole-, kuseteede-, kõhunäärme- või sapiteedevähki või ajukasvajat (glioblastoom)?", yes: 2 },
  { id: "3.3", step: 3, text: "Kas sul on tehtud geenitest jämesoolevähi tõusnud riski kohta ja see oli positiivne?", yes: 2 },
  { id: "3.4", step: 3, text: "Kas lähisugulasel on olnud jämesoolevähk 50. eluaastal või hiljem?", yes: 3 },

  { id: "4.1", step: 4, text: "Kas oled noorem kui 45 aastat?", yes: 1 },
  { id: "4.2", step: 4, text: "Kas oled viimase 2 aasta jooksul teinud FIT-testi?", yes: 1, no: 3 },
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

if (typeof module !== "undefined") module.exports = { STEPS, QUESTIONS, answer, run };
