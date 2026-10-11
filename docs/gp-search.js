// "Leia oma perearsti kontakt": otsib perearsti nime järgi failist gp-lists.json ja viib registri nimistu lehele,
// kus on praksise e-post ja telefon. E-posti ega telefoni meie ei hoia.
// Lehel: <div class="card gp-search" id="gp-search-box"></div>

const REGISTER_LIST = "https://medre.tehik.ee/general-practitioner-lists/";
const REGISTER_SEARCH = "https://medre.tehik.ee/search/gp-lists";
const PORTAL = "https://minu.terviseportaal.ee";

// Võrdlemiseks: väiketähed, ilma täpitähtedeta ("Õie" → "oie").
const fold = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Iga otsingusõna peab olema mõne nimeosa algus ("mar tam" leiab "Mari Tamm").
function searchDoctors(lists, query, limit = 6) {
  const words = fold(query).split(/[\s-]+/).filter(Boolean);
  if (!words.length || words.join("").length < 2) return [];
  return lists.filter((l) => {
    const parts = fold(l.doctor).split(/[\s-]+/);
    return words.every((w) => parts.some((p) => p.startsWith(w)));
  }).slice(0, limit);
}

const registerUrl = (entry) => REGISTER_LIST + encodeURIComponent(entry.id);

if (typeof module !== "undefined") module.exports = { searchDoctors, registerUrl, fold };

if (typeof document !== "undefined") (function () {
  const box = document.getElementById("gp-search-box");
  if (!box) return;

  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  };
  const link = (text, href) => {
    const a = el("a", "", text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  };

  const intro = el("p");
  intro.append("Ei tea, kes on sinu perearst? Vaata ", link("minu.terviseportaal.ee", PORTAL),
    " (sisene ID-kaardi, Mobiil-ID või Smart-ID-ga).");
  const label = el("label", "", "Tead perearsti nime? Otsi tema kontakt");
  label.htmlFor = "gp-search";
  const input = el("input");
  Object.assign(input, { id: "gp-search", type: "search", autocomplete: "off", placeholder: "nt Mari Tamm" });
  const results = el("ul", "gp-results");
  const notFound = el("p", "muted small");
  notFound.append("Ei leia? Otsi ", link("perearstinimistute registrist", REGISTER_SEARCH), ".");
  box.append(el("h3", "", "Leia oma perearsti kontakt"), intro, label, input, results, notFound);

  let lists = null; // laeme alles siis, kui inimene hakkab nime kirjutama
  async function load() {
    if (lists) return lists;
    const res = await fetch("gp-lists.json");
    if (!res.ok) throw new Error(`gp-lists.json: ${res.status}`);
    lists = (await res.json()).lists;
    return lists;
  }

  input.addEventListener("input", async () => {
    try {
      const found = searchDoctors(await load(), input.value);
      results.replaceChildren(...found.map((c) => {
        const li = el("li", "gp-option");
        li.append(el("strong", "", c.doctor), el("span", "muted", `${c.practice}${c.area ? ` · ${c.area}` : ""}`),
          link("Vaata e-posti ja telefoni registris →", registerUrl(c)));
        return li;
      }));
    } catch (err) {
      console.error("Perearstide nimekirja laadimine ebaõnnestus:", err);
      results.replaceChildren(el("li", "hint error", "Perearstide nimekirja ei õnnestunud laadida."));
    }
  });
})();
