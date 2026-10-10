# Clinical background & flow validation

> Team reference for the colorectal-cancer triage flow. Synthesis of structured research (Oct 2026) against authoritative guidelines and the Estonian care pathway. **The binding rules live in [`../CLAUDE.md`](../CLAUDE.md); this document is the evidence base behind them.** Clinical thresholds are owned and signed off by the project gastroenterologist — treat everything here as input for clinician review, not as settled fact to hard-code unreviewed.

## TL;DR — what the research found
The flow as first drafted in `flow.js` (not the fuller `kusimustik.md` ankeet) has two classes of must-fix before any real member uses it:
1. **Clinical safety** — it under-triages symptomatic and high-family-risk people and over-reassures people with prior tests.
2. **Estonian pathway compliance** — it must route via the GP (perearst), not tell members to self-book a colonoscopy, and must send the eligible screening cohort to the *free* national test.

The guidelines agent and an independent adversarial audit reached the same critical findings → high confidence. Good news: `kusimustik.md` already covers most of the gaps (IBD, Lynch/FAP, "ei tea", prior-colonoscopy findings, single-symptom→GP). The job is to make `flow.js` catch up to the ankeet **safely**.

---

## A. Clinical-safety fixes (ranked)

### 🔴 Critical
1. **Assess symptoms FIRST and on EVERY path.** A reassuring earlier answer (prior colonoscopy, prior negative FIT, young age) must never suppress symptom assessment; a new symptom overrides any prior test/scope/age. *(NICE NG12.)*
2. **Each alarm symptom escalates on its own** (age-stratified) — do not require a cluster of three. Single rectal bleeding, iron-deficiency anaemia, change in bowel habit, unexplained weight loss, abdominal/rectal mass are each independent triggers. *(NICE NG12.)* Currently `flow.js` only escalates to colonoscopy if all three of {abdominal pain, bowel-habit change, weight loss} are ticked — this inverts the guideline. *(Correctly kept: anaemia → colonoscopy, blood in stool → colonoscopy.)*
3. **"Ei tea" / unanswered must fail SAFE** — route toward more assessment, never silently default to "no". Unknown family history materially degrades risk estimation.
4. **≥2 first-degree relatives with CRC → colonoscopy, not FIT.** BSG/ACPGBI 2020: two FDRs with CRC (any age) = moderate risk → one-off colonoscopy at age 55. Current flow sends this to FIT (under-triage).
5. **Add IBD, Lynch/FAP, personal CRC/adenoma history as high-risk routes.** IBD (UC/Crohn's colitis) needs surveillance colonoscopy 8y after onset regardless of age/symptoms. Lynch/FAP need ongoing surveillance programmes, not a one-off scope → split "confirmed syndrome → surveillance/colonoscopy" vs "suspected pattern → genetics referral". None may land in "do nothing" or FIT.
6. **Prior colonoscopy ≠ always Option 5 — capture when + findings.** Keep Option 5 for high-risk/active-surveillance/unknown; return clean, low-risk, >10y-ago members to routine screening. New symptoms override. *(ESGE 2020. Don't compute exact ESGE intervals from self-report — members rarely know polyp size/histology.)*
7. **Prior negative FIT must not override new symptoms; 2-year interval is too long.** FIT re-screen is annual (max biennial per programme); a prior negative FIT reassures only the asymptomatic, FH-negative member.

### 🟠 Moderate
8. **Upper-age / life-expectancy consideration (>75)** — "else → FIT" shouldn't be unbounded; >75 or life expectancy <10y → "discuss with your doctor". FIT stays the default low-harm modality. *(ACP, USPSTF 2021.)*
9. **<45 "do nothing" is guideline-aligned for screening only if symptom/IBD/family checks are complete and single-symptom-sensitive** (rising early-onset CRC). Add a safety-net.
10. **Governance:** persistent "decision support, not diagnosis" disclaimer + acute-symptom emergency carve-out on every output. **EU MDR:** a risk calculator may count as software-as-a-medical-device — legal check before launch.

### ⚖️ For clinician decision (guideline conflict)
- **Single first-degree relative with CRC at ≥50 → FIT or colonoscopy?** BSG 2020 = average risk → FIT/national programme is fine (current logic OK). NCCN = any FDR → colonoscopy at 40 (or −10y). Pick the guideline to follow. (Our "FDR <50 → colonoscopy" fits both; "FDR ≥50 → FIT" fits only BSG.)
- FIT re-screen interval in Estonia (annual vs biennial programme). Upper-age cut-off value. "Ei tea" exact routing target.

---

## B. Estonian care pathway — do not contradict
1. **The perearst (GP) is the gatekeeper.** Symptomatic or screen-positive → next step is *"pöördu oma perearsti poole"* — only the GP writes the referral (*saatekiri*). **Never instruct a member to self-book a koloskoopia** (except an explicitly labelled private self-pay option, e.g. ~€450 at a private clinic).
2. **Eligible national-screening cohort (ages 56–68, invited even birth-years; 2026: b.1958/60/62/64/66/68/70) → the FREE Tervisekassa peitvere test from their perearst.** Never push an eligible member to a paid test. Our real value-add is the *out-of-cohort* member (45–55, or symptomatic) where the state currently does nothing.
3. **Speak positive/negative, never numbers** — the FIT numeric cut-off and realistic colonoscopy wait-time are not published; don't display or promise them.
4. **National pathway facts:** invitation sent in the GP's name (Vähi sõeluuringute register) → book a pereõde visit → receive the *komplekt* (test, infomaterjal, ankeet, prepaid envelope) → home test → result in **Terviseportaal within ~10 working days**. Positive FIT → GP assesses fitness + writes *saatekiri sõeluuringu koloskoopiasse* + gives *lahtisti* → one of **7 designated endoscopy units** → specialist follow-up at 30 days. Free for everyone in the cohort, incl. uninsured. Codes (if ever integrating): service **7597** (sõelkoloskoopia), dx **Z12.1**.
5. **Citable official risk numbers** (Tervisekassa leaflet): one FDR with CRC/polyp ≈ ×2 risk; ~25% of CRC is familial; 2–5% is a single-gene syndrome (e.g. Lynch).

### Estonian terminology (use these exact patient-facing words)
| Concept | Use | Note |
|---|---|---|
| Screening | **sõeluuring** / sõelkoloskoopia | |
| FIT / occult-blood test | **peitvere test** | not "FIT"/"iFOBT" with patients — lab-internal |
| Colonoscopy | **koloskoopia** *(sooleuuring)* | not "kolonoskoopia"; gloss for lay readers |
| Referral | **saatekiri** | written by the perearst |
| GP / practice nurse | **perearst** / **pereõde** | nurse gives the kit; GP writes referrals |
| GP clinic | **perearstikeskus** | |
| Invited cohort | **sihtrühm** | keep distinct from **riskirühm** (who benefits) |
| Kit | **komplekt** | |
| Result portal | **Terviseportaal** | |
| Bowel prep | **lahtisti** | |
| Online booking | **digiregistratuur** | |

Register: warm, plain, reassuring, non-alarmist, second person, acronyms spelled out. The official leaflet models it: *"Muretsemiseks ei ole põhjust"* + honest about false positives/negatives to support *teadlik valik*.

---

## C. Result-message & UX practice (summary)
Full copy templates and UX detail are in [`design-principles.md`](./design-principles.md). In brief: result messages follow a **three-beat** structure (reassure → what was found → one clear next action); negatives pair reassurance with an honest false-negative caveat + re-screen date; numbers as natural frequencies ("3 in 100") + icon arrays; bad news by a human, good news self-serve; one question per screen; the biggest uptake lever is removing friction (kit shipped/one-tap, prepaid return, default-on + one reminder), per the Dutch programme (~70% participation). Closest commercial analogue: Check4Cancer (UK).

## Open gaps
- FIT numeric cut-off (µg Hb/g) + realistic colonoscopy wait-time — not published; call Tervisekassa (+372 669 6630) if needed.
- EU MDR software-as-a-medical-device classification — legal check before launch.
- Best-practice "don't know" routing in risk questionnaires — weak evidence; default to the cautious branch.

## Sources
NICE NG12 (2021/2023) · BSG/ACPGBI/UKCGG hereditary CRC (Gut 2020, PMC7034349) · ESGE post-polypectomy surveillance 2020 · USPSTF 2021 (JAMA) · EU Council Recommendation 2022 / ECICC (JRC) · NCCN CRC Screening v2025 · ACP M23-0779 · Tervisekassa jämesoolevähi sõeluuring + patient leaflet (2024) + Pärnu Haigla GP protocol (2025) · ravijuhend.ee KJ-C (2016) · TÜ HTA "Kolorektaalvähi sõeluuringu kulutõhusus" · seirekliinik.ee · Check4Cancer · Cologuard/Exact Sciences · QCancer/QResearch · RIVM/IKNL (Netherlands) · IPDAS.
