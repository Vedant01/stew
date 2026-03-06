// =============================================
// STEW — All fake data for the demo
// =============================================

import React from 'react';
import {
  Pizza01Icon, Coffee02Icon, Hamburger01Icon,
  Car02Icon, Train01Icon, Motorbike01Icon,
  ShoppingBag01Icon, TShirtIcon, PackageIcon,
  BankIcon, CreditCardIcon, Chart01Icon, Coins01Icon,
  BeachIcon, Airplane01Icon, Shield01Icon, LaptopIcon, BicycleIcon, Diamond01Icon,
  ChartAverageIcon, Briefcase02Icon, UserGroupIcon, BitcoinIcon, StarIcon, Home01Icon, GiftIcon
} from 'hugeicons-react';

// ---- TRANSACTIONS ----
export interface Transaction {
  id: string;
  merchant: string;
  icon: React.ReactNode;
  amount: number;
  date: string;
  category: string;
  upiId: string;
}

export const transactions: Transaction[] = [
  { id: 't1', merchant: 'Swiggy', icon: <Pizza01Icon size={20} />, amount: 547, date: '2026-03-05', category: 'Food & Drinks', upiId: 'swiggy@axisbank' },
  { id: 't2', merchant: 'Zomato', icon: <Hamburger01Icon size={20} />, amount: 389, date: '2026-03-04', category: 'Food & Drinks', upiId: 'zomato@hdfcbank' },
  { id: 't3', merchant: 'Uber India', icon: <Car02Icon size={20} />, amount: 234, date: '2026-03-04', category: 'Transport', upiId: 'uber@icici' },
  { id: 't4', merchant: 'Myntra', icon: <TShirtIcon size={20} />, amount: 2199, date: '2026-03-03', category: 'Shopping', upiId: 'myntra@yesbank' },
  { id: 't5', merchant: 'HDFC EMI', icon: <BankIcon size={20} />, amount: 8500, date: '2026-03-01', category: 'EMIs', upiId: 'hdfc@nsdl' },
  { id: 't6', merchant: 'Blinkit', icon: <ShoppingBag01Icon size={20} />, amount: 312, date: '2026-03-02', category: 'Food & Drinks', upiId: 'blinkit@paytm' },
  { id: 't7', merchant: 'Ola Cabs', icon: <Car02Icon size={20} />, amount: 178, date: '2026-03-01', category: 'Transport', upiId: 'olacabs@sbi' },
  { id: 't8', merchant: 'Amazon India', icon: <PackageIcon size={20} />, amount: 3499, date: '2026-02-28', category: 'Shopping', upiId: 'amazon@apl' },
  { id: 't9', merchant: 'ICICI Credit Card', icon: <CreditCardIcon size={20} />, amount: 12000, date: '2026-03-01', category: 'EMIs', upiId: 'icici-cc@icici' },
  { id: 't10', merchant: 'Groww SIP', icon: <Chart01Icon size={20} />, amount: 5000, date: '2026-03-01', category: 'Savings', upiId: 'groww@axisbank' },
  { id: 't11', merchant: 'Chai Point', icon: <Coffee02Icon size={20} />, amount: 120, date: '2026-03-05', category: 'Food & Drinks', upiId: 'chaipoint@upi' },
  { id: 't12', merchant: 'Rapido Bike', icon: <Motorbike01Icon size={20} />, amount: 89, date: '2026-03-03', category: 'Transport', upiId: 'rapido@yesbank' },
  { id: 't13', merchant: 'Flipkart', icon: <ShoppingBag01Icon size={20} />, amount: 1799, date: '2026-02-27', category: 'Shopping', upiId: 'flipkart@axisbank' },
  { id: 't14', merchant: 'Bajaj Finance EMI', icon: <CreditCardIcon size={20} />, amount: 4200, date: '2026-03-01', category: 'EMIs', upiId: 'bajaj@rbl' },
  { id: 't15', merchant: 'Zerodha Coin', icon: <Coins01Icon size={20} />, amount: 3000, date: '2026-03-01', category: 'Savings', upiId: 'zerodha@hdfcbank' },
  { id: 't16', merchant: 'Swiggy Instamart', icon: <ShoppingBag01Icon size={20} />, amount: 645, date: '2026-03-04', category: 'Food & Drinks', upiId: 'swiggy@axisbank' },
  { id: 't17', merchant: 'Nykaa', icon: <ShoppingBag01Icon size={20} />, amount: 899, date: '2026-02-26', category: 'Shopping', upiId: 'nykaa@icici' },
  { id: 't18', merchant: 'Metro Card Recharge', icon: <Train01Icon size={20} />, amount: 500, date: '2026-02-25', category: 'Transport', upiId: 'delhimetro@sbi' },
  { id: 't19', merchant: 'PPF Deposit', icon: <BankIcon size={20} />, amount: 2000, date: '2026-03-01', category: 'Savings', upiId: 'ppf@sbi' },
  { id: 't20', merchant: 'Starbucks India', icon: <Coffee02Icon size={20} />, amount: 450, date: '2026-03-05', category: 'Food & Drinks', upiId: 'starbucks@hdfcbank' },
];

