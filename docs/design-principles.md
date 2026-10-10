# Design principles & copy templates

> The craft detail behind [`../CLAUDE.md`](../CLAUDE.md). CLAUDE.md holds the **binding rules** (ethos + hard safety/pathway/legal guardrails); this document is the **how-to** for building and writing. Evidence base: [`clinical-background.md`](./clinical-background.md). Based on Tuleva's design ethos + evidence-based behavioural design for preventative health (IPDAS, Check4Cancer, Cologuard, Dutch/Nordic screening programmes, NICE/USPSTF framing).

## Tuleva ethos → design choices
1. **On the member's side — always.** Member-owned, incentives aligned with the member, not with selling. Recommend the *least* a person needs; be willing to say **"you don't need anything right now."** Never nudge toward more tests/spend/pricier options than the evidence warrants.
2. **Radical transparency.** Explain *why* a recommendation is given, in plain terms. No black boxes.
3. **Simplicity that works on a bad day.** One thing per screen, fewest steps, least friction. Boring and clear beats clever.
4. **Honesty over reassurance theatre.** State limits and uncertainty (false negatives exist); never fear-monger, never over-promise.
5. **Evidence-based or it doesn't ship.** Every clinical rule traces to a named guideline **and** a clinician sign-off.
6. **Accessible by default.** Plain Estonian, no jargon, acronyms spelled out, numbers as natural frequencies.

## Behavioural-design principles for preventative health
- **Reduce friction above all.** Uptake is won by removing steps, not persuasion — fewest fields, clear progress, back button, skippable non-critical items, no dead ends. Keep assessment → recommendation → next step in one unbroken flow. (The Dutch FIT programme reaches ~70% participation mostly through logistics: kit arrives unrequested, prepaid return, no appointment, default-on + one reminder, biennial auto-reinvite.)
- **Anti-fear framing.** Fear appeals backfire. Lead with hope + agency ("caught early, this is almost always treatable — here's your one next step"), never mortality-scare copy.
- **Honest reassurance, including "no action needed."** When the evidence says no test is needed, say so plainly and warmly — and still add a safety-net. This anti-overtesting honesty is a feature.
- **Bad news by a human, good news self-serve.** A potentially frightening result routes to a person (GP or the doctor doing the koloskoopia), not a cold screen.
- **Numbers as natural frequencies + icon arrays** ("3 in 100", a 100-figure grid) — never bare percentages or relative-risk multipliers alone.
- **Terminology lock:** "screening / detection / follow-up check" (sõeluuring / avastamine / täpsustav uuring). Never call the tool or a test a "diagnosis". Ban alarm words.
- **Pre-answer the member's four worries:** should I take part · how it works · logistics · what happens if it's positive.

## Result-message templates (three beats: reassure → what → one action)
Adapt to Estonian; keep warm and short.

- **Positive screen (peitvere test positive):**
  > "Positiivne tulemus **ei tähenda**, et sul on vähk. Leiti väike kogus verd, mis vajab täpsustavat uuringut. **Järgmine samm:** pöördu oma perearsti poole koloskoopia (sooleuuringu) saatekirja saamiseks. Enamik positiivseid tulemusi ei ole vähk."
- **Negative screen (honest, not bare reassurance):**
  > "Verd ei leitud — vähk on **ebatõenäoline**. Harva võib test jääda negatiivseks ka siis, kui midagi on, seega korda uuringut [X aja] pärast. **Kui tekivad sümptomid, pöördu varem perearsti poole.**"
- **Low risk / "you don't need a test now":**
  > "Praegu ei ole sul sõeltesti vaja. [põhjus lihtsalt]. Soovitame uuesti hinnata [X] pärast. **Pöördu perearsti poole varem, kui tekib** veri väljaheites, seedetegevuse muutus, seletamatu kaalulangus, kõhuvalu või kui sulle öeldakse, et oled aneemias."
- **Symptoms present → GP now:** direct, calm, urgent, no fear spiral; name the single action ("pöördu oma perearsti poole — ära oota sõeluuringut").
- Every outcome carries the safety-net line and a "decision support, not a diagnosis" disclaimer.

