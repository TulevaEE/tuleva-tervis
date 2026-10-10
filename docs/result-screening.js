// Option 2 ja 3: küsib sünniaasta, ütleb, kas inimene kuulub sõeluuringu sihtrühma, ja näitab pakkujaid.
// Lehe kaardil `data-screening="colonoscopy"` (Option 2) või `"fit"` (Option 3).
// Pakkujad loetakse igal kontrollimisel värskelt failist providers.md (vt parseProviders failis screening.js).
const $ = (id) => document.getElementById(id);

function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
}

function link(text, href) {
  const a = el("a", "", text);
  a.href = href;
  if (href.startsWith("http")) {
    a.target = "_blank";
    a.rel = "noopener";
  }
  return a;
}

// Üks pakkuja: nimi, asukoht, hind, kuidas saada, märkus, telefon ja link.
// Koloskoopia hinnad on alates-hinnad, FIT-i hind on täpne.
function provider(p, linkText, priceFrom) {
  const li = el("li");
  li.append(el("strong", "", p.name), el("span", "muted", p.place));
  if (p.price) {
    li.append(el("span", "price",
      `${priceFrom ? "Alates " : ""}${p.price} €` + (p.sedation ? ` · narkoosis ${p.sedation} €` : "")));
  }
  if (p.how) li.append(el("span", "", p.how));
  if (p.note) li.append(el("span", "muted", p.note));
  if (p.coupon) {
    const c = el("span", "coupon", "Tuleva kupong ");
    c.append(el("code", "", p.coupon.code), ` · ${p.coupon.discount} (näidis)`);
    li.append(c);
  }
  const actions = el("span", "actions");
  if (p.phone) actions.append(link(p.phone, `tel:${p.phone.replace(/\s/g, "")}`));
  if (p.url) actions.append(link(linkText, p.url));
  if (actions.childNodes.length) li.append(actions);
  return li;
}

function list(items, linkText, priceFrom) {
  const ul = el("ul", "providers");
  byCoupon(items).forEach((p) => ul.append(provider(p, linkText, priceFrom)));
  return ul;
}

function steps(texts) {
  const ol = el("ol", "steps");
  texts.forEach((s) => ol.append(el("li", "", s)));
  return ol;
}

function portal() {
  const p = el("p");
  p.append("Rohkem infot ja oma uuringud leiad ",
    link("Terviseportaalist", "https://www.terviseportaal.ee"), ".");
  return p;
}

const verdictYes = () => el("p", "verdict yes",
  `Sinu sünniaasta kuulub ${SCREENING_YEAR}. aasta jämesoolevähi sõeluuringu sihtrühma.`);
const verdictNo = () => el("p", "verdict no",
  `Sinu sünniaasta ei kuulu ${SCREENING_YEAR}. aasta jämesoolevähi sõeluuringu sihtrühma.`);

const PAGES = {
  colonoscopy(eligible, data) {
    const clinics = [
      el("p", "", "Tasulisse koloskoopiasse saad ilma saatekirjata:"),
      list(data.paidClinics, "Broneeri →", true),
    ];
    if (!eligible) {
      return [verdictNo(), ...clinics,
        el("p", "muted", "Perearst võib anda saatekirja koloskoopiale ka väljaspool sõeluuringut (nt maakonnahaiglasse).")];
    }
    return [
      verdictYes(),
      steps([
        "Pöördu oma perearstikeskuse pereõe poole – saad tasuta peitveretesti (FIT) komplekti.",
        "Tee test kodus ja saada proov postiga või pakiautomaadiga laborisse. Vastus tuleb umbes 10 tööpäevaga.",
        "Kui tulemus on positiivne, annab perearst saatekirja tasuta sõelkoloskoopiale ühes neist haiglatest:",
      ]),
      list(data.screeningHospitals, "Loe lähemalt →"),
      portal(),
      el("h3", "", "Soovid kohe koloskoopiasse?"),
      ...clinics,
    ];
  },

  fit(eligible, data) {
    const labs = list(data.fitLabs, "Vaata lähemalt →");
    if (!eligible) {
      return [verdictNo(),
        el("p", "", "FIT-testi saad teha tasulisena:"),
        labs,
        el("p", "muted", "Kui tulemus on positiivne, pöördu perearsti poole – ta annab saatekirja koloskoopiale.")];
    }
    return [
      verdictYes(),
      el("p", "", "FIT-test on sulle tasuta."),
      steps([
        "Pöördu oma perearstikeskuse pereõe poole – saad testikomplekti.",
        "Tee test kodus ja saada proov postiga või pakiautomaadiga laborisse. Vastus tuleb umbes 10 tööpäevaga.",
        "Kui tulemus on positiivne, annab perearst saatekirja tasuta sõelkoloskoopiale.",
      ]),
      portal(),
      el("h3", "", "Ei soovi oodata?"),
      el("p", "", "FIT-testi saad teha ka tasulisena:"),
      labs,
    ];
  },
};

const card = document.querySelector("[data-screening]");

// Laeb providers.md iga kord uuesti (ilma vahemäluta), et muudatused oleksid kohe näha.
async function loadProviders() {
  const res = await fetch("providers.md", { cache: "no-store" });
  if (!res.ok) throw new Error(`providers.md: ${res.status}`);
  return parseProviders(await res.text());
}

let request = 0; // kui inimene vajutab mitu korda, näitame ainult viimast vastust

async function show(year) {
  const result = $("result");
  const mine = ++request;
  result.replaceChildren(el("p", "muted", "Laen pakkujaid…"));
  result.hidden = false;
  try {
    const data = await loadProviders();
    if (mine !== request) return;
    result.replaceChildren(...PAGES[card.dataset.screening](isEligible(year), data),
      el("p", "muted small", `Andmed kogutud ${data.updated || "–"} – kontrolli hinnad ja tingimused enne pöördumist.`));
  } catch (err) {
    console.error("Pakkujate laadimine ebaõnnestus:", err);
    if (mine !== request) return;
    // Otse kettalt avatud lehel (file://) ei luba brauser providers.md faili laadida.
    result.replaceChildren(el("p", "hint error", location.protocol === "file:"
      ? "Pakkujate nimekiri laeb ainult veebiserveri kaudu. Käivita: python3 -m http.server -d docs ja ava http://localhost:8000/"
      : "Pakkujate nimekirja ei õnnestunud laadida. Proovi hetke pärast uuesti."));
  }
}

$("year-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const { year, error } = parseBirthYear($("year").value);
  $("year-error").textContent = error || "";
  $("year-error").hidden = !error;
  $("year").classList.toggle("invalid", Boolean(error));
  if (error) $("result").hidden = true;
  else show(year);
});
