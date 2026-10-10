// Näitab tulemuslehel põhjust: miks just see samm on sinu jaoks õige.
// app.js lisab aadressile &q=<küsimuse id>, mis siia lehele tõi (nt "3.1").
// Variandid on lehel window.REASONS all. Kui sobivat varianti pole (või JS ei jookse),
// jääb lehel olev vaiketekst alles.
(function () {
  const el = document.getElementById("pohjus");
  const id = (location.hash.match(/[#&]q=([\d.]+)/) || [])[1];
  if (el && id && window.REASONS && window.REASONS[id]) el.textContent = window.REASONS[id];
})();
