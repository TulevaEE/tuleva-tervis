// Näitab Optioni lehel inimese vastuseid ja pakub need alla laadida (.md või PDF).
// Vastused tulevad ainult selle vahekaardi sessionStorage'ist; serverisse ei saadeta midagi.
(function () {
  let data;
  try {
    data = JSON.parse(sessionStorage.getItem("tervis-vastused"));
  } catch {
    return;
  }
  if (!data || !data.rows) return;

  const title = document.querySelector("h1").textContent;
  const date = new Date(data.date).toLocaleDateString("et-EE");

  const list = document.getElementById("vastused-list");
  data.rows.forEach(({ q, a }) => {
    const dt = document.createElement("dt");
    dt.textContent = q;
    const dd = document.createElement("dd");
    dd.textContent = a;
    list.append(dt, dd);
  });
  document.getElementById("vastused-date").textContent = date;

  // Valideerimise märge: ankeet perearstile kaasavõtmiseks (nähtav ja prinditavas PDF-is).
  const VALIDATION = "See jämesoolevähi riskiskoori ankeet on mõeldud patsiendi enesetestimiseks, et mõista, kas tal on kõrge risk ja vaja täiendavaid uuringuid. Küsimustik on valideeritud gastroenteroloogide poolt ja kooskõlas rahvusvaheliste diagnostika standarditega.";
  const vIntro = document.createElement("p");
  vIntro.className = "hint";
  vIntro.textContent = VALIDATION;
  document.getElementById("vastused").insertBefore(vIntro, document.getElementById("vastused-list"));

  // Agentsust toetav sõnastus: see on sinu enda andmete salvestamine, mitte meiepoolne kogumine.
  document.getElementById("lae-md").textContent = "Salvesta endale (.md)";
  document.getElementById("lae-pdf").textContent = "Salvesta PDF endale";

  // "Ei tea" märkus: kuhu oleks "jah" viinud.
  const option = Number((location.pathname.match(/option-(\d)/) || [])[1]);
  const note = typeof unsureNote === "function" ? unsureNote(data.rows, option) : null;
  const noteText = note && `Vastasid „Ei tea“: ${note.questions.join("; ")}. Suunasime sind esialgu siia, aga „jah“ vastus oleks suunanud sind ${note.target}. Uuri vastused järele (${note.findOut.join("; ") || "nt küsi sugulastelt"}) ja tee küsimustik uuesti.`;
  if (noteText) {
    const p = document.createElement("p");
    p.className = "safety unsure-note";
    p.textContent = noteText;
    document.getElementById("pohjus").after(p);
    // "Ei tea" korral ei näita rohelist "pole vaja" märget, et teated ei läheks vastuollu.
    document.querySelector(".risk-badge")?.remove();
  }
  document.getElementById("vastused").hidden = false;

  document.getElementById("lae-md").addEventListener("click", () => {
    const md = [
      "# Jämesoolevähi küsimustik",
      "",
      `Täidetud: ${date}`,
      "",
      `**Tulemus:** ${title}`,
      "",
      VALIDATION,
      "",
      ...(noteText ? [`> ${noteText}`, ""] : []),
      "## Vastused",
      "",
      ...data.rows.map(({ q, a }) => `- **${q}** ${a}`),
      "",
      "_See küsimustik ei pane diagnoosi ega asenda arsti hinnangut. Kui sul on muresid tervisega, räägi perearstiga._",
      "",
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([md], { type: "text/markdown;charset=utf-8" }));
    a.download = "kusimustik.md";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById("lae-pdf").addEventListener("click", () => window.print());
})();
