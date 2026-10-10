# CLAUDE.md

**Read this first — it applies to everyone here, human or AI.** It's short on purpose. (Other AI tools: AGENTS.md points here. Fuller detail & copy templates: `docs/design-principles.md`.)

## What this is
A member-facing web tool that helps a person understand their colorectal-cancer (jämesoolevähk) risk and take the **right next step** (do nothing now · peitvere test · koloskoopia · see your GP now · follow your treating doctor). The clinical decision is a **deterministic decision tree** in `docs/flow.js`, to be signed off by the project gastroenterologist (dr Mari Seth) — several items still await her review (see Known gaps). It is **decision support, not a diagnosis.** It's an early-stage Tuleva member experiment, deliberately kept **separate from the pension-fund business**.

## The ethos (why we build it this way)
Tuleva is member-owned — we're on the member's side, not selling services. So: **recommend the least a person actually needs, and be willing to say "you don't need anything right now."** Plain, warm, honest, non-alarmist. Simple enough for a tired person on a bad day. **Trust first, clever second.**

## 🔴 Never break these (patient safety · Estonian care pathway · legal)
- **Decision support, not diagnosis** — every outcome says so and routes to a clinician.
- **Every alarm symptom escalates on its own — never "do nothing".** Anaemia or blood in stool → koloskoopia (option 2). Abdominal pain, bowel-habit change or weight loss: any one → talk to your GP (option 4, currently in a calm "Tasub sellest perearstiga rääkida" tone); all three → koloskoopia (option 2). Symptoms are asked before family history, age and prior tests.
- **Option 2 recommends a koloskoopia in a supportive, autonomy-respecting tone** ("Sul tasuks kaaluda koloskoopiat", "Otsus jääb sinule"): talk to the GP for a *saatekiri*, or book a private self-pay clinic (providers in `docs/providers.md`). The same tone currently applies to the symptom paths (2.1–2.3) too — whether that slows symptomatic members too much is for dr Seth to confirm. Team decision 10.10.2026; the "GP as gatekeeper" alternative is in `docs/clinical-background.md`.
- **"Ei tea" on the anaemia question (2.1) and the family-history questions (3.1, 3.2, 3.4).** It moves on like "ei", but the outcome page shows a note naming the question and where "jah" would have led (koloskoopia or peitvere test), and asks the member to find out (ask relatives / ask the GP about a blood test) and redo the questionnaire (`unsureNote` in `flow.js`). Team decision 10.10.2026. Other questions stay yes/no; hint texts must make them answerable.
- **Eligible national-screening cohort (2026: born 1958, 1960 … 1970) → the FREE Tervisekassa peitvere test via the pereõde.** Never push an eligible member to a paid test. On option 3 the free route comes before the paid one (pharmacy, lab); only the per-person reason line goes above both. Page order: reason → next step → "Miks see on sinu jaoks õige?" → the rest. Our value-add is the people the state doesn't cover (e.g. 45–55, or symptomatic).
- **High-risk answers never land on "do nothing" or a plain FIT:** relative with CRC before 50, Lynch-pattern cancers on one side of the family, or a positive genetic test → koloskoopia (option 2). A koloskoopia within the last 5 years → follow your treating doctor (option 5).
- **Speak positive/negative, not numbers** — no FIT thresholds, no wait-time promises (neither is published).
- **Health answers never leave the browser.** They live only in the tab's `sessionStorage` so the member can download them (.md / PDF) on the outcome page, and vanish when the tab closes. The only analytics allowed is an anonymous page-view counter (GoatCounter, `docs/counter.js`).
- **Every "do nothing" outcome carries a safety-net** ("come back if you develop bleeding, bowel-habit change, weight loss, pain, or are told you're anaemic").

## Clinical content is clinician-owned
**Do not invent, change, or "improve" clinical thresholds, age cuts, symptom lists, or routing.** They are owned and signed off by the project gastroenterologist. If logic looks wrong or guidelines conflict, **flag it for a human — don't silently decide.** Keep triage deterministic in `docs/flow.js`; an LLM may parse input or word output, but **never makes the clinical call**. `kusimustik.md` documents the flow exactly as implemented, with an **"Alus"** line per question for its clinical basis — keep it in sync with `flow.js`. The fuller original ankeet (Doc30) is in git history (`df4979e`) as a source for future questions.

