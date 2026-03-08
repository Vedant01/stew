# 🍲 Stew — Credit User Journeys (Complete)
> *Every journey shows: trigger → conversation → SOP steps → data flow → resolution*

---

## Domain Map

```
CREDIT
├── CIBIL Score
│   ├── J1: Score Drop (sudden, unexplained)
│   ├── J2: Score Stagnation (stuck below 700 for months)
│   └── J3: First Time Checking Score
│
├── Credit Card Behaviour  
│   ├── J4: Bill Upload → High Utilization Found
│   ├── J5: Minimum Payment Spiral (3rd consecutive month)
│   └── J6: Missed Due Date (payment bounced / forgot)
│
├── Loan Decisions
│   ├── J7: EMI Stack Danger (wants new loan, already overloaded)
│   ├── J8: Loan Application Rejected
│   └── J9: Prepayment Decision (has surplus, should I close loan?)
│
└── Credit Report Errors & Disputes
    ├── J10: Wrong Account on Report (never took this loan)
    └── J11: Settled Loan Still Showing Outstanding
```

---

# SECTION 1: CIBIL SCORE

---

## J1: CIBIL Score Drop
### Priya, 29, product manager, Bangalore. Score: 748 → 694

**Trigger:** Priya checks CIBIL on her bank app. Sees 54-point drop. Opens Stew.

---

```
PRIYA: "stew my cibil dropped by 54 points i'm freaking out"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SCENARIO DETECTION
  model: llama-3.2-3b
  result: credit.cibil.score_drop (confidence: 0.97)
  sop: sops/credit/cibil/score_drop.json loaded

INTERNAL: CONTEXT ASSEMBLY (parallel)
  mem0 facts pulled:
    → salary: ₹1,10,000 (1st of month)
    → HDFC Regalia: limit ₹2L, last utilization 18%
    → Axis personal loan: EMI ₹9,200 (active)
    → last CIBIL: 748 (3 months ago)

  SQLite snapshot:
    → no recent documents uploaded
    → no manual transactions this week

  proactive_check:
    → no active warnings currently

  SOP required_data check:
    → need: pan_number ✗ (missing)
    → need: date_of_birth ✗ (missing)
    → proceed to: acknowledge + collect

INTERNAL: LANGGRAPH
  active node: "acknowledge_and_collect"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "54 points in one go is worth taking seriously —
that's not normal fluctuation, something specific
happened. I can pull your full report and tell you
exactly what caused it.

Takes 30 seconds. I'll need your PAN and date of
birth to fetch it — same thing CIBIL asks for."

PRIYA: "ABCDE1234F, 15/06/1995"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: LANGGRAPH
  active node: "pull_report"
  → Surepass CIBIL API called
  → PAN: ABCDE1234F, DOB: 15/06/1995

  API response:
  {
    score: 694,
    accounts: [
      {
        type: "Credit Card", bank: "HDFC",
        limit: 200000, balance: 164000,
        utilization_pct: 82.0,          ← 🚨 was 18% last check
        payment_status: "Regular",
        last_payment: 2500              ← minimum only
      },
      {
        type: "Personal Loan", bank: "Axis",
        emi: 9200, status: "Regular",
        dpd: 0
      }
    ],
    enquiries: [
      {date: "2025-10-01", lender: "Bajaj Finance", type: "Hard"},
      {date: "2025-10-03", lender: "KreditBee", type: "Hard"},
      {date: "2025-10-05", lender: "Navi", type: "Hard"}
    ],
    payment_history_pct: 97.1,
    credit_age_months: 52,
    credit_mix: ["credit_card", "personal_loan"]
  }

INTERNAL: LANGGRAPH
  active node: "analyze_report"
  → function: cibil.root_cause_analysis()

  analysis output:
  {
    primary_cause: {
      type: "hard_inquiries",
      detail: "3 hard inquiries in 5 days",
      estimated_impact: "-18 to -25 points"
    },
    secondary_cause: {
      type: "utilization_spike",
      detail: "HDFC card: 18% → 82%",
      estimated_impact: "-20 to -30 points"
    },
    contributing: {
      type: "minimum_payment",
      detail: "balance not reducing"
    },
    total_estimated_drop: "-38 to -55 points",
    severity: "HIGH",
    recoverable: true,
    estimated_recovery: "3-4 months with action"
  }

  mem0 update:
    → "CIBIL dropped to 694, Oct 2025"
    → "HDFC card utilization spiked to 82%"
    → "3 hard inquiries: Bajaj, KreditBee, Navi"
    → "paying minimum on HDFC card"

  SQLite:
    → credit_snapshots table: new row inserted
    → warnings table: high_utilization, minimum_payment flagged

  active node: "explain_causes"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Got it. Two things hit you at the same time —
that's why it's 54 points.

The bigger one: your HDFC card balance jumped from
roughly ₹36,000 to ₹1,64,000 this month — that's
82% utilization on a ₹2L limit. CIBIL heavily
penalizes anything above 30%. That alone accounts
for around 20-30 points of the drop.

The second: you applied to Bajaj Finance, KreditBee,
and Navi within 5 days in early October. Every
application = hard inquiry = score drops 5-10 points
each. Three in a week compounds badly. Another
18-25 points gone right there.

Were you shopping for a personal loan? And what's
the ₹1.64L spend on the HDFC card?"

PRIYA: "yeah needed money urgently, and the card
spend is diwali shopping + a flight I booked"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: LANGGRAPH
  active node: "recovery_plan"

  decision branches evaluated:
    → primary_cause == hard_inquiries: TRUE
      inject: "stop all applications 90 days"
    → secondary_cause == utilization_spike: TRUE
      inject: "pay down card aggressively"
    → user_has_salary_data: TRUE (₹1,10,000)
      inject: salary-based paydown calculation

  calculation:
    card balance: ₹1,64,000
    to reach 30% utilization: need balance at ₹60,000
    amount to pay: ₹1,04,000
    user salary: ₹1,10,000
    axis EMI: ₹9,200
    feasibility: tight but doable in 1-2 months

  escalation check:
    → no dispute found: skip
    → score not below 600: no urgent intervention
    → redirect needed: NO

  SOP follow-up:
    → schedule_reminder(30 days): "Check if CIBIL recovered"
    → schedule_reminder(90 days): "Loan applications can resume"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Diwali + travel is understandable — but the
combination with loan apps at the same time
created a perfect storm.

Here's how you recover:

1. Stop all loan applications for 90 days.
   Hard inquiries stop impacting after they age.
   I'll remind you in October when it's safe again.

2. Pay down the HDFC card hard this month.
   You need to get from ₹1,64,000 → below ₹60,000
   to get utilization under 30%. That's ₹1,04,000
   to move. With your salary, can you put ₹50k
   toward it this month and ₹55k next month?

3. Pay the FULL statement amount going forward —
   not minimum. Minimum payments keep the balance
   high which keeps utilization high.

4. For the loan you needed — how much and what for?
   There might be a way to get it without another
   hard inquiry tanking you further."

PRIYA: "needed about 80k for some medical stuff"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: LANGGRAPH
  active node: "alternate_solution"
  → SOP branch: "has_existing_card_with_available_limit"
  → HDFC available limit: ₹2L - ₹1.64L = ₹36,000 (not enough)
  → Check: personal loan on existing bank relationship
  → Axis Bank relationship exists (active loan)
  → HDFC bank relationship (credit card)
  → Recommendation: pre-approved loan from existing bank
    (soft inquiry only, no CIBIL hit)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Medical is urgent — here's how to get the
₹80k without another hard inquiry destroying
your score further.

Check your HDFC and Axis banking apps right now
for 'Pre-Approved Loan' or 'Instant Loan' offers.
Banks periodically offer these to existing customers
based on relationship — they use a soft inquiry,
not hard. Your score doesn't get hit.

HDFC especially tends to have these for Regalia
cardholders. It'll show up in the app under
'Loans' or 'Offers'.

If that doesn't work: Axis Bank (your existing
loan) — call them and ask for a top-up loan on
your existing personal loan. Same lender, same
relationship, much lower scrutiny and likely
no new hard inquiry.

Try those two first before any new application.
I've set a reminder for 30 days to check your
CIBIL recovery. By January you should be back
above 730 if you pay down the card aggressively."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP COMPLETION
  criteria met: root_cause + recovery_plan + followup
  memory stored:
    → episode: "score_drop_diagnosed_oct2025"
    → facts: CIBIL causes, recovery plan, 90-day inquiry pause
  scheduler:
    → T+30 days: "Check Priya's CIBIL recovery"
    → T+90 days: "Loan applications safe to resume"
  SOP status: COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## J2: Score Stagnation — Stuck Below 700
### Karan, 27, teacher, Pune. Score hovering 680-695 for 8 months.

**Trigger:** Karan has been trying to improve his score for months. Nothing seems to be working. He's frustrated.

---

```
KARAN: "my cibil has been stuck between 680-695
for like 8 months, i do everything right,
what am i missing"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SCENARIO DETECTION
  result: credit.cibil.score_stagnation (0.91)
  sop: sops/credit/cibil/score_stagnation.json

