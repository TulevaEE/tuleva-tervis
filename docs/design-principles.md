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
- **Bad news by a human, good news self-serve.** A potentially frightening result routes to a person (nurse/GP), not a cold screen.
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

## UX patterns
- One question per screen; Enter advances; visible progress; back navigation; non-critical fields skippable.
- Give every risk question an explicit **"ei tea"** option — it routes to the *more cautious* branch and never blocks progress.
- An **eligibility gate up front** (asymptomatic + age + "any visible bleeding → see a doctor, not us") diverts people a screener shouldn't serve.
- **Handoff:** report-and-refer. Deliver any discount code/voucher **on the results screen, paired with the recommended action** (the code and the "what to do next" are the same moment).
- Use the `kusimustik.md` ankeet as the questionnaire backbone (it already includes smoking/alcohol/BMI, IBD, Lynch/FAP, prior-test detail, "ei tea").

## Co-op framing
Position screening as a **member benefit at a members' price** — cooperative purchasing power justifies the price and lowers the out-of-pocket barrier. This is the natural home for the voucher/code.

## Terminology & conventions
See [`clinical-background.md`](./clinical-background.md) for the Estonian terminology table and care-pathway facts. Dev conventions are in [`../CLAUDE.md`](../CLAUDE.md) (vanilla JS in `docs/`, deterministic logic in `flow.js`, tests, plain-Estonian copy).