## Known gaps (flagged for dr Seth, not yet decided)
- A member who had a koloskoopia within 5 years goes straight to option 5 and is **not asked about symptoms**. 5 years is stricter than USPSTF's 10. Research (`docs/clinical-background.md`, NICE NG12) says symptoms should be checked on every path.
- Not asked yet: IBD (Crohn's, UC), Lynch/FAP/polyposis in relatives, when and what the previous koloskoopia found. ≥2 relatives with CRC at 50+ currently routes to FIT.
- Age 75+ is not separated (team decision 10.10.2026). FIT within 2 years → option 1; the interval is dr Seth's call.
- Tone: the soft wording on option 2 ("kaaluda", "otsus jääb sinule") and option 4 ("kui püsib või kordub") also reaches symptomatic members.
- Claims on the pages not yet signed off: "valideeritud gastroenteroloogide poolt…" in the downloadable ankeet (`result.js`), benign-cause sentences on options 2 and 4.
- Full lists: `ulevaade-knowledge-base.md` (findings vs. the knowledge base) and `backlog.md` (ideas and open items).

## Dev conventions
- Vanilla HTML/CSS/JS in `docs/` (served via GitHub Pages). No heavy framework — small and legible.
- GitHub Pages caches JS/CSS for 10 minutes. When you change a `.js` or `.css` file, bump its `?v=` number in every HTML page that loads it, or members will run old code against new pages. `tests/consistency.test.js` fails if pages load the same file with different versions.
- Triage logic in `docs/flow.js`; **update `tests/flow.test.js` for every routing change**; keep `node --test tests/*.test.js` green. `tests/consistency.test.js` also fails if `kusimustik.md` is missing a question, hint, option, outcome title or reason line from the app.
- One question per screen (yes/no or tick-boxes); "no" moves to the next question, the first "yes" ends on an outcome page; visible progress; back button, also from the outcome page back to the last question.
- Member-facing copy is plain Estonian: **peitvere test** (first mention on a page: "väljaheite peitvere test (FIT)"), **koloskoopia** *(sooleuuring)*, **sõeluuring**, **perearst / pereõde**, **saatekiri**. Warm, reassuring — no jargon, no fear words, never "diagnosis".
- **Every outcome (option 1–5) explains *why* — per person, in plain language.** Show the one-line reason it's the right next step for *this* person (drawn from their answers), with an expandable **"Miks see on sinu jaoks õige?"** for the fuller rationale. Never a black box, never "because the system said so".
- **Voice follows Daniel Vaarik's plain-Estonian principles** (*Sõnumiseadja käsiraamat*): logic over cleverness, short sentences, active verbs, few adjectives, no euphemisms or evasion ("keerutamisest ei sünni usaldust"). Detail in `docs/design-principles.md`.

## Working together (PRs)
Several people and AI agents push here in parallel. Before merging a PR:
1. **Merge `main` into the branch first** and re-run `node --test tests/*.test.js`. Pages are edited by many branches at once; this keeps recent features (e.g. "Ei tea" note, share block) from being lost.
2. **New clinical claims need a source or dr Seth.** Numbers ("×2 risk"), attributions ("rahvusvahelised ravijuhendid", "valideeritud") and "this is usually benign" statements must trace to `knowledge base/` or be flagged for dr Seth in the PR. Recurring problem on 10.10.2026.
3. **Check every path that reaches the page.** Copy written for one route (e.g. family risk) is often also shown to another (e.g. symptoms, or 45+ with a recent test). Per-route text goes in `window.REASONS`.
4. **Keep the docs in sync:** `kusimustik.md` (enforced by the test), and this file / `docs/design-principles.md` when a rule or tone changes.
5. Write PR descriptions and review notes in Estonian.