INTERNAL: CONTEXT ASSEMBLY
  mem0 facts:
    → ICICI Platinum card: limit ₹50,000
    → salary: ₹48,000 (teacher, govt school)
    → no active loans
    → CIBIL history: 681, 688, 692, 685, 690, 694, 688, 695
      (8 months of data — volatile, not trending up)

INTERNAL: SOP required_data check
  → has credit card data: YES
  → has CIBIL history: YES (8 data points)
  → needs: full current report → pull
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "8 months of doing things right and not
moving — that tells me something structural
is holding you back, not behaviour. Let me
pull your full report and find it.

PAN and DOB?"

KARAN: "[provides PAN + DOB]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: CIBIL API PULL

  report analysis:
  {
    score: 695,
    accounts: [
      {
        type: "Credit Card", bank: "ICICI",
        limit: 50000, balance: 16000,
        utilization_pct: 32.0,         ← borderline, not terrible
        payment_status: "Regular",
        payment_history: "all on time for 14 months"
      }
    ],
    enquiries: [],                     ← clean, no recent inquiries
    credit_age_months: 14,             ← 🚨 ONLY 14 MONTHS
    credit_mix_score: "poor",          ← only one card, no loans
    negative_accounts: [],             ← clean
    payment_history_pct: 100.0         ← perfect
  }

INTERNAL: ROOT CAUSE ANALYSIS
  {
    primary_cause: {
      type: "thin_credit_file",
      detail: "only 14 months credit history, single product",
      impact: "score ceiling at ~700 with thin file"
    },
    secondary_cause: {
      type: "no_credit_mix",
      detail: "credit cards only, no installment credit",
      impact: "-15 to -20 points vs mixed profile"
    },
    tertiary_cause: {
      type: "borderline_utilization",
      detail: "32% is just above the 30% threshold",
      impact: "-5 to -10 points"
    },
    insight: "Karan IS doing everything right. The ceiling is
              structural — thin file + single product type.
              No amount of good behaviour fixes this quickly.",
    solution: "credit_builder_loan + utilization_tweak"
  }
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "You're not doing anything wrong — I mean that.
Your payment history is perfect, no bad marks,
no recent inquiries. You've been a model credit
user.

The problem is structural. Two things are
capping your score:

1. Your credit file is only 14 months old.
   CIBIL rewards longevity. A 14-month file has
   a natural ceiling around 700-720 regardless
   of behaviour. You can't fast-forward time —
   but you can make the file thicker faster.

2. You only have one product — one credit card.
   CIBIL scores 'credit mix.' A person with a
   card + an installment loan looks more creditworthy
   than someone with just a card, even if both
   pay perfectly. You're missing a whole scoring
   dimension.

The 32% utilization is also just over the ideal
30% — small fix, but worth doing.

Here's what actually moves your score now:"

KARAN: "okay what do i do"

STEW: "Three moves, in this order:

1. THIS WEEK — Reduce utilization to 25%.
   Your balance is ₹16,000 on ₹50,000 limit.
   Pay it down to ₹12,500. That's ₹3,500 extra
   payment. Gets you under 30% which is the
   threshold. +5-8 points next month.

2. THIS MONTH — Apply for a credit builder loan.
   Banks like Axis, IDFC First, and some NBFCs
   offer small 'credit builder' loans of
   ₹10,000-25,000 specifically for this purpose.
   You deposit the amount, they hold it, you
   'repay' via EMI, report goes to bureau.
   Adds installment credit to your mix.
   +15-25 points over 6 months.

3. MONTH 3 — Request a credit limit increase
   on your ICICI card.
   You've been a customer 14 months, perfect
   payments. Call ICICI and ask for limit increase
   to ₹80,000-1,00,000. More limit = lower
   utilization ratio automatically. Do this via
   relationship manager or app — ask if they
   can do it without a hard inquiry.

Do all three and in 6 months you'll be 730+.
The thin file problem only time fixes — but
these three accelerate everything else."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP COMPLETION
  memory:
    → "Karan's ceiling: thin file + single product"
    → "Credit builder loan recommended Oct 2025"
    → "Limit increase request: Month 3 (Jan 2026)"
  scheduler:
    → T+30: "Did Karan get credit builder loan?"
    → T+90: "Remind Karan to request limit increase"
    → T+180: "Check CIBIL — should be 730+"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## J3: First Time Checking CIBIL Score