export const categories = ['All', 'Food & Drinks', 'Transport', 'Shopping', 'EMIs', 'Savings'] as const;

export const spendByCategory = [
  { name: 'Food & Drinks', amount: 2463, color: '#f59e0b', percent: 18 },
  { name: 'Transport', amount: 1001, color: '#06b6d4', percent: 7 },
  { name: 'Shopping', amount: 8396, color: '#a855f7', percent: 25 },
  { name: 'EMIs', amount: 24700, color: '#ef4444', percent: 37 },
  { name: 'Savings', amount: 10000, color: '#10b981', percent: 13 },
];

// ---- GOALS ----
export interface Goal {
  id: string;
  name: string;
  icon: React.ReactNode;
  target: number;
  saved: number;
  weeklyAmount: number;
  deadline: string;
}

export const defaultGoals: Goal[] = [
  { id: 'g1', name: 'Goa Trip', icon: <BeachIcon size={24} />, target: 25000, saved: 12500, weeklyAmount: 1500, deadline: '2026-06-15' },
  { id: 'g2', name: 'Emergency Fund', icon: <Shield01Icon size={24} />, target: 100000, saved: 45000, weeklyAmount: 3000, deadline: '2026-12-31' },
];

export const goalPresets = [
  { name: 'Goa Trip', icon: <BeachIcon size={20} />, target: 25000 },
  { name: 'MacBook Air', icon: <LaptopIcon size={20} />, target: 120000 },
  { name: 'Emergency Fund', icon: <Shield01Icon size={20} />, target: 100000 },
  { name: 'Bike Down Payment', icon: <BicycleIcon size={20} />, target: 30000 },
  { name: 'Wedding Fund', icon: <Diamond01Icon size={20} />, target: 500000 },
  { name: 'Japan Trip', icon: <Airplane01Icon size={20} />, target: 200000 },
];

// ---- MARKETPLACE PLUGINS ----
export interface Plugin {
  id: string;
  name: string;
  creator: string;
  description: string;
  installs: string;
  rating: number;
  icon: React.ReactNode;
  category: string;
  longDescription: string;
  reviews: { user: string; text: string; rating: number }[];
}

