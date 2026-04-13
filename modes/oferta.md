# Mode: oferta — Complete Evaluation A-F

When the candidate pastes an offer (text or URL), ALWAYS deliver all 6 blocks:

## Step 0 — Archetype Detection

Classify the offer into one of the 6 archetypes (see `_shared.md`). If hybrid, indicate the 2 closest. This determines:
- Which proof points to prioritize in Block B
- How to rewrite the summary in Block E
- Which STAR stories to prepare in Block F

## Block A — Role Summary

Table with:
- Detected archetype
- Domain (research/engineering/data science/safety/NLP)
- Function (research/build/analyze/deploy)
- Level (intern/new grad/entry)
- Remote (full/hybrid/onsite)
- Team size (if mentioned)
- TL;DR in 1 sentence
- **Visa check**: Flag any blockers per `_shared.md` visa filter

## Block B — CV Match

Read `cv.md`. Create table with each JD requirement mapped to exact lines from the CV.

**Adapted to archetype:**
- If Research → prioritize experimental design, statistical analysis, publication-ready work
- If AI Engineer → prioritize pipeline work, API integration, production systems
- If Data Science → prioritize analysis, visualization, statistical modeling
- If Responsible AI → prioritize bias research, ethics coursework, human-centered design
- If SWE → prioritize full-stack projects, hackathon wins, shipping products
- If NLP/LLM → prioritize prompt engineering, text classification, LLM evaluation

**Gaps** section with mitigation strategy for each. For each gap:
1. Is it a hard blocker or a nice-to-have?
2. Can the candidate demonstrate adjacent experience?
3. Is there a portfolio project that covers this gap?
4. Concrete mitigation plan (phrase for cover letter, quick project, etc.)

## Block C — Level and Strategy

1. **Level detected** in the JD vs **candidate's experience level**
2. **Plan "demonstrate readiness"**: specific phrases adapted to archetype, concrete achievements to highlight, how to position research experience as professional work
3. **Plan "if overqualified concerns"**: emphasize learning goals, long-term commitment to the field

## Block D — Comp and Demand

Use WebSearch for:
- Current intern salaries for the role (Glassdoor, Levels.fyi)
- Company reputation for interns
- Role demand trends

Table with data and cited sources. If no data, say so instead of inventing.

**Note for internships:** Comp matters less than learning opportunity. Focus on growth potential.

## Block E — Personalization Plan

| # | Section | Current state | Proposed change | Why |
|---|---------|---------------|-----------------|-----|
| 1 | Summary | ... | ... | ... |
| ... | ... | ... | ... | ... |

Top 5 CV changes + Top 5 LinkedIn changes to maximize match.

## Block F — Interview Plan

6-10 STAR+R stories mapped to JD requirements (STAR + **Reflection**):

| # | JD Requirement | STAR+R Story | S | T | A | R | Reflection |
|---|----------------|--------------|---|---|---|---|------------|

The **Reflection** column captures what was learned or what would be done differently. This signals maturity — junior candidates describe what happened, stronger candidates extract lessons.

**Story Bank:** If `interview-prep/story-bank.md` exists, check if any of these stories are already there. If not, append new ones. Over time this builds a reusable bank of 5-10 master stories that can be adapted to any interview question.

**Selected and framed by archetype:**
- Research → emphasize experimental design, hypothesis testing, methodology decisions
- AI Engineer → emphasize system design, scaling challenges, debugging
- Data Science → emphasize analysis approach, visualization choices, insights discovered
- Responsible AI → emphasize ethical considerations, bias detection, impact assessment
- SWE → emphasize shipping fast, user feedback, iteration
- NLP/LLM → emphasize prompt engineering decisions, evaluation frameworks

Also include:
- 1 recommended case study (which project to present and how)
- Red-flag questions and how to answer them (e.g., "Why this company?", "Where do you see yourself in 5 years?")
Block G — Posting Legitimacy
Analyze the job posting for signals that indicate whether this is a real, active opening. This helps the user prioritize their effort on opportunities most likely to result in a hiring process.
Ethical framing: Present observations, not accusations. Every signal has legitimate explanations. The user decides how to weigh them.
Signals to analyze (in order):
1. Posting Freshness (from Playwright snapshot, already captured in Step 0):

