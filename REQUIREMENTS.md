# Requirements Alignment — Healthcare Dashboard (Health Savvy)

**Sources:**
- `NTT Dashboard_Comments_12072026.docx` — client comments on the current dashboard build (screenshot-by-screenshot)
- `Potential AI solutions_12072026.docx` — client's product direction for AI capabilities
- Reviewed against current code: `src/pages/HrPage.tsx`, `src/data.ts`

**Date aligned:** 14 Jul 2026

---

## 1. Guiding constraints (from client comments)

The current Health Savvy system captures **outpatient data only**, with three payment
types: **Cashless, Self-payment, Reimbursement**. There is **no** pharmacy, specialist,
imaging, mental health, inpatient, or emergency data. There is **no department tracking**,
and the **claim limit varies by tier per employee** (not a flat monthly amount).

Anything the dashboard shows must be producible from that data. Features that need data
or capabilities the system doesn't have are **Phase 2** or removed.

**Positioning (from AI-solutions doc):** Health Savvy is an **AI Care Management Platform
for Employers** — navigation, prevention, adherence, operational efficiency — **not** an
AI diagnosis platform. Employers get anonymized population insights; employees get
personalized preventive recommendations. Individual medical detail is never exposed to HR.

---

## 2. Phase 1 — Corrections to the current dashboard

| # | Requirement | Client comment | Affected code |
|---|-------------|----------------|---------------|
| R1 | **Claims by Category** must show only Outpatient, broken down by payment type: Cashless / Self-payment / Reimbursement. Remove Pharmacy, Specialist, Imaging, Mental Health, Inpatient, Emergency. | "Capturing the following data only… No pharmacy, specialist, imaging, mental health, in-patient and emergency." | `data.ts` `CLAIM_RECORDS` (category + providers), `BENEFIT_UTILIZATION`, `HrPage.tsx` category chart |
| R2 | **Remove the "Submitted Twice+" filter tab** and the repeat-claim badges/KPI. (Duplicate-visit *detection* stays as a Phase 2 AI backend candidate — see R14 — but is not surfaced as a filter chip.) | "No need to show 'submitted twice'." | `HrPage.tsx` `STATUS_FILTERS`, KPI cards, table badges |
| R3 | **Remove Department column and department filter** from claims views. No department-based charts fed by claims. | "Current Health Savvy system has no tracking on Department." | `HrPage.tsx` `DEPTS` dropdown + `Dept` column, `WELLNESS_SCORES_BY_DEPT`, `DEPT_HEALTH` |
| R4 | **Tiered claim limits.** Replace the flat `$300/month` limit with a per-employee limit derived from the employee's benefit tier (several tiers). "Exceeded / Remaining / Progress" compute against the employee's own tier limit. | "The limit per employee vary by several tiers." | `data.ts` `MONTHLY_CLAIM_LIMIT`, `buildEmployeeSummaries()`, header copy "Limit: $300/employee" |
| R5 | **Remove the Employee Wellness score cards** (Physical / Mental / Social / Financial / Nutritional / Overall 84) and the wellness trend + department comparison charts. Any future scoring requires data to support it **and endorsement by health professionals**. | "No data to support such scoring. We also need the know how and endorsements of health professionals." | `HrPage.tsx` wellness KPI grid + trend charts, `data.ts` `WELLNESS_INDEX`, `WELLNESS_TREND` |
| R6 | **Remove/defer the Wellness Programs grid.** Smoking cessation, weight management, nutrition coaching are arranged via the ecosystem, but there is no data feed to the dashboard yet. Show at most a static "available via ecosystem" referral list, no enrollment/completion stats. | "These are phase 2 capabilities… no data to feed the dashboard yet." | `HrPage.tsx` programs grid, `data.ts` `WELLNESS_PROGRAMS` |
| R7 | **Remove/defer Health Risk Indicators and Wellness Rewards.** System cannot track these today; risk scores would also need professional endorsement. | "Current system doesn't have such capabilities… Need health professionals to give endorsements." | `HrPage.tsx` risks + rewards cards, `data.ts` `WELLNESS_RISKS`, `WELLNESS_REWARDS` |
| R8 | **Remove/defer Upcoming Health Campaigns.** The Health Savvy mobile app and web pages have no facility for HR to key in campaign data. | "Good idea but… do not have these information to be keyed in by HR departments." | `HrPage.tsx` campaigns card, `data.ts` `HEALTH_CAMPAIGNS` |
| R9 | **Relabel the "HR AI Intelligence" panel honestly.** Threshold-exceeded, repeat-claimant and pending-claim summaries are rule-based reports (non-AI) — keep them but don't brand them as AI. Anomaly detection may carry AI elements. Spending forecast is a future AI feature gated on data volume (see R12). | "We can produce the other 3 reports, although non-AI technologies can do so. Anomaly detection might need some AI elements." | `HrPage.tsx` AI insight panel |
| R10 | **Currency & market:** client examples are in **RM** (Malaysian market). Confirm and switch displayed currency from `$` to `RM`. | Implied throughout both docs (RM5K, RM549, RM1 million premiums). | All amount rendering |