### Meena, 24, first job, 8 months employed, Chennai

**Trigger:** Meena heard about CIBIL from a colleague. Never checked her score. Doesn't know what to expect.

---

```
MEENA: "how do I check my cibil score and what
should it be for my age"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SCENARIO DETECTION
  result: credit.cibil.first_check (0.89)
  sop: sops/credit/cibil/first_check.json

INTERNAL: CONTEXT ASSEMBLY
  mem0:
    → first job, 8 months employed
    → salary: ₹38,000
    → no credit products noted yet
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Good instinct checking this early.

Free ways to check right now:
→ CIBIL.com — one free full report per year
→ Bajaj Finserv app / Paytm / BankBazaar
  — free score anytime (soft check, no impact)
→ Your bank's app — most show it in the
  'Offers' or 'My Profile' section

For your age and 8 months of employment —
what credit products do you have? Credit cards,
loans, anything?"

MEENA: "nothing, no cards no loans"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP BRANCH
  → no_credit_products: TRUE
  → redirect: credit.new_to_credit.ntc_education
  → but first: explain what she'll see when she checks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Then when you check, you'll likely see one
of two things:

'NH' or 'NA' — means No History. CIBIL literally
has no data on you. Not a bad score — just no score.
Most 24-year-olds with no credit products see this.

Or a score between 300-550 — means very limited
data, usually from a small loan or something you
may not remember (some education loans show up).

Here's why this matters: when you apply for anything
later — home loan, car loan, even a good credit
card — they check CIBIL. No history = higher
rejection risk or worse rates, because the bank
has no data to trust you with.

The good news: you're 24. Starting now is perfect.
6-12 months of smart credit use and you'll have
a 720+ score, which is better than most people
your age.

Do you want me to walk you through getting your
first credit card? There's a right way to do it
that builds your score fast without risk."

MEENA: "yes please"

[→ SOP hands off to: credit.new_to_credit.ntc_first_card]
[Journey continues as NTC flow]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

# SECTION 2: CREDIT CARD BEHAVIOUR

---

## J4: Bill Upload → High Utilization Found
### Rohit, 31, sales manager, Mumbai. Uploads HDFC bill.

**Trigger:** Rohit uploads his credit card PDF casually. Stew finds a problem he didn't know he had.

---

```
[Rohit uploads: hdfc_november_statement.pdf]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: DOCUMENT PIPELINE
  router: detects credit_card_bill
  PyMuPDF: extracts text
  Groq 70b (structured extraction):
  {
    bank: "HDFC",
    card: "Millennia",
    period: "Oct 5 - Nov 4 2025",
    credit_limit: 80000,
    current_balance: 71200,
    utilization_pct: 89.0,          ← 🚨🚨 CRITICAL
    minimum_due: 2136,
    total_due: 71200,
    due_date: "Nov 22 2025",         ← 6 days from today
    statement_date: "Nov 5 2025",
    transactions: [
      {merchant: "Amazon", amount: 24000, date: "Oct 10"},
      {merchant: "Zomato", amount: 4200, date: "multiple"},
      {merchant: "Myntra", amount: 8900, date: "Oct 18"},
      {merchant: "BookMyShow", amount: 3200, date: "Oct 25"},
      {merchant: "Petrol", amount: 6800, date: "multiple"},
      {merchant: "Swiggy", amount: 3600, date: "multiple"},
      {merchant: "Misc retail", amount: 20500, date: "multiple"}
    ],
    rewards_earned: 712,
    previous_balance: 12000
  }

INTERNAL: PROACTIVE FLAGS TRIGGERED
  🔴 URGENT: due_date in 6 days
  🔴 CRITICAL: utilization 89% → severe CIBIL impact
  🟡 HIGH: Amazon ₹24,000 (single merchant concentration)

INTERNAL: SCENARIO DETECTION
  → upload triggers: credit.credit_card.bill_analysis
  → sub-flag: high_utilization detected within bill
  → SOP loaded: credit/credit_card/high_utilization.json

INTERNAL: CONTEXT ASSEMBLY
  mem0:
    → salary: ₹72,000 (1st of month)
    → Axis Bank personal loan: EMI ₹6,400
    → no previous CC bill data in system
    → CIBIL last known: 724 (6 months ago)
  
  calculation:
    statement_date: Nov 5 (already passed)
    → 89% utilization ALREADY reported to bureau
    → CIBIL impact: estimated -25 to -40 points
    → next statement: Dec 5
    → to fix before Dec 5: balance must be < ₹24,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Got your HDFC bill. A couple of things to
flag immediately.

🔴 Due in 6 days (Nov 22): ₹71,200 total,
minimum ₹2,136. What's your plan?

📊 Bigger issue: your utilization on this card
is 89% — that's in severe CIBIL damage territory.
The statement already closed on Nov 5, which means
this 89% was already reported to the bureau.
Your CIBIL likely took a 25-40 point hit this month
that you haven't seen yet.

Here's what most people don't know: CIBIL captures
your balance on the statement date, not the due
date. They're different dates. The damage is done
for this month — but we can fix next month.

What's your current account balance?"

