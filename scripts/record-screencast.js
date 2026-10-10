// Salvestab kaks pitchi screencast'i Tuleva tervise küsimustikust (telefonivaade) kausta screencast/.
// Kasutab veebis olevat rakendust ja sinu arvuti Chrome'i.
//
// Käivitamine (repo juurkaustas, macOS):
//   npm install --no-save playwright@1.47.2
//   npx playwright install ffmpeg
//   node scripts/record-screencast.js
//
// Näide 1: 45+ inimene läbib kõik sammud → peitvere test (sünniaasta 1975, tasulised laborid).
// Näide 2: aneemia → koloskoopia.
const { chromium } = require("playwright");
const path = require("path");

const BASE = "https://tulevaee.github.io/tuleva-tervis/";
const OUT = path.join(__dirname, "..", "screencast");
const VIEW = { width: 390, height: 844 };

const wait = (page, ms) => page.waitForTimeout(ms);

// Näitab sõrmepuudutust: ring liigub elemendi peale ja "vajutab".
async function tap(page, locator, pause = 900) {
  await locator.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "smooth" }));
  await wait(page, 500);
  const { x, y } = await locator.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const z = parseFloat(document.documentElement.style.zoom) || 1;
    return { x: (r.left + r.width / 2) / z, y: (r.top + r.height / 2) / z };
  });
  await page.evaluate(({ x, y }) => {
    let f = document.getElementById("__finger");
    if (!f) {
      f = document.createElement("div");
      f.id = "__finger";
      f.style.cssText = "position:fixed;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;" +
        "background:rgba(0,47,99,.25);border:2px solid rgba(0,47,99,.55);z-index:99999;pointer-events:none;" +
        "transition:left .45s ease,top .45s ease,transform .15s ease;left:50%;top:90%";
      document.body.append(f);
    }
    f.style.left = x + "px"; f.style.top = y + "px";
  }, { x, y });
  await wait(page, 600);
  await page.evaluate(() => { document.getElementById("__finger").style.transform = "scale(.7)"; });
  await wait(page, 180);
  await page.evaluate(() => { document.getElementById("__finger").style.transform = "scale(1)"; });
  await locator.evaluate((el) => { el.focus(); el.click(); if (el.tagName !== "INPUT") el.blur(); });
  await wait(page, pause);
}

const btn = (page, text) => page.locator("#controls .btn", { hasText: new RegExp(`^${text}$`) });

async function smoothScroll(page, dy, ms = 1400) {
  await page.evaluate(({ dy, ms }) => new Promise((done) => {
    const start = window.scrollY, t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      window.scrollTo(0, start + dy * e);
      k < 1 ? requestAnimationFrame(step) : done();
    };
    requestAnimationFrame(step);
  }), { dy, ms });
  await wait(page, 400);
}

async function record(name, scenario) {
  const browser = await chromium.launch({ channel: "chrome" });
  // Video jaoks: aken on 2× suurem ja leht 2× suumitud, nii et paigutus on telefoni laiune, aga pilt terav.
  const big = { width: VIEW.width * 2, height: VIEW.height * 2 };
  const context = await browser.newContext({ viewport: big, recordVideo: { dir: OUT, size: big } });
  await context.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => { document.documentElement.style.zoom = "2"; });
  });
  const page = await context.newPage();
  const t0 = Date.now();
  await page.goto(BASE + "index.html#alusta", { waitUntil: "networkidle" });
  await page.locator("#question").waitFor();
  await wait(page, 300);
  const ready = (Date.now() - t0) / 1000 + 0.6; // nii palju valget algust lõikame ära
  await wait(page, 1200);
  await scenario(page);
  const tmp = await page.video().path();
  await context.close();
  await browser.close();
  const file = path.join(OUT, `${name}.webm`);
  // Lõika laadimise aegne valge algus ära (Playwright'i ffmpeg oskab VP8/WebM-i).
  const ff = require("path").join(require("os").homedir(), "Library/Caches/ms-playwright/ffmpeg-1010/ffmpeg-mac");
  require("child_process").execFileSync(ff, ["-y", "-loglevel", "error", "-ss", String(ready), "-i", tmp,
    "-c:v", "libvpx", "-b:v", "3M", "-crf", "10", file]);
  require("fs").unlinkSync(tmp);
  console.log("valmis:", file);
}

// Näide 1: üle 45, läbib kõik sammud → peitvere test.
async function example1(page) {
  await tap(page, btn(page, "Ei"));            // 1.1 koloskoopia
  await tap(page, btn(page, "Ei"));            // 2.1 aneemia
  await tap(page, btn(page, "Ei"));            // 2.2 veri
  await wait(page, 500);
  await tap(page, btn(page, "Edasi"));         // 2.3 sümptomeid pole
  await tap(page, btn(page, "Ei"));            // 3.1
  await tap(page, btn(page, "Ei"));            // 3.2
  await tap(page, btn(page, "Ei"));            // 3.3
  await tap(page, btn(page, "Ei"));            // 3.4
  await tap(page, btn(page, "Ei"));            // 4.1 alla 45? ei
  await tap(page, btn(page, "Ei"), 2200);      // 4.2 FIT viimase 2 a jooksul? ei → Option 3
  await page.waitForLoadState("networkidle");
  await wait(page, 1500);
  await tap(page, page.locator("details.why summary"), 2500);
  await tap(page, page.locator("#year"), 300);
  await page.keyboard.type("1975", { delay: 180 });
  await wait(page, 500);
  await tap(page, page.locator("#year-form button"), 1500);
  await page.locator("#year-form").evaluate((f) => f.requestSubmit());
  await wait(page, 800);
  await smoothScroll(page, 600, 2000);
  await wait(page, 1500);
  await smoothScroll(page, 700, 2000);
  await wait(page, 2000);
}

// Näide 2: aneemia → koloskoopia.
async function example2(page) {
  await tap(page, btn(page, "Ei"));            // 1.1 koloskoopia
  await wait(page, 1200);                      // loe aneemia selgitust
  await tap(page, btn(page, "Jah"), 2200);     // 2.1 aneemia → Option 2
  await page.waitForLoadState("networkidle");
  await wait(page, 1500);
  await tap(page, page.locator("details.why summary"), 3000);
  await smoothScroll(page, 650, 2000);
  await wait(page, 1500);
  await smoothScroll(page, 700, 2000);
  await wait(page, 2000);
}

(async () => {
  await record("naide-1-peitvere-test", example1);
  await record("naide-2-koloskoopia", example2);
})();
