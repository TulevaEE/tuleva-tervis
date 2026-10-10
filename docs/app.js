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
    const next = button("Edasi", "primary", () =>
      go(checks.querySelectorAll("input:checked").length));
    controls.append(checks, wrap(next));
  } else {
    controls.append(wrap(
      button("Jah", "primary", () => go(true)),
      button("Ei", "ghost", () => go(false)),
    ));
  }
}

function go(value) {
  const r = answer(current, value);
  if (r.option) {
    location.href = `option-${r.option}.html`;
    return;
  }
  visited.push(current);
  show(r.next);
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

$("begin").addEventListener("click", () => {
  $("start").hidden = true;
  $("quiz").hidden = false;
  show(0);
});

$("back").addEventListener("click", () => {
  if (visited.length) show(visited.pop());
});