## Explain the "why" — per person, with progressive disclosure
Every outcome page (option 1–5) tells the person, in **one plain sentence**, why this is the right next step **for them**, drawn from what they answered — then offers the fuller reasoning behind an expandable / modal **"Miks see on sinu jaoks õige?"**. This is both our transparency ethos ("never a black box") and established decision-aid practice (IPDAS *layered information*): keep the main message clean, give anyone who wants it the full honest rationale.
- Headline reason = one sentence, in terms of the person's own answers, no jargon. E.g. *"Kuna lähisugulasel oli soolevähk enne 50. eluaastat, on sinu risk kõrgem — seepärast soovitame koloskoopiat (sooleuuringut), mitte peitvere testi."*
- The expandable can also hold: what the step involves, what positive/negative means, the guideline basis in lay terms, and "arutasi seda alati oma perearstiga".
- Never "because the system said so"; never hide the reasoning.

## Voice & plain language — Daniel Vaarik, *Sõnumiseadja käsiraamat*
Use Vaarik's Estonian clear-writing principles as the **voice layer** for all member-facing copy. They sit *on top of* the health-specific structure above (three-beat result scripts, risk framing, safety routing) — the structure comes from the clinical/behavioural evidence; Vaarik governs the voice. The rules that matter most here:
- **Logic and comprehensibility beat cleverness** — the goal is to be understood, not to impress.
- **Write for the member, not the clinician** — switch out of medical register (*"peitvere test"*, not "FIT").
- **Short sentences, short words, active voice, strong verbs** — *"Majanduskasv peatus"*, not *"Majanduskasvu negatiivsed väljavaated realiseerusid"*. (~¼ of Estonians have secondary education; long/complex text loses them.)
- **Go easy on adjectives** — piling on reassuring or dramatic adjectives makes the reader distrust you; let the facts carry it.
- **No euphemisms, no evasion** — *"Eufemismid külmutavad mõtte"*; *"keerutamisest ei sünni usaldust"*. Don't soften *vähk* into vague filler; say the true thing plainly and kindly. (This is our trust ethos, in his words.)
- **Plain Estonian over loan-words**; **cut everything unnecessary** (leave out what the reader already knows or can infer).
- **Someone owns each outcome's copy** — avoid "komiteekirjutamine".

Reference: Daniel Vaarik, *Sõnumiseadja käsiraamat* (Memokraat, 2014) — [free PDF](https://memokraat.ee/memokraat.ee/wp-content/uploads/2014/07/s%C3%B5numiseadjak%C3%A4siraamat.pdf), the "Kirjutamine" chapter.

## UX patterns (as implemented)
- **One question per screen, yes/no.** "Ei" moves on; the first "jah" ends on an outcome page. The one multi-choice question (pain / bowel-habit change / weight loss) uses tick-boxes. There is **no "ei tea"** (team decision 10.10.2026) — so hint texts must make every question answerable.
- **Visible progress** ("Samm 2/4" + bar), **back button**, and from every outcome page a link **back to the last question** and one to start over.
- **Order:** previous koloskoopia → symptoms → family history → age and previous FIT. Known gap: "yes" to a previous koloskoopia skips the symptom questions (flagged for dr Seth, see `../CLAUDE.md`).
- **Five outcome pages, one next step each:** 1 nothing now, redo in 2 years · 2 koloskoopia · 3 peitvere test (free via the pereõde for the 2026 cohort, otherwise pharmacy or lab) · 4 GP now · 5 follow your treating doctor.
- **Option 2 sends the member straight to a koloskoopia** — via the GP's saatekiri or a private self-pay clinic. Team decision 10.10.2026, differs from the "GP as gatekeeper" finding in `clinical-background.md`.
- **The member keeps their answers, we don't.** The outcome page shows "Sinu vastused" with **download as .md or PDF** (browser print). Answers live only in the tab's `sessionStorage` and disappear when it closes. No health data is sent anywhere; the only analytics is an anonymous page-view count per outcome page (GoatCounter).
- **Handoff:** report-and-refer. Deliver any discount code/voucher **on the results screen, paired with the recommended action** (the code and the "what to do next" are the same moment).
- **Questionnaire source:** `kusimustik.md` documents the implemented flow with an "Alus" (clinical basis) line per question. The fuller Doc30 ankeet (smoking/alcohol/BMI, IBD, Lynch/FAP, prior-test detail) is in git history (`df4979e`) for future versions.

## Co-op framing
Position screening as a **member benefit at a members' price** — cooperative purchasing power justifies the price and lowers the out-of-pocket barrier. This is the natural home for the voucher/code.

## Terminology & conventions
See [`clinical-background.md`](./clinical-background.md) for the Estonian terminology table and care-pathway facts. Dev conventions are in [`../CLAUDE.md`](../CLAUDE.md) (vanilla JS in `docs/`, deterministic logic in `flow.js`, tests, plain-Estonian copy).
