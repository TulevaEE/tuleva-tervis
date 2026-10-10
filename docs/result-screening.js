// Option 2: näitab koloskoopia teid (perearsti saatekiri, tasulised kliinikud) kohe, ilma sünniaastata.
// Option 3: küsib sünniaasta, ütleb, kas inimene kuulub sõeluuringu sihtrühma, ja näitab pakkujaid.
// Lehe kaardil `data-screening="colonoscopy"` (Option 2) või `"fit"` (Option 3).
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
  const actions = el("span", "actions");
  if (p.phone) actions.append(link(p.phone, `tel:${p.phone.replace(/\s/g, "")}`));
  if (p.url) actions.append(link(linkText, p.url));
  if (actions.childNodes.length) li.append(actions);
  return li;
}

function list(items, linkText, priceFrom) {
  const ul = el("ul", "providers");
  items.forEach((p) => ul.append(provider(p, linkText, priceFrom)));
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
  // Option 2-le jõuavad sümptomite või kõrge riskiga inimesed, seega sõeluuringust (peitvere testist) siin ei räägi.
  colonoscopy() {
    return [
      el("h3", "", "Perearsti saatekirjaga"),
      el("p", "", "Räägi perearstiga, miks sa koloskoopiasse tahad minna. Perearst annab saatekirja ja suunab sind haiglasse."),
      el("h3", "", "Tasulises kliinikus ilma saatekirjata"),
      list(PAID_CLINICS, "Broneeri →", true),
    ];
  },

  fit(eligible) {
    const labs = list(FIT_LABS, "Vaata lähemalt →");
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

function show(year) {
  const result = $("result");
  result.innerHTML = "";
  result.append(...PAGES[card.dataset.screening](year && isEligible(year)),
    el("p", "muted small", "Andmed kogutud 10.10.2026 – kontrolli hinnad ja tingimused enne pöördumist."));
  result.hidden = false;
}

if (card.dataset.screening === "colonoscopy") show();

// Väljale saab kirjutada ainult numbreid, kõige rohkem 4.
if ($("year")) $("year").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
});

if ($("year-form")) $("year-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const { year, error } = parseBirthYear($("year").value);
  $("year-error").textContent = error || "";
  $("year-error").hidden = !error;
  if (error) $("result").hidden = true;
  else show(year);
});
