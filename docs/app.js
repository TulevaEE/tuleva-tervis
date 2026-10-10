// Näitab küsimusi ükshaaval ja suunab tulemuse korral Optioni lehele.
const $ = (id) => document.getElementById(id);
const visited = []; // läbitud küsimuste indeksid, et saaks tagasi minna
let current = 0;

function show(index) {
  current = index;
  const q = QUESTIONS[index];
  const stepCount = Object.keys(STEPS).length;

  $("step").textContent = `Samm ${q.step}/${stepCount} · ${STEPS[q.step]}`;
  $("question").textContent = q.text;
  $("intro").hidden = !q.intro;
  $("intro").textContent = q.intro || "";
  $("hint").hidden = !q.hint;
  $("hint").textContent = q.hint || "";
  $("bar").style.width = `${(index / QUESTIONS.length) * 100}%`;
  $("back").hidden = visited.length === 0;

  const controls = $("controls");
  controls.innerHTML = "";

  if (q.type === "multi") {
    const checks = document.createElement("div");
    checks.className = "checks";
    q.options.forEach((label) => {
      const row = document.createElement("label");
      const box = document.createElement("input");
      box.type = "checkbox";
      row.append(box, label);
      checks.append(row);
    });
    const next = button("Edasi", "primary", () => {
      const picked = [...checks.querySelectorAll("input:checked")].map((b) => b.parentElement.textContent);
      go(picked.length, picked.join(", ") || "Ei ühtegi");
    });
    controls.append(checks, wrap(next));
  } else {
    controls.append(wrap(
      button("Jah", "primary", () => go(true, "Jah")),
      button("Ei", "ghost", () => go(false, "Ei")),
    ));
  }
}

function go(value, label) {
  const r = answer(current, value);
  if (r.option) {
    saveAnswers(label);
    // Läbitud tee läheb aadressi, et Optioni lehelt saaks viimase küsimuse juurde tagasi.
    location.href = `option-${r.option}.html#k=${[...visited, current].join(",")}`;
    return;
  }
  visited.push(current);
  show(r.next);
}

// Vastused jäävad ainult selle brauseri vahekaardi sessionStorage'isse, et Optioni lehel
// saaks need alla laadida. Vahekaardi sulgemisel need kustuvad.
// Edasi viib ainult "ei" (või ükski märgitud), seega on varasemad vastused teada.
function saveAnswers(label) {
  const rows = [...visited, current].map((i) => {
    const q = QUESTIONS[i];
    // Mitmikvaliku juures näitame ka, milliseid valikuid küsiti.
    const text = q.type === "multi" ? `${q.text} (${q.options.join(", ").toLowerCase()})` : q.text;
    return { q: text, a: i === current ? label : q.type === "multi" ? "Ei ühtegi" : "Ei" };
  });
  try {
    sessionStorage.setItem("tervis-vastused", JSON.stringify({ rows, date: new Date().toISOString() }));
  } catch {
    // Privaatrežiimis võib salvestus ebaõnnestuda; siis allalaadimist lihtsalt ei pakuta.
  }
}

function button(text, kind, onClick) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = `btn ${kind}`;
  b.textContent = text;
  b.addEventListener("click", onClick);
  return b;
}

function wrap(...children) {
  const d = document.createElement("div");
  d.className = "answers";
  d.append(...children);
  return d;
}

function begin(index) {
  $("start").hidden = true;
  $("quiz").hidden = false;
  show(index);
}

$("begin").addEventListener("click", () => begin(0));

// Optioni lehelt tagasi tulles (index.html#k=0,1,2) jätkame viimasest küsimusest.
const path = (location.hash.match(/^#k=([\d,]+)$/) || [])[1];
if (path) {
  const steps = path.split(",").map(Number);
  if (steps.every((i) => i < QUESTIONS.length)) {
    const last = steps.pop();
    visited.push(...steps);
    begin(last);
  }
  history.replaceState(null, "", location.pathname);
}

$("back").addEventListener("click", () => {
  if (visited.length) show(visited.pop());
});
