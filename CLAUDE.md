# CLAUDE.md

**Read this first — it applies to everyone here, human or AI.** It's short on purpose. (Other AI tools: AGENTS.md points here. Fuller detail & copy templates: `docs/design-principles.md`.)

## What this is
A member-facing web tool that helps a person understand their colorectal-cancer (jämesoolevähk) risk and take the **right next step** (do nothing now · peitvere test · koloskoopia · see your GP now · follow your treating doctor). The clinical decision is a **deterministic, clinician-validated decision tree** in `docs/flow.js`. It is **decision support, not a diagnosis.** It's an early-stage Tuleva member experiment, deliberately kept **separate from the pension-fund business**.

## The ethos (why we build it this way)
Tuleva is member-owned — we're on the member's side, not selling services. So: **recommend the least a person actually needs, and be willing to say "you don't need anything right now."** Plain, warm, honest, non-alarmist. Simple enough for a tired person on a bad day. **Trust first, clever second.**

## 🔴 Never break these (patient safety · Estonian care pathway · legal)
- **Decision support, not diagnosis** — every outcome says so and routes to a clinician.
- **The GP (perearst) is the gatekeeper.** For symptoms or a positive result, the next step is *"pöördu oma perearsti poole"*. **Never tell a member to self-book a koloskoopia** (except an explicitly labelled private self-pay option).
- **Symptoms are checked first and on every path.** Each alarm symptom (bleeding, anaemia, bowel-habit change, weight loss, pain) escalates **on its own** — never require a cluster. A new symptom overrides any prior test, scope, or age answer.
- **"Ei tea" fails safe** — route toward *more* assessment, never silently treat it as "no".
- **Eligible national-screening cohort (56–68, invited) → the FREE Tervisekassa peitvere test.** Never push an eligible member to a paid test. Our value-add is the people the state doesn't cover (e.g. 45–55, or symptomatic).
- **High-risk categories route to a clinician/surveillance, never "do nothing":** IBD (UC/Crohn's), Lynch/FAP/polyposis, personal CRC/adenoma history, ≥2 first-degree relatives with CRC.
- **Speak positive/negative, not numbers** — no FIT thresholds, no wait-time promises (neither is published).
- **Every "do nothing" outcome carries a safety-net** ("come back if you develop bleeding, bowel-habit change, weight loss, pain, or are told you're anaemic").

## Clinical content is clinician-owned
**Do not invent, change, or "improve" clinical thresholds, age cuts, symptom lists, or routing.** They are owned and signed off by the project gastroenterologist. If logic looks wrong or guidelines conflict, **flag it for a human — don't silently decide.** Keep triage deterministic in `docs/flow.js`; an LLM may parse input or word output, but **never makes the clinical call**. Note: `kusimustik.md` is the fuller intended questionnaire — the code should catch up to it *safely*, not diverge from it.

## Dev conventions
- Vanilla HTML/CSS/JS in `docs/` (served via GitHub Pages). No heavy framework — small and legible.
- Triage logic in `docs/flow.js`; **update `tests/flow.test.js` for every routing change**; keep `node --test tests/*.test.js` green.
- One question per screen; visible progress; back button; "don't know"/skip never blocks.
- Member-facing copy is plain Estonian: **peitvere test** (not "FIT"), **koloskoopia** *(sooleuuring)*, **sõeluuring**, **perearst / pereõde**, **saatekiri**. Warm, reassuring — no jargon, no fear words, never "diagnosis".
- **Every outcome (option 1–5) explains *why* — per person, in plain language.** Show the one-line reason it's the right next step for *this* person (drawn from their answers), with an expandable **"Miks see on sinu jaoks õige?"** for the fuller rationale. Never a black box, never "because the system said so".
- **Voice follows Daniel Vaarik's plain-Estonian principles** (*Sõnumiseadja käsiraamat*): logic over cleverness, short sentences, active verbs, few adjectives, no euphemisms or evasion ("keerutamisest ei sünni usaldust"). Detail in `docs/design-principles.md`.