## 3. Phase 1.5 — The differentiator: AI Observations & Suggestions report

From the AI-solutions doc ("My opinions"): the core near-term AI deliverable is an
**auto-generated quarterly / semi-annual claims commentary** — the report TPAs only
produce for customers above RM1M annual premium, generated economically for every
corporate customer.

- **R11 — Observations section**, generated from collected claims data, each with a
  benchmark judgement (high side / acceptable range), modelled on the client's example:
  - Incidence rate (e.g. "11%, at the high side")
  - Average claim size vs acceptable range
  - Claim cost per covered headcount, with attribution (frequency-driven vs cost-driven)
  - Provider outliers: average claim per visit by provider; % of total payout by provider
  - Chronic vs non-chronic claim split (e.g. ">90% non-chronic → treatable as outpatient")
  - Employee vs dependent split
  - High utilizers: employees with >5 visits/year vs national average, avg cost per visit,
    correlation with medical leave
- **R12 — Suggestions section**: actionable follow-ups (monitor top-10 utilizers, review
  coverage of injury-prone categories, road-safety campaigns, maternity coverage review),
  **each linked to solution providers within the Health Savvy ecosystem** (smoking
  cessation, chronic disease management, health coaching) with links/contacts. HR decides
  whether to engage them.
- **R13 — Top-10 disease analysis** using the **ICD-10 codes** already captured by Health Savvy.
- **R14 — Minimum-data threshold**: for small SMEs with too few claims per period, suppress
  the analysis (statistically insignificant) and show an explanatory note instead.
- **R12 (forecast gating)** — **Spending Forecast** for HR budgeting is wanted, but only
  once enough data exists to make predictions reliable; until then it's rule-based
  projection, clearly labelled.

## 4. Phase 2 — AI capability roadmap (from AI-solutions doc)

Candidate features, in the client's frame of care management, not diagnosis:

- **Duplicate visit detection** — flag repeat consultations for the same issue within a
  short window (backend detection, replaces the removed "submitted twice" UI).
- **Chronic disease prediction** — early intervention for diabetes, hypertension, asthma.
- **Mental health risk detection** — early support before repeated stress-related visits.
- **Fraud / anomaly detection** — unusual claiming patterns, with clinical review.
- **Provider recommendation** — steer employees to suitable nearby clinics by symptoms,
  quality, wait time, cost.
- **AI Health Manager** — continuously analyzes each employee's lifetime health record;
  employer sees **anonymized population insights only**, employee gets personalized
  preventive recommendations.
- Wellness scoring/programs/rewards/campaigns UIs return in Phase 2 once data capture
  and professional endorsement exist (R5–R8).

## 5. Non-functional / governance requirements (from RFP framework section)

- **Blind-trust data separation**: individual medical detail never visible on the
  employer-facing dashboard; population insights only above a minimum aggregation group size.
- **Clinician-in-the-loop**: no autonomous clinical conclusions; health-professional
  endorsement required for any published health score (ties to R5/R7).
- **Explainable AI**: any "high risk" flag must have an auditable trail of contributing data points.
- **No training of external/public LLMs** on customer health data.
- **ROI measurability**: report metrics chosen so cost impact can be validated over time
  (claims cost, incidence rate, absenteeism).

## 6. Out of scope (explicitly, per comments)

- Pharmacy / specialist / imaging / mental-health / inpatient / emergency claim categories (no data)
- Department-level anything driven by claims (no tracking)
- "Submitted twice" as a user-facing filter
- Wellness scores, program stats, risk indicators, rewards, campaigns (Phase 2)
- AI diagnosis positioning