export const plugins: Plugin[] = [
  {
    id: 'p1',
    name: 'Tax Season Mode',
    creator: 'ClearTax',
    description: 'Auto-tag deductible expenses. 80C, 80D sorted before March.',
    installs: '12.4k',
    rating: 4.8,
    icon: <ChartAverageIcon size={28} />,
    category: 'Tax',
    longDescription: 'ClearTax\'s Tax Season Mode automatically identifies and categorizes your tax-deductible expenses. It tracks your 80C investments (PPF, ELSS, LIC), 80D health insurance, HRA receipts, and more. Get nudges when you\'re short of the ₹1.5L limit. Works with your CA seamlessly.',
    reviews: [
      { user: 'Priya M.', text: 'Saved me 3 hours during tax filing. Auto-tagged everything!', rating: 5 },
      { user: 'Rahul K.', text: 'Great plugin, wish it had more granular categories', rating: 4 },
    ]
  },
  {
    id: 'p2',
    name: 'DeFi Degen Persona',
    creator: 'CoinDCX',
    description: 'Stew speaks crypto. Track DeFi yields alongside your UPI spend.',
    installs: '8.7k',
    rating: 4.5,
    icon: <BitcoinIcon size={28} />,
    category: 'Crypto',
    longDescription: 'Switch to DeFi Degen mode and Stew becomes your crypto co-pilot. Track your DeFi yields, token swaps, and portfolio performance right alongside your regular UPI expenses. APY alerts, impermanent loss warnings, and degen-friendly banter included.',
    reviews: [
      { user: 'Arjun V.', text: 'Finally, crypto and fiat in one view! 🚀', rating: 5 },
      { user: 'Sneha T.', text: 'The yield tracking is so clean. Better than most DeFi dashboards.', rating: 5 },
    ]
  },
  {
    id: 'p3',
    name: 'Salary Negotiation Coach',
    creator: 'Stew Labs',
    description: 'Data-backed scripts & timing strategies for your next appraisal.',
    installs: '15.2k',
    rating: 4.9,
    icon: <Briefcase02Icon size={28} />,
    category: 'Career',
    longDescription: 'Nervous about asking for a raise? This persona gives you scripts, market salary data (sourced from Glassdoor and AmbitionBox), and timing strategies. It analyzes your current comp, suggests anchoring numbers, and even role-plays the conversation with you.',
    reviews: [
      { user: 'Karan S.', text: 'Used the scripts and got a 35% hike! Not kidding.', rating: 5 },
      { user: 'Meera J.', text: 'The role-play feature is brilliant. Felt so prepared.', rating: 5 },
    ]
  },
  {
    id: 'p4',
    name: 'Couple Finance Mode',
    creator: 'Stew Community',
    description: 'Split, share, and plan finances with your partner. No fights.',
    installs: '6.1k',
    rating: 4.6,
    icon: <UserGroupIcon size={28} />,
    category: 'Lifestyle',
    longDescription: 'Link two Stew accounts and manage shared expenses transparently. Auto-split restaurant bills, track rent contributions, plan vacations together, and set joint savings goals. Stew mediates so you don\'t have to.',
    reviews: [
      { user: 'Ravi & Anita', text: 'Honestly saved our relationship lol. The split tracking is chef\'s kiss.', rating: 5 },
      { user: 'Deepak P.', text: 'Joint goals feature needs work but great concept', rating: 4 },
    ]
  },
  {
    id: 'p5',
    name: 'OpenClaw Rewards',
    creator: 'OpenClaw DAO',
    description: 'Earn CLAW tokens for healthy financial habits. Web3 meets fi-co.',
    installs: '4.3k',
    rating: 4.3,
    icon: <StarIcon size={28} />,
    category: 'Web3',
    longDescription: 'Powered by the OpenClaw protocol, earn CLAW tokens every time you stick to your budget, hit a savings milestone, or complete a financial quest. Redeem on-chain or swap for UPI credits. Community-governed via DAO voting.',
    reviews: [
      { user: 'Vikram N.', text: 'Gamification done right. Actually motivated me to save.', rating: 5 },
      { user: 'Pooja R.', text: 'Token rewards are small but the habit building is 💯', rating: 4 },
    ]
  },
  {
    id: 'p6',
    name: 'Rent & Roommate',
    creator: 'FlatBills',
    description: 'Split rent, electricity, WiFi with roommates. Auto-remind.',
    installs: '9.8k',
    rating: 4.7,
    icon: <Home01Icon size={28} />,
    category: 'Lifestyle',
    longDescription: 'Living with roommates in Bangalore or Mumbai? This plugin auto-imports your electricity, WiFi, water, and rent bills, splits them fairly, and sends polite UPI collect requests to your roommates. Track who owes what, see history, and never be the awkward bill reminder person again.',
    reviews: [
      { user: 'Amit G.', text: 'My roommates actually pay on time now. Magic.', rating: 5 },
      { user: 'Shreya L.', text: 'The auto-split for electricity based on AC usage is genius', rating: 5 },
    ]
  },
  {
    id: 'p7',
    name: 'IPO & NFO Tracker',
    creator: 'Groww',
    description: 'Never miss an IPO allotment or NFO window. Real-time alerts.',
    installs: '11.1k',
    rating: 4.4,
    icon: <Chart01Icon size={28} />,
    category: 'Investment',
    longDescription: 'Track upcoming IPOs, check GMP (Grey Market Premium), set reminders for application windows, and get real-time allotment status. Also covers NFOs from top AMCs. Stew tells you which ones are worth applying for based on your risk profile.',
    reviews: [
      { user: 'Nikhil B.', text: 'Got into 3 IPOs I would have missed. The GMP alerts are clutch.', rating: 5 },
      { user: 'Kavita A.', text: 'Wish it covered SME IPOs too', rating: 4 },
    ]
  },
  {
    id: 'p8',
    name: 'Festival Budget Planner',
    creator: 'Stew Labs',
    description: 'Diwali, Eid, Christmas — plan gifting & expenses before the FOMO hits.',
    installs: '7.5k',
    rating: 4.6,
    icon: <GiftIcon size={28} />,
    category: 'Lifestyle',
    longDescription: 'Every festival seasons brings surprise expenses. This persona activates 30 days before major Indian festivals and helps you plan your gifting budget, new clothes, travel, and pooja expenses. Never go broke after Diwali again.',
    reviews: [
      { user: 'Anjali D.', text: 'Last Diwali was the first time I wasn\'t broke by Nov 1st!', rating: 5 },
      { user: 'Farhan M.', text: 'Eid planning feature works great. Planning for family visits is so smooth.', rating: 5 },
    ]
  },
];