ROHIT: "about 55k in account"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: CALCULATION ENGINE
  account: ₹55,000
  total_due: ₹71,200
  axis EMI: ₹6,400 (due ~1st)
  salary incoming: ~₹72,000 on 1st (Dec)

  scenario A: pay full ₹71,200
    → remaining: ₹55,000 - ₹71,200 = NEGATIVE (can't do)

  scenario B: pay max possible now + rest from salary
    → pay ₹48,000 now (keeps ₹7,000 buffer)
    → pay remaining ₹23,200 from Dec 1 salary
    → but: interest accrues on ₹23,200 for ~8 days
    → HDFC rate: 3.6%/month = 0.12%/day
    → interest: ₹23,200 × 0.12% × 8 = ₹222
    → acceptable given the situation

  scenario C: pay minimum ₹2,136
    → interest on ₹69,064 for full month
    → interest: ~₹2,486
    → balance grows, utilization stays 89% on Dec report
    → CIBIL takes another hit

  recommendation: Scenario B
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "₹55k in account but ₹71,200 due — you're
short right now, but salary hits Dec 1st.

Here's the smartest play:

Pay ₹48,000 now (before Nov 22 due date).
Keep ₹7,000 as buffer for the next 9 days.
The moment December salary hits on the 1st,
pay the remaining ₹23,200 immediately.

You'll pay about ₹220 in interest on that
₹23,200 for 8 days — it's small, and it's
worth it to avoid the ₹2,486 interest if
you just paid minimum.

For your CIBIL recovery: your next statement
closes December 5. If you pay off the full
balance by then AND keep new spending under
₹24,000 (30% of ₹80k limit) before Dec 5,
your December CIBIL report will show healthy
utilization and you'll recover most of those
lost points.

The Amazon ₹24,000 — was that planned? And
do you use this as your only card or do you
have others?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP COMPLETION
  memory:
    → "HDFC Millennia: ₹80k limit, Nov balance ₹71.2k"
    → "utilization 89% reported to bureau Nov 2025"
    → "next statement: Dec 5 — target <30% utilization"
    → "payment plan: ₹48k now + ₹23.2k on Dec 1"
  scheduler:
    → T+6 days: "Remind Rohit to pay remaining ₹23.2k"
    → T+30 days: "Check Dec CIBIL for recovery"
    → Dec 3: "Reminder: keep spending under ₹24k before statement"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## J5: Minimum Payment Spiral
### Anjali, 28, graphic designer, Hyderabad. 4 months of minimum payments.

**Trigger:** Anjali uploads her SBI card bill. Stew cross-references payment history from previous uploads — 4th consecutive minimum payment.

---

```
[Anjali uploads: sbi_card_nov_bill.pdf]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: BILL PARSED
  {
    bank: "SBI", card: "SimplyCLICK",
    limit: 150000, balance: 98400,
    utilization: 65.6%,
    minimum_due: 2952, total_due: 98400,
    due_date: "Dec 5 2025",
    interest_charged_this_bill: 3284   ← 🚨 interest > minimum
  }

INTERNAL: PAYMENT HISTORY (SQLite)
  Aug 2025: paid ₹2,800 (min was ₹2,750) → minimum
  Sep 2025: paid ₹2,820 (min was ₹2,820) → minimum
  Oct 2025: paid ₹2,900 (min was ₹2,895) → minimum
  Nov 2025: [current bill]
  pattern_detected: MINIMUM_PAYMENT_SPIRAL (4 months)

INTERNAL: CALCULATION ENGINE
  current_balance: ₹98,400
  interest_rate: 3.35%/month (SBI SimplyCLICK)
  monthly_interest: ₹98,400 × 0.0335 = ₹3,297
  minimum_payment: ₹2,952
  
  net_effect: paying ₹2,952, interest adding ₹3,297
  → balance INCREASES by ₹345 every month
  → user is NEVER getting out of this

  payoff_projection:
    at minimum payment: NEVER (balance growing)
    at ₹5,000/month: 31 years, ₹12.8L interest
    at ₹10,000/month: 13 months, ₹29,400 interest
    at ₹20,000/month: 6 months, ₹16,800 interest

INTERNAL: mem0 context
  → salary: ₹58,000 (freelance, variable)
  → no other credit products
  → SBI is only card
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Got your SBI bill. Before I show you the
breakdown, I need to show you something important
first — and I'm going to be direct because
this matters.

This is the 4th month in a row you've paid
only the minimum due.

Here's the brutal math of what that means:

SBI charges 3.35% interest per month on your
balance. Your minimum payment is ₹2,952. But
the interest being added each month is ₹3,297.

You're paying ₹2,952 and they're adding ₹3,297.
Your balance is actually GROWING despite you
making payments every month.

At this rate, you will never pay off ₹98,400.
The math literally doesn't work in your favour."

ANJALI: "oh god i didn't know that. i thought
minimum payment was fine as long as i pay it"

STEW: "Almost everyone thinks that. The banks
don't exactly advertise it.

'Minimum due' just means 'the amount that keeps
us from calling you a defaulter.' It has nothing
to do with actually paying off your debt.

Okay — let's fix this. Your income is variable
as a freelancer. What does a decent month look
like vs a bad month income-wise?"

ANJALI: "good month maybe 70-80k, bad month 40k"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: DEBT PAYOFF CALCULATOR
  debt: ₹98,400 at 3.35%/month

  good month contribution (₹70k income):
    → after living expenses (~₹35k): ₹35k available
    → aggressive: ₹25k toward card
    → payoff in: 5 months, interest: ₹13,200

  bad month contribution (₹40k income):
    → after expenses: ₹15k available
    → minimum viable: ₹8k toward card
    → keeps balance from growing

  hybrid plan (alternating):
    → good months: ₹20,000 payment
    → bad months: ₹6,000 payment
    → payoff in: ~8 months
    → total interest: ~₹18,000

  alternative: balance transfer
    → HDFC/ICICI balance transfer: 0-1.5% for 3-6 months
    → would save significant interest if eligible

INTERNAL: SOP BRANCH
  → check if user eligible for balance transfer
  → no existing cards with other banks: only SBI card
  → balance transfer to new card: needs decent CIBIL
  → CIBIL: unknown (hasn't been pulled in this session)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Okay — given variable income, here's a
plan that actually works:

Good months (₹70k+): pay ₹20,000 toward this card.
Tight months (under ₹50k): pay ₹6,000 minimum.

This gets you debt-free in roughly 8 months
with about ₹18,000 total interest paid.
Still hurts, but it's a number with an end date.

There's also a potentially smarter route:
balance transfer. Some banks offer 0% interest
for 3-6 months on transferred balances if you
open a new card with them. If your CIBIL is
decent, you could move ₹98k there, pay zero
interest for 3-6 months, and attack the principal
directly.

What do you know about your current CIBIL score?
If it's above 700 we can explore this."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP COMPLETION
  memory:
    → "Minimum payment spiral: 4 months on SBI card"
    → "Debt: ₹98,400 at 3.35%/month"
    → "Payoff plan: ₹20k good months, ₹6k tight months"
    → "Balance transfer option pending CIBIL check"
  scheduler:
    → Monthly: "Anjali CC payment reminder — minimum ₹6k"
    → T+30: "Check payment made, balance reducing?"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## J6: Missed Due Date
### Sameer, 26, startup employee, Delhi. Forgot to pay. Realized 3 days late.

**Trigger:** Sameer messages Stew in panic at 11pm.

---

```
SAMEER: "stew i just realized i missed my icici
credit card payment it was due 3 days ago
what do i do"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SCENARIO DETECTION
  result: credit.credit_card.due_date_missed (0.98)
  sop: sops/credit/credit_card/due_date_missed.json

INTERNAL: CONTEXT ASSEMBLY
  mem0:
    → ICICI Amazon Pay card: limit ₹1,00,000
    → salary: ₹65,000 (25th of month)
    → CIBIL last known: 738

  proactive_check:
    → warning "due_date_3_days" was in system
    → was surfaced? NO — Sameer hadn't chatted in a week
    → flag: notification gap (no WhatsApp/email connected)

INTERNAL: SOP PRIORITY
  → time_sensitive: TRUE
  → first action: assess exact damage, then remediate
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Okay, don't panic — 3 days is recoverable
but you need to move tonight, not tomorrow.

Two things happening right now:
1. Late payment fee: ICICI will charge ₹500-1,300
   depending on your balance
2. Interest: started accruing from due date

The thing that matters most for your CIBIL:
banks report to the bureau once a month. If
your statement hasn't been reported yet this
cycle, a 3-day late payment might not show up
at all. If it has, it's a 'DPD-30' mark which
hurts but recovers.

What's the total outstanding amount on the card?"

SAMEER: "about 23,000"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: DAMAGE ASSESSMENT
  balance: ₹23,000
  days_late: 3
  ICICI late fee structure:
    → balance < ₹100: no fee
    → ₹100-10,000: ₹100
    → ₹10,001-25,000: ₹500
    → >₹25,000: ₹750
  applicable fee: ₹500
  
  interest accrued (3 days):
    ICICI rate: 3.75%/month = 0.125%/day
    interest: ₹23,000 × 0.125% × 3 = ₹86
  
  total additional cost: ₹586

  CIBIL impact assessment:
    → 3 days late → DPD-30 if reported
    → banks typically report on fixed date each month
    → if ICICI hasn't reported yet: pay NOW → might not show
    → if already reported: shows as DPD-30 for 12 months
      → single DPD-30 on otherwise clean file: -15 to -30 pts
      → recovers with consistent payments over 12 months

INTERNAL: REMEDIATION SOP
  immediate_action: pay full amount tonight
  next_action: call ICICI to waive late fee
    (ICICI waives for first-time late payment often)
  CIBIL_action: check report in 30 days
    if DPD shows: document timeline, continue clean payments
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Pay the full ₹23,000 right now tonight —
don't wait till morning.

The damage is about ₹586 (₹500 late fee +
~₹86 interest for 3 days). That's the financial
cost and it's small.

The CIBIL question depends on timing. If ICICI
hasn't filed this month's report to the bureau
yet — and you pay tonight — there's a real
chance this 3-day miss doesn't appear at all.
If they've already filed, you'll see a DPD-30
mark which stays for 12 months but isn't
catastrophic on an otherwise clean file.

Pay now, then do this tomorrow morning:
Call ICICI customer care (1800 1080).
Tell them it's your first late payment,
you've been a customer for X years, and ask
them to waive the ₹500 late fee as a goodwill
gesture. They do this for first-time misses
regularly — just ask.

Also — do you have auto-pay set up on this card?"

SAMEER: "no"

STEW: "Set it up tonight while you're paying.
ICICI app → Credit Card → Auto Pay → set to
'Full Outstanding Amount' every month.

You will never have this conversation again
after you do that. 10 minutes of setup now
vs perpetual anxiety every month."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP COMPLETION
  memory:
    → "Missed ICICI payment Nov 2025, 3 days late"
    → "Paid same night after Stew flagged"
    → "Auto-pay enabled"
  scheduler:
    → T+30: "Check CIBIL — did DPD-30 appear?"
    → T+1 day: "Reminder: call ICICI to waive late fee"
  system:
    → flag: notification_gap → prompt user to connect
      WhatsApp or email for due date alerts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

# SECTION 3: LOAN DECISIONS

---

## J7: EMI Stack Danger
### Deepak, 33, sales director, Hyderabad. Wants a new car loan.

**Trigger:** Deepak tells Stew he's planning to take a car loan. Stew has his complete financial picture and sees a problem.

---

```
DEEPAK: "planning to buy a car, looking at a
₹8L loan for 5 years, what do you think"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SCENARIO DETECTION
  result: credit.loans.emi_stack_danger (0.88)
  sop: sops/credit/loans/emi_stack_danger.json

INTERNAL: CONTEXT ASSEMBLY
  mem0 + SQLite:
    salary: ₹1,25,000/month
    existing EMIs:
      → Home loan (SBI): ₹32,000/month (180 months remaining)
      → Personal loan (HDFC): ₹11,200/month (18 months remaining)
      → Phone EMI (Bajaj): ₹2,800/month (4 months remaining)
    total current EMI: ₹46,000/month
    current FOIR: 46,000/1,25,000 = 36.8%

INTERNAL: CALCULATION ENGINE
  car loan: ₹8,00,000 at 9.5% for 60 months
  car EMI: ~₹16,700/month

  new total EMI: ₹46,000 + ₹16,700 = ₹62,700
  new FOIR: 62,700/1,25,000 = 50.2% 🚨

  RBI guideline: lenders uncomfortable above 50% FOIR
  bank_likely_outcome: borderline approval, possible rejection
    or higher interest rate demanded

  remaining after EMIs: ₹62,300
  rent estimate (Hyderabad): ~₹20,000
  remaining for living: ~₹42,300 (tight for family)

  better scenario: wait 4 months for phone EMI to clear
  phone EMI ends in: 4 months
  FOIR after phone clears: (46,000 - 2,800 + 16,700)/1,25,000
    = 47.9% → still high but under 50%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "I want to help you get this right, so
let me show you the full picture first.

You currently have ₹46,000/month in EMIs on
₹1,25,000 salary — that's 36.8% FOIR (Fixed
Obligation to Income Ratio). A ₹8L car loan
at current rates adds ~₹16,700/month.

New total: ₹62,700/month = 50.2% FOIR.

Banks get uncomfortable above 50%. You're
right at the edge — approval isn't guaranteed,
and if approved, the bank might offer you a
higher interest rate because you're at their
risk threshold. A 0.5% higher rate on ₹8L
over 5 years = ₹20,000+ extra interest.

Your phone EMI of ₹2,800 ends in 4 months.
If you wait those 4 months: FOIR drops to
47.9% when you apply for the car loan. Cleaner
application, better rate, more comfortable life.

Is the car genuinely urgent now, or can it
wait a quarter?"

DEEPAK: "I need a car, my current one broke down"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP BRANCH
  → genuine_need: TRUE (not a want)
  → defer not viable
  → optimize within constraint

INTERNAL: LOAN OPTIMIZATION
  option A: ₹8L at 60 months → EMI ₹16,700
  option B: ₹6L at 60 months (smaller car/used) → EMI ₹12,550
    → FOIR: (46,000 + 12,550)/1,25,000 = 46.8% ← acceptable
  option C: ₹8L at 84 months (longer tenure) → EMI ₹12,700
    → FOIR: 47% ← acceptable
    → downside: more total interest paid
  
  best lenders for car loan at 47-50% FOIR:
    → SBI (existing relationship via home loan): priority
    → HDFC Car Loans: competitive rates
    → Avoid: NBFCs (higher rates for borderline FOIR)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Understood — you need a car. Let's make
this work without wrecking your finances.

Two ways to keep your FOIR in the safe zone:

Option 1: Reduce the loan amount.
Consider ₹6L instead of ₹8L — either a
slightly smaller car or a quality used car
(1-2 years old loses 20-25% value, same
reliability). EMI drops to ~₹12,500. FOIR:
46.8%. Banks approve comfortably.

Option 2: Extend to 7 years.
₹8L at 84 months = ~₹12,700/month. Same
FOIR as option 1. You pay more interest
total (~₹67k more than 5 years) but your
monthly pressure is manageable.

Most importantly: apply to SBI first. You
already have a home loan with them — existing
customer relationships get better rates and
more lenient FOIR assessment. Tell them it's
for an existing customer, mention the home
loan.

What's your priority — lowest EMI or lowest
total interest?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP COMPLETION
  memory:
    → "Car loan ₹8L planned Nov 2025"
    → "Recommended: ₹6L or 84-month tenure to stay under 50% FOIR"
    → "Apply SBI first (existing relationship)"
  scheduler:
    → T+7 days: "Did Deepak apply for car loan?"
    → T+30 days: "Check if loan approved, what rate"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## J8: Loan Rejection
### Nisha, 30, HR manager, Chennai. Home loan rejected. No idea why.

---

```
NISHA: "my home loan application got rejected
by HDFC. i have a good job and i've never
defaulted on anything. why would this happen"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SCENARIO DETECTION
  result: credit.loans.loan_rejection (0.96)
  sop: sops/credit/loans/loan_rejection.json

INTERNAL: CONTEXT ASSEMBLY
  mem0:
    → salary: ₹92,000
    → company: mid-size IT firm (3 years employed)
    → CIBIL: not in system (never pulled)
    → SBI credit card: mentioned once, details unknown
  
  missing: CIBIL report (critical for diagnosis)
  SOP action: pull report immediately
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Rejection without explanation is frustrating.
The good news: it's almost always diagnosable.

HDFC won't tell you the exact reason — they
never do. But your CIBIL report will show us
everything they saw. I can pull it now.

PAN and DOB?"

NISHA: "[provides details]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: CIBIL API PULL
  {
    score: 731,
    accounts: [
      {
        type: "Credit Card", bank: "SBI",
        limit: 75000, balance: 52000,
        utilization: 69.3%,            ← 🚨
        status: "Regular"
      }
    ],
    enquiries: [
      {date: "2025-10-28", lender: "HDFC Bank", type: "Hard"},
      {date: "2025-10-29", lender: "ICICI Bank", type: "Hard"},
      {date: "2025-10-30", lender: "Axis Bank", type: "Hard"},
      {date: "2025-11-01", lender: "LIC Housing Finance", type: "Hard"}
    ],                                  ← 🚨 4 inquiries in 4 days
    employment: {
      type: "Salaried",
      company_category: "Private Limited" ← some banks prefer listed
    },
    credit_age_months: 29,
    payment_history_pct: 100.0
  }

INTERNAL: REJECTION ANALYSIS
  reason_1: "4 hard inquiries in 4 days — HDFC's algorithm 
             flags multiple simultaneous applications as 
             desperate/high-risk behaviour"
  reason_2: "69.3% utilization on existing card —
             signals poor credit management to home loan underwriter"
  reason_3: "company category: Pvt Ltd (not listed/MNC) —
             HDFC is stricter on employer category for home loans"
  
  primary_reason: reasons 1 + 2 combined
  CIBIL_score_733: actually fine for home loan (720+ is threshold)
  
  best_path_forward:
    → wait 90 days (inquiries age)
    → reduce CC utilization to <30%
    → apply to SBI or LIC Housing (less strict on employer category)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Got your report. Your CIBIL score is 731 —
that's not the problem. Good score.

Here's what actually caused the rejection:

HDFC saw you applied to them, ICICI, Axis, AND
LIC Housing all within 4 days. Every application
shows up as a hard inquiry on your report —
they can see each other's pulls. To a bank's
algorithm, applying to 4 lenders simultaneously
looks like financial desperation. Even though
you were just comparing options, it reads as
a red flag.

The second issue: your SBI card is at 69%
utilization. For a home loan underwriter, that
signals you're relying heavily on credit —
the opposite of what they want to see in a
home loan applicant.

Your score is fine. Your income is fine.
These two things caused the rejection.

Don't apply to any more lenders right now —
every additional application makes it worse."

NISHA: "oh god I didn't know applying to multiple
banks was a problem. what do I do now"

STEW: "90 days, two actions:

1. Pay down your SBI card from ₹52,000 to
   under ₹22,500 (30% of ₹75k limit).
   With ₹92k salary, ₹30k toward this over
   2 months is very doable.

2. Wait 90 days minimum. The inquiry damage
   fades significantly after 90 days.

Then apply to exactly ONE lender — SBI Home
Loans first. Here's why SBI specifically:
they're more flexible on employer category,
their underwriters do manual review (not just
algorithm), and your 731 score gets you their
better rate bands.

LIC Housing Finance is your second choice —
they're known for being understanding with
salaried applicants even from private companies.

HDFC and ICICI are stricter on all three
factors that flagged you. Avoid them for
now — same criteria will reject you again
until these metrics improve.

I'll remind you in 90 days when you're
ready to apply. By then your report will
look completely different."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP COMPLETION
  memory:
    → "Home loan rejected by HDFC: multi-inquiry + high util"
    → "CIBIL: 731 — score not the issue"
    → "Apply SBI in 90 days after util fix"
  scheduler:
    → T+30: "SBI card utilization check — should be under 30%"
    → T+90: "Home loan application ready — apply SBI"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## J9: Loan Prepayment Decision
### Arjun, 35, IT architect, Pune. Has ₹3L surplus. Should he prepay his personal loan?

---

```
ARJUN: "I have 3 lakhs sitting in savings. my
personal loan has 20 months left. should i
prepay it or invest the money"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SCENARIO DETECTION
  result: credit.loans.prepayment_analysis (0.94)
  sop: sops/credit/loans/prepayment_analysis.json

INTERNAL: CONTEXT ASSEMBLY
  mem0 + SQLite:
    personal loan: ICICI, original ₹5L
    EMI: ₹13,400/month
    remaining: 20 months → ₹2,68,000 outstanding
    interest rate: 14.5% p.a.
    prepayment penalty: 2-5% (ICICI standard for personal loans)

INTERNAL: CALCULATION ENGINE
  outstanding: ₹2,68,000
  remaining interest if paid normally:
    → 20 months × ₹13,400 = ₹2,68,000 total paid
    → outstanding principal: ~₹2,38,000
    → remaining interest to pay: ~₹30,000

  prepayment with ₹3,00,000:
    → outstanding: ₹2,68,000
    → prepayment penalty ~3%: ₹8,040
    → total to close: ₹2,76,040
    → interest saved: ₹30,000
    → penalty paid: ₹8,040
    → net saving: ₹21,960
    → remaining cash after prepayment: ₹23,960

  opportunity cost — ₹3L invested instead:
    → NIFTY 50 index (12% historical avg):
      ₹3,00,000 × 12% × 1.67 years = ₹60,120 gain
    → FD at 7.5%: ₹3,00,000 × 7.5% × 1.67 = ₹37,575 gain
    → vs guaranteed saving of ₹21,960 interest

  verdict:
    → loan rate 14.5% > FD rate 7.5%: prepay beats FD
    → loan rate 14.5% < expected equity returns ~12%?
      No — 14.5% > 12%, so prepayment beats average equity too
    → but: equity is not guaranteed, 14.5% saving IS guaranteed
    → AND: after prepayment, ₹13,400/month freed = 
          ₹13,400 × 20 = ₹2,68,000 investable over 20 months

  CIBIL note:
    → closing loan reduces credit mix
    → only 1 credit product remains (if any)
    → if has credit card: mix still ok
    → if no other products: slight CIBIL dip possible
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Good problem to have. Let me run the
actual numbers rather than give you generic advice.

Your loan: ₹2,68,000 outstanding at 14.5%,
20 months left. Remaining interest if you
pay normally: ~₹30,000.

If you prepay with ₹3L:
→ ICICI charges ~3% penalty: ₹8,040
→ Net saving: ₹21,960 in interest
→ You close the loan and free up ₹13,400/month

Now the comparison:
If you invest ₹3L in FD at 7.5% instead:
you earn ~₹37,000 over 20 months BUT your
loan is costing you 14.5%. You're earning
7.5% and paying 14.5% — you're losing 7%
on the spread. FD loses.

Market investment comparison: equity might
return 12-15% historically, but 14.5% is
guaranteed interest you're paying. A 14.5%
guaranteed return by prepaying beats
uncertain 12% equity — especially over
just 20 months.

The math says: prepay.

One CIBIL note: closing a loan slightly
reduces your credit mix. Do you have a
credit card currently active?"

ARJUN: "yes i have two cards"

STEW: "Then prepay without hesitation.

Two active cards maintain your credit mix
profile. Closing the loan won't hurt your
CIBIL meaningfully, and your payment history
stays on record for 7 years anyway.

The move: pay off the loan this month.
You'll have ₹23,960 left from the ₹3L,
plus ₹13,400/month freed up from next month.

Put that ₹13,400 directly into a NIFTY 50
index fund SIP from next month. Now you're
investing at market returns debt-free, which
is cleaner than investing while carrying
14.5% debt.

One thing to confirm: call ICICI before
paying and ask them the exact prepayment
penalty percentage and if it reduces
based on months remaining. Sometimes they
waive it for customers who ask — worth
a 10-minute call."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP COMPLETION
  memory:
    → "Prepayment analysis done: ICICI personal loan"
    → "Decision: prepay — 14.5% beats all alternatives"
    → "Post-prepayment: ₹13,400/month for SIP"
  scheduler:
    → T+7: "Did Arjun prepay? Confirm closed"
    → T+30: "Start SIP reminder"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

# SECTION 4: CREDIT REPORT ERRORS & DISPUTES

---

## J10: Wrong Account on Report
### Ravi, 38, government employee, Lucknow. Finds a loan he never took.

---

```
RAVI: "I checked my cibil report and there is
a personal loan from some fintech called
RupeeLend showing outstanding ₹45,000.
I never took this loan. What is happening"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SCENARIO DETECTION
  result: credit.dispute.fraudulent_account (0.99)
  sop: sops/credit/dispute/fraudulent_account.json
  priority: URGENT (potential identity fraud)

INTERNAL: CONTEXT ASSEMBLY
  mem0:
    → govt employee, Lucknow
    → CIBIL: unknown currently
    → no credit products previously mentioned

INTERNAL: SOP PRIORITY FLAG
  → potential identity theft: TRUE
  → escalation path: immediate
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "This is serious and I need you to take
a few steps today, not tomorrow.

An account you didn't open is one of two things:
1. A bureau error (lender reported to wrong PAN)
2. Identity fraud (someone used your documents
   to take a loan)

Either way, it needs immediate action because
every day it sits on your report, it's hurting
your score and — in fraud cases — the fraudster
might take more loans in your name.

Pull your complete CIBIL report right now if
you have it — I need to see: the loan
disbursement date, the address on file for
that loan, and which bureau reported it.
Can you share those details?"

RAVI: "loan disbursement: March 2024, address
showing is Mumbai, I live in Lucknow. Bureau
showing is CIBIL and Experian both."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: FRAUD ASSESSMENT
  mismatch signals:
    → address: Mumbai vs Ravi's location Lucknow ← fraud signal
    → on TWO bureaus: CIBIL + Experian ← lender reported to both
      (errors usually appear on one, fraud often on multiple)
    → March 2024: 19 months ago, has been on report a while

  assessment: HIGH PROBABILITY of identity fraud
  
  SOP branches:
    → immediate: freeze/lock credit reports
    → RupeeLend: contact directly as fraudulent account
    → CIBIL dispute: raise
    → Experian dispute: raise separately
    → Cybercrime: police complaint needed
    → RBI Banking Ombudsman: if no response in 30 days
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "The Mumbai address is the key detail —
that strongly suggests identity fraud, not
a bureau error. Someone used your PAN and
documents to take a loan in Mumbai while
you're in Lucknow.

The fact that it's on both CIBIL and Experian
confirms the lender actually reported it,
not a clerical mistake.

Here's your action plan — do steps 1-3 today:

TODAY:
1. File a cybercrime complaint at
   cybercrime.gov.in (online, takes 20 minutes).
   Get the complaint number — you'll need it
   for everything else.

2. Email RupeeLend (find their grievance email
   on their website). Subject: 'Fraudulent Loan
   In My Name — Identity Theft — PAN [XXXXX]'.
   Attach: your Aadhaar/PAN copy, cybercrime
   complaint number. Demand account closure
   and bureau deletion within 30 days.

3. Raise dispute on CIBIL.com — login, go to
   Dispute Resolution, select this loan account,
   reason: 'Account not mine / fraud'. Submit
   the cybercrime complaint number as evidence.

THIS WEEK:
4. Raise same dispute on Experian.in separately.

5. Check your other financial accounts — bank
   accounts, other bureau reports (Equifax,
   CRIF) — someone with your documents may
   have tried elsewhere too.

If RupeeLend doesn't respond in 30 days:
File with RBI Banking Ombudsman. They are
required to respond to the ombudsman within
30 days or face regulatory action. This
escalation works extremely fast.

Do you have your Aadhaar linked to any apps
or services you don't recognize? That might
be how the documents were compromised."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP COMPLETION
  memory:
    → "URGENT: fraudulent loan on Ravi's report — RupeeLend"
    → "Cybercrime complaint filed [date]"
    → "Disputes raised: CIBIL + Experian"
  scheduler:
    → T+1: "Ravi: check RupeeLend grievance email response"
    → T+7: "Follow up on CIBIL dispute status"
    → T+30: "If unresolved: escalate to RBI Ombudsman"
    → T+45: "Full resolution check — all accounts"
  system:
    → flag: identity_fraud_active
    → restrict: no new credit applications recommended
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## J11: Settled Loan Still Showing Outstanding
### Preeti, 32, nurse, Jaipur. Settled a loan 2 years ago. Still appearing.

---

```
PREETI: "I settled a loan with Fullerton Finance
2 years back, paid everything they asked,
but it still shows as outstanding on cibil.
My home loan is getting rejected because
of this"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SCENARIO DETECTION
  result: credit.dispute.settled_showing_outstanding (0.97)
  sop: sops/credit/dispute/settled_outstanding.json

INTERNAL: CRITICAL DISTINCTION CHECK
  "settled" has two meanings:
  A. Full closure: paid 100% → should show "Closed"
  B. Settlement: paid less than full amount → shows "Settled"
     → "Settled" on CIBIL = negative mark, stays 7 years
     → banks treat "Settled" like a default for home loans

  need to determine: which type?

INTERNAL: SOP action
  → clarify settlement type before advising
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "Before I walk you through the dispute
process, I need to ask one important question —
the answer completely changes what happened.

When you 'settled' with Fullerton — did you
pay the full remaining loan amount they asked
for? Or did they give you a reduced amount
to pay (like they agreed to accept ₹40,000
instead of ₹60,000 to close it)?

This distinction is critical."

PREETI: "they said pay 35000 and we'll close it,
original outstanding was 52000"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: CLASSIFICATION
  → type: SETTLEMENT (paid less than full) — not full closure
  → CIBIL status: "Settled" — this is technically CORRECT
  → "Settled" ≠ "Outstanding" — different problem
  → two possible issues:
    A. Report shows "Outstanding" (wrong — should show "Settled")
    B. Report shows "Settled" (correct, but user didn't know
       the implication)

  need: see exact CIBIL report status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "I need to be honest with you about
something important, and I'm sorry this
isn't better news.

What you did is called a 'loan settlement' —
paying less than the full amount in exchange
for closure. On your CIBIL report, this shows
as 'Settled' — not 'Outstanding', and not
'Closed'. There's a difference.

'Closed' = you paid every rupee. Clean exit.
'Settled' = you paid a negotiated lower amount.
          CIBIL and banks treat this like a
          partial default. It stays for 7 years.

What's your CIBIL report actually showing for
this loan — the exact status word?"

PREETI: "it says 'written off' not settled"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: STATUS REASSESSMENT
  "Written Off" = lender internally wrote off the debt
    → should have been updated AFTER settlement
    → either: Fullerton didn't update bureau post-settlement
    → or: they wrote it off before you paid, and didn't update
  
  THIS IS DISPUTABLE — Fullerton accepted payment,
  they must update the bureau to reflect settlement/closure
  
  legal position: Payment receipt + NOC from Fullerton = proof
  Fullerton is obligated to update bureau status
  
  dispute path:
    → get NOC from Fullerton (critical)
    → dispute with CIBIL: "Written Off" should be "Settled"
      (or "Closed" if they agree to update fully)
    → even "Settled" is better than "Written Off" for home loans
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEW: "'Written Off' when you've already paid
them is wrong — and that's something you can
and should fight.

Fullerton accepted your ₹35,000. They are
obligated to update your bureau status from
'Written Off' to at least 'Settled'. They
clearly didn't.

Do you have: your payment receipt for ₹35,000
AND a closure letter or NOC from Fullerton?"

PREETI: "I have the payment receipt but no NOC,
I didn't know to ask for it"

STEW: "The payment receipt is enough to start.
Here's the two-track approach:

TRACK 1 — Get your NOC:
Email Fullerton Finance grievance cell:
grievance@fullertonindia.com
Subject: 'Request for NOC and CIBIL Update —
Loan Account [your account number] — Settled
[date] — Payment Proof Attached'
Attach your payment receipt. Demand NOC within
15 business days and bureau status correction.

TRACK 2 — CIBIL dispute simultaneously:
Login to cibil.com → Dispute → select the
Fullerton account → reason: 'Account status
incorrect — loan settled on [date], showing
as Written Off'. Upload payment receipt.

Important expectations to set:
Even when corrected to 'Settled', banks
treat settlement carefully for home loans.
But 'Written Off' is far worse. Getting to
'Settled' status with your payment receipt
documented puts you in a much better position.

Some banks — SBI, LIC Housing Finance —
will consider home loan applications with
old settlement marks if 2+ years have passed
and all subsequent credit is clean. Your
mark is 2 years old. Once status is corrected,
apply to these two specifically and be upfront
with the bank manager about the history."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNAL: SOP COMPLETION
  memory:
    → "Fullerton loan: Written Off status, should be Settled"
    → "Payment proof exists, NOC not obtained"
    → "Dispute raised CIBIL + Fullerton NOC requested"
    → "Home loan: SBI/LIC after status corrected"
  scheduler:
    → T+15: "NOC follow-up with Fullerton"
    → T+30: "CIBIL dispute status check"
    → T+45: "Home loan application readiness check"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Cross-Journey Patterns: What Stew Always Does

```
1. NEVER gives generic advice when specific data exists.
   If the user has uploaded a bill, Stew uses the exact
   numbers. If CIBIL is pulled, Stew references actual
   accounts and percentages.

2. ALWAYS checks for cascading issues.
   Score drop conversation might uncover a dispute.
   Loan application might reveal EMI stacking.
   Stew uses the SOP stack to handle nested scenarios
   without losing context.

3. PROACTIVE flags run on EVERY message.
   Even in a dispute conversation, if a CC bill is
   due in 3 days, Stew mentions it.

4. SCHEDULER on every SOP completion.
   Every journey ends with concrete follow-up points
   loaded into the reminder system.

5. MEMORY extraction at every turn.
   Every new fact (salary, card details, EMI amounts,
   CIBIL discoveries) is extracted and stored.
   The next conversation starts smarter.
```

---

*Stew Credit Journeys v2.0 — 11 scenarios. Full data flows. Real Indian credit problems, solved. 🍲*
