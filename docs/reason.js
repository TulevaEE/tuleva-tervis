// Näitab tulemuslehel põhjust: miks just see samm on sinu jaoks õige.
// Põhjus valitakse selle küsimuse järgi, mis siia lehele tõi. app.js lisab
// aadressile #k=indeksid; viimane indeks on käivitanud küsimus (flow.js QUESTIONS).
// Variandid on igal lehel window.REASONS all, seotud küsimuse id-ga ("3.1" jne).
// Kui sobivat varianti pole (või JS ei jookse), jääb lehel olev vaiketekst alles.
(function () {
  const el = document.getElementById("pohjus");
  if (!el) return;
  const raw = (location.hash.match(/k=([\d,]+)/) || [])[1];
  if (!raw || typeof QUESTIONS === "undefined" || !window.REASONS) return;
  const last = Number(raw.split(",").pop());
  const q = QUESTIONS[last];
  if (q && window.REASONS[q.id]) el.textContent = window.REASONS[q.id];
})();