// ---- CHAT RESPONSES ----
export interface ChatResponse {
  keywords: string[];
  fresher: string;
  investor: string;
}

export const chatResponses: ChatResponse[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'sup'],
    fresher: "Hey there! 👋 Welcome to Stew. I'm like that wise older sibling who's actually good with money. What's on your mind?",
    investor: "Hey! 📊 Stew here — your financial co-pilot. Markets are interesting today. What are we analyzing?",
  },
  {
    keywords: ['salary', 'paycheck', 'salary day', 'payday'],
    fresher: "Salary day! 🎉 I know it feels like you're rich right now, but let's make sure you still feel that way on the 25th. Want me to help you split it into Needs / Wants / Savings? Trust me, future you will send a thank you card.",
    investor: "Salary credited. 💰 Let's allocate efficiently. Based on your patterns, I'd suggest: 50% essentials, 20% investments (your SIPs are due), 20% discretionary, 10% emergency buffer. Want me to adjust the ratios?",
  },
  {
    keywords: ['swiggy', 'zomato', 'food', 'ordering', 'delivery'],
    fresher: "I see you, Swiggy warrior! 🍕 You've spent ₹2,463 on food delivery this month. That's like... 8 movie tickets or half a flight to Goa. Not judging — but what if we set a ₹500/week food delivery budget?",
    investor: "Food delivery spend: ₹2,463 this month, up 12% from last month. 📊 At this run rate, you're looking at ₹29.5K annually. That's roughly one extra SIP of ₹2,500/month you could be running. Worth optimizing.",
  },
  {
    keywords: ['save', 'saving', 'savings', 'how to save'],
    fresher: "Saving money doesn't mean living like a monk! 🧘 Start with the 50-30-20 rule: 50% needs, 30% wants, 20% savings. Even ₹500/week adds up to ₹26,000 a year. That's a Goa trip fund, my friend! 🏖️",
    investor: "Let's optimize your savings architecture. You're currently saving 13% of income. Standard recommendation is 20%+. I'd suggest: max out PPF (tax-free compounding), increase SIP by ₹2,000 (into index funds), and park emergency fund in liquid funds for better returns than savings account.",
  },
  {
    keywords: ['invest', 'investment', 'sip', 'mutual fund', 'stocks'],
    fresher: "Investing sounds scary, but it's really just telling your money to go make more money while you sleep! 😴 Start with SIPs — systematic investment plans. Even ₹500/month in an index fund. It's like a subscription to your future self's wealth.",
    investor: "Current portfolio allocation: 60% equity (SIPs), 25% debt, 15% crypto. Market's showing strength in mid-caps. Consider: increase small-cap exposure by 5%, rebalance debt to target duration funds given rate cut expectations. Your SIP step-up is due next month — recommend 10% increase.",
  },
  {
    keywords: ['emi', 'loan', 'debt', 'credit'],
    fresher: "EMIs taking a big bite? 🦷 Your total EMI load is ₹24,700/month — that's about 37% of your salary. Ideally, keep it under 30%. Don't panic though — let's look at which ones we can prepay or restructure first.",
    investor: "EMI-to-income ratio: 37%. Slightly above the 30% threshold. The HDFC loan at 9.5% APR is your most expensive debt. Consider: partial prepayment of ₹50K reduces tenure by 8 months and saves ₹18K in interest. Shall I model the prepayment scenarios?",
  },
  {
    keywords: ['budget', 'spending', 'expenses', 'money gone', 'where did my money go'],
    fresher: "Ah, the classic 'where did my money go?' 😅 This month so far: ₹2.5K on food, ₹1K transport, ₹8.4K shopping, ₹24.7K EMIs. The shopping one hurts the most, doesn't it? Let's set some gentle guardrails together.",
    investor: "Monthly burn rate: ₹36,560 against ₹67,000 income. Efficiency ratio: 54.6%. Top optimization targets: Shopping (₹8.4K, discretionary), Food delivery (₹2.5K, can reduce 30% with meal prep). Projecting ₹8K surplus. Redirect to SIP step-up?",
  },
  {
    keywords: ['crypto', 'bitcoin', 'defi', 'web3'],
    fresher: "Crypto is exciting but risky, like riding a bike in Bangalore traffic! 🏍️ Never invest more than 5-10% of your portfolio. Start with SIPs in Bitcoin/ETH on WazirX or CoinDCX. And please, no meme coins with your rent money!",
    investor: "Crypto allocation: 15% of portfolio. With BTC dominance rising, consider rebalancing altcoin exposure. DeFi yields on stablecoin pools (Aave/Compound) running 5-8% APY — competitive with Indian FD rates post-tax. Check out Stew's Stablecoin Vault for USDC savings.",
  },
  {
    keywords: ['rent', 'house', 'flat', 'roommate'],
    fresher: "Rent is usually the biggest bite — aim for under 30% of your in-hand salary. If you're in Mumbai/Bangalore, I know that's hard 😭 Consider sharing with roommates. Pro tip: use the Rent & Roommate plugin to split bills without awkwardness!",
    investor: "Housing cost ratio: if rent exceeds 25% of gross, it's suboptimal. Consider: building a 12-month rent reserve, or evaluate EMI-to-rent spread for home purchase. In current market, renting + investing spread may yield 2-3% more than buying in Tier-1 metro cities.",
  },
  {
    keywords: ['goal', 'target', 'plan', 'future'],
    fresher: "Goals are awesome! 🎯 Whether it's a Goa trip or building an emergency fund, the key is to break it into weekly chunks. ₹25,000 for Goa? That's just ₹1,500/week for 4 months. Totally doable! Check out the Goals tab to track yours.",
    investor: "Goal-based planning: map each goal to a time horizon. < 1 year: liquid funds/FDs. 1-3 years: short-duration debt + conservative hybrid. 3-5 years: balanced advantage or flexi-cap. 5+ years: pure equity (index preferred). Want me to optimize your current goal allocations?",
  },
];

