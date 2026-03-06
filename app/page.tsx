'use client';

import { useState } from 'react';
import Link from 'next/link';
import StewLogo from '@/components/StewLogo';
import {
  SmartPhone01Icon, GiftIcon, Brain01Icon, Store01Icon,
  Shield01Icon, Coins01Icon, ChartAverageIcon, BitcoinIcon,
  Briefcase02Icon, UserGroupIcon, Pizza01Icon, BankIcon,
  Alert01Icon, RefreshIcon
} from 'hugeicons-react';
import s from './page.module.css';

const bentoCards = [
  { icon: <SmartPhone01Icon size={28} />, title: 'UPI Intelligence', desc: 'Reads your Swiggy, Amazon, Uber — categorizes everything. Knows you ordered biryani at 2am. No judgment. Okay, a little.', className: `${s.bentoLarge}` },
  { icon: <GiftIcon size={28} />, title: 'Salary Day Mode', desc: 'Salary just hit? Stew auto-suggests budget splits — Needs, Wants, Savings, Investments. Because day 1 decisions shape day 30 realities.' },
  { icon: <Brain01Icon size={28} />, title: 'Persona Engine', desc: 'Fresher or Investor? Stew adapts its entire personality. Warmth for beginners, cold-hard numbers for the pros.', className: `${s.bentoTall}` },
  { icon: <Store01Icon size={28} />, title: 'Stew Marketplace', desc: 'Community-built financial personas. Install a "Tax Season Mode" or a "DeFi Degen" persona. Open platform for 200M Indians.' },
  { icon: <Shield01Icon size={28} />, title: 'Stablecoin Vault', desc: 'Save in USDC, beat Indian inflation. Your ₹ goals, dollar-stable. Coming soon.' },
  { icon: <Coins01Icon size={28} />, title: 'Stew Float', desc: '₹5,000 before payday. No interest. No shame. Salary-backed micro-credit for the tight weeks.' },
  { icon: <Shield01Icon size={28} />, title: 'Powered by RBI Account Aggregator', desc: 'Your data, your consent, always. Built on India\'s regulatory rails. Bank-grade security, no screen scraping.', className: `${s.bentoAccent}` },
];

const landingPlugins = [
  { icon: <ChartAverageIcon size={24} />, name: 'Tax Season Mode', creator: 'by ClearTax', desc: 'Auto-tag 80C, 80D deductions before March. Your CA will thank you.', installs: '12.4k' },
  { icon: <BitcoinIcon size={24} />, name: 'DeFi Degen Persona', creator: 'by CoinDCX', desc: 'Stew speaks crypto. Track DeFi yields alongside your UPI spend.', installs: '8.7k' },
  { icon: <Briefcase02Icon size={24} />, name: 'Salary Negotiation Coach', creator: 'by Stew Labs', desc: 'Data-backed scripts and timing strategies for your next appraisal.', installs: '15.2k' },
  { icon: <UserGroupIcon size={24} />, name: 'Couple Finance Mode', creator: 'by Stew Community', desc: 'Split, share, and plan finances with your partner. No fights.', installs: '6.1k' },
];

const timelineSteps = [
  { icon: <Coins01Icon size={32} />, label: 'Salary Day' },
  { icon: <GiftIcon size={32} />, label: 'Celebration' },
  { icon: <Pizza01Icon size={32} />, label: 'Swiggy Binge' },
  { icon: <BankIcon size={32} />, label: 'EMI Hits' },
  { icon: <Alert01Icon size={32} />, label: 'Panic' },
  { icon: <RefreshIcon size={32} />, label: 'Repeat' },
];

