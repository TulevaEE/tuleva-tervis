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
  document.getElementById("vastused").hidden = false;

  document.getElementById("lae-md").addEventListener("click", () => {
    const md = [
      "# Jämesoolevähi küsimustik",
      "",
      `Täidetud: ${date}`,
      "",
      `**Tulemus:** ${title}`,
      "",
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