// ---- SALARY DAY ALLOCATION ----
export const salaryAllocation = {
  salary: 67000,
  default: [
    { category: 'Needs', percent: 50, amount: 33500, items: ['Rent', 'Groceries', 'Bills', 'EMIs'] },
    { category: 'Wants', percent: 20, amount: 13400, items: ['Food Delivery', 'Shopping', 'Entertainment'] },
    { category: 'Savings', percent: 20, amount: 13400, items: ['Emergency Fund', 'PPF', 'Liquid Fund'] },
    { category: 'Investments', percent: 10, amount: 6700, items: ['SIPs', 'Stocks', 'Crypto'] },
  ]
};

// ---- STEW INSIGHTS (for transaction detail) ----
export const transactionInsights: Record<string, string> = {
  'Swiggy': "You've ordered Swiggy 8 times this month 👀 That's ₹1,192 on deliveries alone. What if we did 4 home-cooked meals instead? Save ₹500 easy.",
  'Zomato': "Zomato Gold subscription + orders = ₹1,200/month pattern. The subscription saves you ₹200 but makes you order 3x more. Classic. 😏",
  'Uber India': "Your average Uber ride costs ₹234. That's 2.5x what a metro ride would cost on the same route. Metro challenge: 3 rides this week? 🚇",
  'Myntra': "₹2,199 on Myntra — the sale got you, didn't it? 😄 Pro tip: add items to cart, wait 48 hours. If you still want it, it's not impulse.",
  'HDFC EMI': "This EMI takes 12.7% of your salary. It's your biggest fixed outflow. 3 EMIs remaining — freedom in sight! 🏁",
  'Blinkit': "Blinkit for ₹312 — was it actually urgent? Quick commerce premium is real: same items on BigBasket would be ₹240. Just saying. 🤷",
  'Ola Cabs': "₹178 Ola ride. You took 4 rides this week. Would a monthly metro pass (₹500) cover some of these routes? Quick math: saves ₹2K/month. 📊",
  'Amazon India': "₹3,499 Amazon order. You've spent ₹8.4K on shopping this month. That's 12.5% of salary on non-essentials. Let's chat about a shopping budget? 🛍️",
  'ICICI Credit Card': "Credit card EMI ₹12,000. This is your biggest liability. At 18% APR, you're paying ₹2,160/year in interest alone. Prioritize paying this down! 🎯",
  'Groww SIP': "Nice! ₹5,000 SIP running like clockwork. At 12% CAGR, this becomes ₹9.8L in 10 years. Consistency is your superpower. 💪",
  'Starbucks India': "₹450 for coffee. You average 3 Starbucks visits/month = ₹1,350/month = ₹16,200/year. That's literally an extra SIP. ☕→📈",
  'default': "This transaction looks routine. Keep tracking and I'll flag anything unusual! 🔍",
};