const barColors = ['#f59e0b', '#06b6d4', '#a855f7', '#ef4444', '#10b981', '#d4a853', '#f59e0b'];
const barHeights = [60, 85, 45, 100, 70, 55, 90];

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="site-shell">
      {/* ---- NAV ---- */}
      <nav className={s.nav}>
        <Link href="/" className={s.logo}>
          <div className={s.logoIcon}><StewLogo size={22} /></div>
          <span className={s.logoText}>stew</span>
        </Link>

        <div className={s.navPill}>
          <a href="#how" className={s.navLink}>How it works</a>
          <a href="#personas" className={s.navLink}>Personas</a>
          <a href="#marketplace" className={s.navLink}>Marketplace</a>
          <a href="#waitlist" className={s.navLink}>For Investors</a>
        </div>

        <div className={s.navRight}>
          <div className={`status-tag ${s.statusTag}`}>
            <div className="status-dot"></div>
            <span>BETA · INDIA</span>
          </div>
          <a href="#waitlist" className="btn-lime" style={{ fontSize: '0.85rem', padding: '0.65rem 1.5rem' }}>
            Join Waitlist
          </a>
          <button className={s.mobileMenuBtn} onClick={() => setMobileMenu(true)} aria-label="Open menu">☰</button>
        </div>
      </nav>

      {mobileMenu && (
        <div className={s.mobileMenu}>
          <button className={s.closeBtn} onClick={() => setMobileMenu(false)}>×</button>
          <a href="#how" onClick={() => setMobileMenu(false)}>How it works</a>
          <a href="#personas" onClick={() => setMobileMenu(false)}>Personas</a>
          <a href="#marketplace" onClick={() => setMobileMenu(false)}>Marketplace</a>
          <a href="#waitlist" onClick={() => setMobileMenu(false)}>For Investors</a>
          <Link href="/demo" onClick={() => setMobileMenu(false)}>Try Demo</Link>
        </div>
      )}

      {/* ---- HERO ---- */}
      <section className={s.hero}>
        <div className={`glow-sphere glow-lime ${s.heroGlow}`}></div>

        <div className={s.heroLeft}>
          <div className={s.aiLabel}>
            <span></span> AI-Powered Financial Companion
          </div>
          <h1 className={s.heroTitle}>
            Your salary<br />
            deserves a{' '}
            <span className={s.heroTitleGradient}>best friend.</span>
          </h1>
          <p className={s.heroSub}>
            Stew is an AI that knows your UPI, understands your goals, and actually talks to you like a person — not a spreadsheet.
          </p>
          <div className={s.heroCtas}>
            <a href="#waitlist" className="btn-lime">Join the Waitlist</a>
            <Link href="/demo" className="btn-ghost">See the Demo →</Link>
          </div>
          <div className={s.aaBadge}>🔒 Built on RBI&apos;s Account Aggregator Framework</div>
        </div>

        <div className={s.heroRight}>
          <div className={s.chatMockup}>
            <div className={s.chatMockupHeader}>
              <div className={s.chatMockupDot}></div>
              <span className={s.chatMockupTitle}>Stew Chat</span>
            </div>
            <div className={s.chatBubble + ' ' + s.chatBubbleStew}>
              Hey! 👋 Your salary just landed. You spent ₹3.2K on Swiggy last month. Want a game plan this time?
            </div>
            <div className={s.chatBubble + ' ' + s.chatBubbleUser}>
              Ugh, already? Okay fine. Help me not go broke by the 25th 😅
            </div>
            <div className={s.chatBubble + ' ' + s.chatBubbleStew}>
              Say less. I&apos;ve split your ₹67K into Needs, Wants & Savings. EMI of ₹8.5K auto-deducted. Let&apos;s lock it in? 🔒
            </div>
            <div className={s.chatBubble + ' ' + s.chatBubbleUser}>
              Wait, how much can I spend on Zomato tho? 🍕
            </div>
            <div className={s.aaCursor}>AI Cursor</div>
          </div>
        </div>
      </section>

      {/* ---- PROBLEM ---- */}
      <section className={s.problem} id="how">
        <h2 className={s.problemTitle}>
          The 10-day salary cycle.<br />You know it.
        </h2>
        <div className={s.timeline}>
          {timelineSteps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div className={s.timelineStep}>
                <span className={s.timelineEmoji}>{step.icon}</span>
                <span className={s.timelineLabel}>{step.label}</span>
              </div>
              {i < timelineSteps.length - 1 && <span className={s.timelineArrow}>→</span>}
            </div>
          ))}
        </div>
        <p className={s.problemBreaker}>&ldquo;Stew exists to break this loop.&rdquo;</p>
      </section>

      {/* ---- BENTO ---- */}
      <section className={s.bento} id="personas">
        <h2 className={s.bentoTitle}>Everything you need. One app.</h2>
        <div className={s.bentoGrid}>
          {bentoCards.map((card, i) => (
            <div key={i} className={`${s.bentoCard} ${card.className || ''}`}>
              <div className={s.bentoCardEmoji}>{card.icon}</div>
              <h3 className={s.bentoCardTitle}>{card.title}</h3>
              <p className={s.bentoCardDesc}>{card.desc}</p>
              {i === 0 && (
                <div className={s.bentoBars}>
                  {barHeights.map((h, j) => (
                    <div key={j} className={s.bentoBar} style={{ height: `${h}%`, background: barColors[j] }}></div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---- MARKETPLACE ---- */}
      <section className={s.marketplace} id="marketplace">
        <h2 className={s.bentoTitle}>Stew is a platform, not just an app.</h2>
        <p className={s.marketplaceSubtitle}>Community-built AI financial personas. Open API. Built for 200M Indians.</p>
        <div className={s.pluginGrid}>
          {landingPlugins.map((p, i) => (
            <div key={i} className={s.pluginCard}>
              <div className={s.pluginEmoji}>{p.icon}</div>
              <div className={s.pluginName}>{p.name}</div>
              <div className={s.pluginCreator}>{p.creator}</div>
              <div className={s.pluginDesc}>{p.desc}</div>
              <div className={s.pluginMeta}>
                <span>⬇ {p.installs}</span>
                <span>★ 4.5+</span>
              </div>
            </div>
          ))}
        </div>
        <p className={s.marketplaceTagline}>Coming soon. <span>Open API.</span> Build for 200M Indians.</p>
      </section>

      {/* ---- WAITLIST ---- */}
      <section className={s.waitlist} id="waitlist">
        {!submitted ? (
          <>
            <h2 className={s.waitlistTitle}>Get early access</h2>
            <p className={s.waitlistSub}>Be among the first to try Stew when we launch.</p>
            <form className={s.waitlistForm} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className={s.waitlistRow}>
                <input className="input-field" type="text" placeholder="Your name" required />
                <input className="input-field" type="email" placeholder="Email address" required />
              </div>
              <div className={s.waitlistRow}>
                <input className="input-field" type="tel" placeholder="Phone (optional)" />
                <select className="input-field" required>
                  <option value="">I am a...</option>
                  <option value="fresher">Confused Fresher</option>
                  <option value="investor">Ambitious Investor</option>
                  <option value="curious">Just curious</option>
                </select>
              </div>
              <button type="submit" className="btn-lime" style={{ width: '100%', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                Join the Waitlist <StewLogo size={18} />
              </button>
            </form>
            <div className={s.waitlistCounter}>
              <span>2,847</span> people already waiting
            </div>
          </>
        ) : (
          <div className={s.waitlistSuccess}>
            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>You&apos;re on the list! <StewLogo size={24} /></h3>
            <p>Stew is simmering. We&apos;ll notify you when it&apos;s ready.</p>
          </div>
        )}
      </section>

      {/* ---- FOOTER ---- */}
      <footer className={s.footer}>
        <div className={s.footerWatermark}>STEW</div>
        <div className={s.footerContent}>
          <p className={s.footerTagline}>Your money. Your rules. Your Stew.</p>
          <p className={s.footerSub}>Made in India 🇮🇳 for India</p>
          <div className={s.footerLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
          <p className={s.footerCopy}>© 2026 Stew Finance · All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
