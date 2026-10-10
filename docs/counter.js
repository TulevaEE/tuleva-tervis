// Anonüümne loendur: GoatCounter loeb ainult lehevaatamised (ilma küpsisteta).
// Iga Option on eraldi leht, seega näitab see, mitu korda iga tulemust nähti.
// Vastuseid ei saadeta kuhugi. Loendur on välja lülitatud, kuni GOATCOUNTER on tühi.
const GOATCOUNTER = ""; // nt "https://tuleva-tervis.goatcounter.com/count"

if (GOATCOUNTER) {
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = GOATCOUNTER;
  document.head.append(s);
}