Date posted or "X days ago" -- extract from page
Apply button state (active / closed / missing / redirects to generic page)
If URL redirected to generic careers page, note it

2. Description Quality (from JD text):

Does it name specific technologies, frameworks, tools?
Does it mention team size, reporting structure, or org context?
Are requirements realistic? (years of experience vs technology age)
Is there a clear scope for the first 6-12 months?
Is salary/compensation mentioned?
What ratio of the JD is role-specific vs generic boilerplate?
Any internal contradictions? (entry-level title + staff requirements, etc.)

3. Company Hiring Signals (2-3 WebSearch queries, combine with Block D research):

Search: "{company}" layoffs {year} -- note date, scale, departments
Search: "{company}" hiring freeze {year} -- note any announcements
If layoffs found: are they in the same department as this role?

4. Reposting Detection (from scan-history.tsv):

Check if company + similar role title appeared before with a different URL
Note how many times and over what period

5. Role Market Context (qualitative, no additional queries):

Is this a common role that typically fills in 4-6 weeks?
Does the role make sense for this company's business?
Is the seniority level one that legitimately takes longer to fill?

Output format:
Assessment: One of three tiers:

High Confidence -- Multiple signals suggest a real, active opening
Proceed with Caution -- Mixed signals worth noting
Suspicious -- Multiple ghost job indicators, investigate before investing time

Signals table: Each signal observed with its finding and weight (Positive / Neutral / Concerning).
Context Notes: Any caveats (niche role, government job, evergreen position, etc.) that explain potentially concerning signals.
Edge case handling:

Government/academic postings: Longer timelines are standard. Adjust thresholds (60-90 days is normal).
Evergreen/continuous hire postings: If the JD explicitly says "ongoing" or "rolling," note it as context -- this is not a ghost job, it is a pipeline role.
Niche/executive roles: Staff+, VP, Director, or highly specialized roles legitimately stay open for months. Adjust age thresholds accordingly.
Startup / pre-revenue: Early-stage companies may have vague JDs because the role is genuinely undefined. Weight description vagueness less heavily.
No date available: If posting age cannot be determined and no other signals are concerning, default to "Proceed with Caution" with a note that limited data was available. NEVER default to "Suspicious" without evidence.
Recruiter-sourced (no public posting): Freshness signals unavailable. Note that active recruiter contact is itself a positive legitimacy signal.
---

## Post-evaluation

**ALWAYS** after generating blocks A-G:

### 1. Save report .md

Save complete evaluation to `reports/{###}-{company-slug}-{YYYY-MM-DD}.md`.

- `{###}` = next sequential number (3 digits, zero-padded)
- `{company-slug}` = company name in lowercase, no spaces (use hyphens)
- `{YYYY-MM-DD}` = current date

**Report format:**

```markdown
# Evaluation: {Company} — {Role}

**Date:** {YYYY-MM-DD}
**Archetype:** {detected}
**Score:** {X/5}
**URL:** {job posting URL}
**Legitimacy:** {High Confidence | Proceed with Caution | Suspicious}
**PDF:** {path or pending}

---

## A) Role Summary
(complete Block A content)

## B) CV Match
(complete Block B content)

## C) Level and Strategy
(complete Block C content)

## D) Comp and Demand
(complete Block D content)

## E) Personalization Plan
(complete Block E content)

## F) Interview Plan
(complete Block F content)

## G) Draft Application Answers
(only if score >= 4.0 — draft answers for the application form)

---

## Extracted Keywords
(list of 15-20 keywords from JD for ATS optimization)
```

### 2. Register in tracker

**ALWAYS** register in `data/applications.md`:
- Next sequential number
- Current date
- Company
- Role
- Score: match average (1-5)
- Status: `Evaluated`
- PDF: ❌ (or ✅ if auto-pipeline generated PDF)
- Report: relative link to report .md (e.g., `[001](reports/001-company-2026-01-01.md)`)

**Tracker format:**

```markdown
| # | Date | Company | Role | Score | Status | PDF | Report |
```
