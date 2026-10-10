// Uuendab docs/providers.md koloskoopia tabelis veeru "Järgmine vaba aeg" pakkujate avalikust broneerimisotsingust.
// Käivita käsitsi: node scripts/update-free-times.js, seejärel commit ja push. Automaatset ajastust pole (kliinikutelt luba veel pole).
// Päring tehakse siit, mitte külastaja brauserist – nii ei saa kliinik teada, kes Option 2 lehte vaatab.
const fs = require("node:fs");
const path = require("node:path");

const FILE = path.join(__dirname, "../docs/providers.md");
const COLUMN = "Järgmine vaba aeg";

// Mis teenuse lähimat aega iga pakkuja real näitame.
const SOURCES = [
  // Gastroenteroloogi vastuvõtt (kohapeal), mitte koloskoopia – koloskoopiat Confido veebis broneerida ei saa.
  { provider: "Confido", label: "C0002", slot: () => confidoSlot("C0002") },
  // Koloskoopia registratuur.ee kaudu: https://www.registratuur.ee/et/services?fieldgroup=973&serviceid=4893
  { provider: "Medicum", label: "registratuur 4893", slot: () => registratuurSlot("medicum", 4893) },
];

// Confido broneerimiskeskkonna (minu.confido.ee) avalik otsing; ametlikku API-t pole.
const CONFIDO_SEARCH = "https://api-gateway.confido.ee/api/public/self-service-api/search";

async function confidoSlot(serviceCode) {
  const res = await fetch(`${CONFIDO_SEARCH}?searchTextLanguageCode=et&serviceCodes=${encodeURIComponent(serviceCode)}`);
  if (!res.ok) throw new Error(`Confido ${serviceCode}: HTTP ${res.status}`);
  const body = await res.json();
  const service = ((body.data && body.data.services) || []).find((s) => s.serviceCode === serviceCode);
  return service && service.nextAvailable ? { name: service.name, at: service.nextAvailable } : null;
}

// registratuur.ee (Medisoft MISPro) avalik vabade aegade päring; arsti nime ega muid andmeid ei salvesta.
const REGISTRATUUR_API = "https://api.mispro.ee/public/service-times";

async function registratuurSlot(tenant, serviceId) {
  const res = await fetch(`${REGISTRATUUR_API}/${tenant}/service-id/${serviceId}/dates`);
  if (!res.ok) throw new Error(`registratuur ${tenant}/${serviceId}: HTTP ${res.status}`);
  const body = await res.json();
  return firstRegistratuurTime(body);
}

// Kõige varasem aeg vastusest { Dates: [{ Date, Times: [{ TimeFrom, ServiceName }] }] }.
function firstRegistratuurTime(body) {
  const times = ((body && body.Dates) || []).flatMap((d) =>
    (d.Times || []).map((t) => ({ name: t.ServiceName || d.ServiceName, at: `${d.Date.slice(0, 10)}T${t.TimeFrom}` })));
  times.sort((a, b) => a.at.localeCompare(b.at));
  return times[0] || null;
}

// { at: "2026-10-12T13:30:00", name: "Gastroenteroloogi vastuvõtt" } → "2026-10-12 13:30 · Gastroenteroloogi vastuvõtt"
function cellText(slot) {
  return slot ? `${slot.at.slice(0, 10)} ${slot.at.slice(11, 16)} · ${slot.name}` : "—";
}

// Paneb tabelis, kus on veerg `column`, pakkuja `provider` reale väärtuse `value`.
function setCell(md, provider, column, value) {
  const lines = md.split("\n");
  let col = -1;
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].startsWith("|")) {
      col = -1;
      continue;
    }
    const cells = lines[i].trim().slice(1, -1).split("|").map((c) => c.trim());
    if (cells.includes(column)) {
      col = cells.indexOf(column);
    } else if (col >= 0 && cells[0] === provider) {
      cells[col] = value;
      lines[i] = `| ${cells.join(" | ")} |`;
    }
  }
  return lines.join("\n");
}

async function main() {
  let md = fs.readFileSync(FILE, "utf8");
  const before = md;
  for (const { provider, label, slot } of SOURCES) {
    try {
      const value = cellText(await slot());
      md = setCell(md, provider, COLUMN, value);
      console.log(`${provider} (${label}): ${value}`);
    } catch (err) {
      // Vea korral jääb vana väärtus alles; leht peidab mineviku aja ise.
      console.error(`${provider} (${label}) jäi uuendamata:`, err.message);
      process.exitCode = 1;
    }
  }
  if (md !== before) fs.writeFileSync(FILE, md);
  else console.log("Muudatusi pole.");
}

if (require.main === module) main();

module.exports = { cellText, setCell, firstRegistratuurTime };
