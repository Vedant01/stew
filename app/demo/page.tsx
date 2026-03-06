'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import s from './demo.module.css';
import {
  transactions, categories, spendByCategory, defaultGoals, goalPresets,
  plugins, chatResponses, salaryAllocation, transactionInsights,
  type Transaction, type Goal, type Plugin
} from '@/lib/data';
import StewLogo from '@/components/StewLogo';
import {
  ChartAverageIcon, UserGroupIcon, SmartPhone01Icon, StarIcon, Store01Icon,
  GiftIcon, Coins01Icon, Brain01Icon, Chart01Icon
} from 'hugeicons-react';

type Persona = 'fresher' | 'investor';
type Tab = 'dashboard' | 'chat' | 'transactions' | 'goals' | 'marketplace';

// Find matching response
function findResponse(input: string, persona: Persona): string {
  const lower = input.toLowerCase().trim();
  for (const r of chatResponses) {
    if (r.keywords.some(k => lower.includes(k))) {
      return persona === 'fresher' ? r.fresher : r.investor;
    }
  }
  return persona === 'fresher'
    ? "Hmm, I'm not sure about that one! 😅 Try asking me about your salary, savings, investments, food spending, EMIs, or budgeting — I've got opinions on all of those!"
    : "That's outside my current data scope. Try: salary planning, investment strategy, EMI optimization, spend analysis, or savings goals. I work best with specifics. 📊";
}

export default function DemoPage() {
  const [persona, setPersona] = useState<Persona>('fresher');
  const [tab, setTab] = useState<Tab>('dashboard');

  // Chat state
  const [messages, setMessages] = useState<{ sender: 'stew' | 'user'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Transaction state
  const [txFilter, setTxFilter] = useState('All');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Goals state
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalIcon, setNewGoalIcon] = useState<React.ReactNode>(<StarIcon size={20} />);
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');

  // Marketplace state
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);
  const [installedPlugins, setInstalledPlugins] = useState<Set<string>>(new Set());

  // Salary Day
  const [showSalaryDay, setShowSalaryDay] = useState(false);

  // Float
  const [showFloat, setShowFloat] = useState(false);
  const [floatRequested, setFloatRequested] = useState(false);

  // Initialize chat with greeting
  useEffect(() => {
    const greeting = persona === 'fresher'
      ? "Hey Arjun! 👋 Welcome back. Your salary landed 14 days ago — let's check how you're doing. Ask me anything about your money!"
      : "Hey Arjun. 📊 Salary credited 14 days ago. Portfolio update: SIPs on track, EMI ratio at 37%. What do you want to optimize today?";
    setMessages([{ sender: 'stew', text: greeting }]);
  }, [persona]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setTyping(true);

    setTimeout(() => {
      const response = findResponse(userMsg, persona);
      setTyping(false);
      setMessages(prev => [...prev, { sender: 'stew', text: response }]);
    }, 1200 + Math.random() * 800);
  }, [chatInput, persona]);

  const filteredTx = txFilter === 'All' ? transactions : transactions.filter(t => t.category === txFilter);

  const addGoal = () => {
    if (!newGoalName || !newGoalTarget) return;
    const goal: Goal = {
      id: `g${Date.now()}`,
      name: newGoalName,
      icon: newGoalIcon,
      target: parseInt(newGoalTarget),
      saved: 0,
      weeklyAmount: Math.ceil(parseInt(newGoalTarget) / 16),
      deadline: newGoalDeadline || '2026-12-31',
    };
    setGoals(prev => [...prev, goal]);
    setShowGoalModal(false);
    setNewGoalName('');
    setNewGoalTarget('');
    setNewGoalDeadline('');
    setNewGoalIcon(<StarIcon size={20} />);
  };

  const topUpGoal = (id: string) => {
    setGoals(prev => prev.map(g =>
      g.id === id ? { ...g, saved: Math.min(g.saved + g.weeklyAmount, g.target) } : g
    ));
  };

  // Donut chart SVG
  const totalSpend = spendByCategory.reduce((a, b) => a + b.amount, 0);
  const donutSegments = (() => {
    let cumulative = 0;
    const circumference = 2 * Math.PI * 70;
    return spendByCategory.map(cat => {
      const length = (cat.amount / totalSpend) * circumference;
      const offset = cumulative;
      cumulative += length;
      return { ...cat, length, offset, circumference };
    });
  })();

  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: 'dashboard', icon: <ChartAverageIcon size={20} />, label: 'Dashboard' },
    { id: 'chat', icon: <UserGroupIcon size={20} />, label: 'Chat' },
    { id: 'transactions', icon: <SmartPhone01Icon size={20} />, label: 'Transactions' },
    { id: 'goals', icon: <StarIcon size={20} />, label: 'Goals' },
    { id: 'marketplace', icon: <Store01Icon size={20} />, label: 'Marketplace' },
  ];

  const salaryRemaining = 30440;
  const salaryUsedPercent = ((salaryAllocation.salary - salaryRemaining) / salaryAllocation.salary) * 100;

  return (
    <div className={s.demoShell}>
      {/* ---- SIDEBAR ---- */}
      <aside className={s.sidebar}>
        <Link href="/" className={s.sidebarLogo}>
          <div className={s.sidebarLogoIcon}><StewLogo size={20} /></div>
          <span className={s.sidebarLogoText}>stew</span>
          <span className={s.sidebarDemoTag}>demo</span>
        </Link>

        <nav className={s.sidebarNav}>
          {tabs.map(t => (
            <button
              key={t.id}
              className={`${s.sidebarLink} ${tab === t.id ? s.sidebarLinkActive : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span className={s.sidebarLinkEmoji}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        <div className={s.personaSwitcher}>
          <div className={s.personaLabel}>Active Persona</div>
          <div className={s.personaOptions}>
            <button
              className={`${s.personaBtn} ${persona === 'fresher' ? s.personaBtnActive : ''}`}
              onClick={() => setPersona('fresher')}
            >
              <span className={s.personaBtnEmoji}><Brain01Icon size={16} /></span> Confused Fresher
            </button>
            <button
              className={`${s.personaBtn} ${persona === 'investor' ? s.personaBtnActive : ''}`}
              onClick={() => setPersona('investor')}
            >
              <span className={s.personaBtnEmoji}><Chart01Icon size={16} /></span> Ambitious Investor
            </button>
          </div>
        </div>
      </aside>

      {/* ---- MOBILE TOP BAR ---- */}
      <div className={s.mobilePersonaBar}>
        <div className={s.mobilePersonaInner}>
          <div className={s.sidebarLogoIcon}><StewLogo size={20} /></div>
          <span style={{ fontWeight: 700, color: 'var(--lime)', fontSize: '1.1rem' }}>stew</span>
          <div className={s.mobilePersonaToggle}>
            <button className={persona === 'fresher' ? 'active' : ''} onClick={() => setPersona('fresher')}>🎓 Fresher</button>
            <button className={persona === 'investor' ? 'active' : ''} onClick={() => setPersona('investor')}>📈 Investor</button>
          </div>
        </div>
      </div>

      {/* ---- BOTTOM NAV (mobile) ---- */}
      <div className={s.bottomNav}>
        <div className={s.bottomNavInner}>
          {tabs.map(t => (
            <button
              key={t.id}
              className={`${s.bottomNavBtn} ${tab === t.id ? s.bottomNavBtnActive : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---- MAIN CONTENT ---- */}
      <main className={s.mainContent}>

        {/* ======== DASHBOARD ======== */}
        {tab === 'dashboard' && (
          <div>
            <h1 className={s.greeting}>
              {persona === 'fresher' ? 'Hey Arjun 👋' : 'Arjun — Day 14 📊'}
            </h1>
            <p className={s.greetingSub}>
              {persona === 'fresher'
                ? 'Your salary landed 14 days ago. Let\'s see how you\'re doing!'
                : 'Salary credited 14 days ago. Here\'s your financial snapshot.'}
            </p>

            {/* Salary Day Banner */}
            <div className={s.salaryDayBanner} onClick={() => setShowSalaryDay(true)}>
              <div className={s.salaryDayText}>
                🎉 Salary Just Hit — Plan it with Stew
                <span>Click to open your personalized budget allocation</span>
              </div>
              <span className="btn-lime" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', flexShrink: 0 }}>
                Plan Now
              </span>
            </div>

            {/* Salary Health Bar */}
            <div className={s.salaryBar}>
              <div className={s.salaryBarLabel}>
                <span>Salary Health</span>
                <span>₹{salaryRemaining.toLocaleString()} / ₹{salaryAllocation.salary.toLocaleString()} remaining</span>
              </div>
              <div className={s.salaryBarTrack}>
                <div className={s.salaryBarFill} style={{ width: `${100 - salaryUsedPercent}%` }}></div>
              </div>
            </div>

            {/* Spend Breakdown */}
            <div className={s.spendSection}>
              <h3 className={s.spendTitle}>Spend Breakdown</h3>
              <div className={s.donutWrapper}>
                <div className={s.donutChart}>
                  <svg viewBox="0 0 160 160">
                    {donutSegments.map((seg, i) => (
                      <circle
                        key={i}
                        cx="80" cy="80" r="70"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="16"
                        strokeDasharray={`${seg.length} ${seg.circumference - seg.length}`}
                        strokeDashoffset={-seg.offset}
                        style={{ transition: 'stroke-dasharray 0.8s ease' }}
                      />
                    ))}
                  </svg>
                  <div className={s.donutCenter}>
                    <div className={s.donutTotal}>₹{totalSpend.toLocaleString()}</div>
                    <div className={s.donutLabel}>Total Spent</div>
                  </div>
                </div>
                <div className={s.donutLegend}>
                  {spendByCategory.map((cat, i) => (
                    <div key={i} className={s.donutLegendItem}>
                      <div className={s.donutLegendDot} style={{ background: cat.color }}></div>
                      <span className={s.donutLegendText}>{cat.name}</span>
                      <span className={s.donutLegendAmount}>₹{cat.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={s.quickActions}>
              <button className={s.quickAction} onClick={() => setShowSalaryDay(true)}>
                <div className={s.quickActionEmoji}><GiftIcon size={24} /></div>
                Plan my salary
              </button>
              <button className={s.quickAction} onClick={() => setTab('chat')}>
                <div className={s.quickActionEmoji}><UserGroupIcon size={24} /></div>
                Chat with Stew
              </button>
              <button className={s.quickAction} onClick={() => setTab('goals')}>
                <div className={s.quickActionEmoji}><StarIcon size={24} /></div>
                View Goals
              </button>
              <button className={s.quickAction} onClick={() => setShowFloat(true)}>
                <div className={s.quickActionEmoji}><Coins01Icon size={24} /></div>
                Stew Float
              </button>
            </div>

            {/* Stablecoin Vault Card */}
            <div className={s.vaultCard} style={{ marginTop: '1.5rem' }}>
              <div className={s.vaultTitle}>🔐 Stablecoin Savings Vault</div>
              <div className={s.vaultSub}>Save in USDC, beat Indian inflation. Your ₹ goals, dollar-stable.</div>
              <span className={s.vaultBadge}>Coming Soon</span>
            </div>

            {/* Float Card */}
            <div className={s.floatCard} onClick={() => setShowFloat(true)}>
              <div className={s.floatCardTitle}>💸 Stew Float: ₹5,000 before payday</div>
              <div className={s.floatCardSub}>No interest. No shame. Salary-backed micro-credit for the tight weeks.</div>
            </div>
          </div>
        )}

        {/* ======== CHAT ======== */}
        {tab === 'chat' && (
          <div className={s.chatContainer}>
            <h2 className={s.sectionTitle}>
              {persona === 'fresher' ? '💬 Chat with Stew' : '💬 Stew Terminal'}
            </h2>
            <div className={s.chatMessages}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`${s.chatMsg} ${
                    msg.sender === 'stew'
                      ? `${s.chatMsgStew} ${persona === 'fresher' ? s.chatMsgStewFresher : s.chatMsgStewInvestor}`
                      : s.chatMsgUser
                  }`}
                >
                  <div className={s.chatSender}>
                    {msg.sender === 'stew' ? '🍲 Stew' : 'You'}
                  </div>
                  {msg.text}
                </div>
              ))}
              {typing && (
                <div className={`${s.chatMsg} ${s.chatMsgStew} ${persona === 'fresher' ? s.chatMsgStewFresher : s.chatMsgStewInvestor}`}>
                  <div className={s.chatSender}>🍲 Stew</div>
                  <div className="typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className={s.chatInputBar}>
              <input
                className="input-field"
                placeholder={persona === 'fresher' ? 'Ask Stew anything about money...' : 'Query: salary, investments, spend analysis...'}
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
              />
              <button className="btn-lime" onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}

        {/* ======== TRANSACTIONS ======== */}
        {tab === 'transactions' && (
          <div>
            <h2 className={s.sectionTitle}>📱 UPI Transactions</h2>
            <div className={s.txFilters}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`chip ${txFilter === cat ? 'active' : ''}`}
                  onClick={() => { setTxFilter(cat); setSelectedTx(null); }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className={s.txList}>
              {filteredTx.map(tx => (
                <div
                  key={tx.id}
                  className={s.txRow}
                  onClick={() => setSelectedTx(tx)}
                  style={selectedTx?.id === tx.id ? { borderColor: 'var(--lime)', background: 'var(--lime-subtle)' } : {}}
                >
                  <div className={s.txEmoji}>{tx.icon}</div>
                  <div className={s.txInfo}>
                    <div className={s.txMerchant}>{tx.merchant}</div>
                    <div className={s.txMeta}>{tx.date} · {tx.category}</div>
                  </div>
                  <div className={`${s.txAmount} ${tx.category === 'Savings' ? s.txAmountPos : s.txAmountNeg}`}>
                    {tx.category === 'Savings' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {selectedTx && (
              <div className={s.txDetail}>
                <div className={s.txDetailHeader}>
                  <div className={s.txDetailEmoji}>{selectedTx.icon}</div>
                  <div>
                    <div className={s.txDetailName}>{selectedTx.merchant}</div>
                    <div style={{ color: 'var(--white-30)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>{selectedTx.upiId}</div>
                  </div>
                </div>
                <div className={s.txDetailAmount}>
                  {selectedTx.category === 'Savings' ? '+' : '-'}₹{selectedTx.amount.toLocaleString()}
                </div>
                <div className={s.txDetailGrid}>
                  <div className={s.txDetailItem}>
                    <label>Category</label>
                    <span>{selectedTx.category}</span>
                  </div>
                  <div className={s.txDetailItem}>
                    <label>Date</label>
                    <span>{selectedTx.date}</span>
                  </div>
                  <div className={s.txDetailItem}>
                    <label>UPI ID</label>
                    <span>{selectedTx.upiId}</span>
                  </div>
                  <div className={s.txDetailItem}>
                    <label>Status</label>
                    <span style={{ color: 'var(--emerald)' }}>✓ Completed</span>
                  </div>
                </div>
                <div className={s.txDetailInsight}>
                  <div className={s.txDetailInsightLabel}>🍲 Stew Insight</div>
                  {transactionInsights[selectedTx.merchant] || transactionInsights['default']}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======== GOALS ======== */}
        {tab === 'goals' && (
          <div>
            <h2 className={s.sectionTitle}>🎯 Smart Savings Goals</h2>
            <button className={s.addGoalBtn} onClick={() => setShowGoalModal(true)}>
              + Add New Goal
            </button>
            <div className={s.goalsList}>
              {goals.map(goal => {
                const percent = Math.round((goal.saved / goal.target) * 100);
                const weeksLeft = Math.ceil((goal.target - goal.saved) / goal.weeklyAmount);
                return (
                  <div key={goal.id} className={s.goalCard}>
                    <div className={s.goalHeader}>
                      <div className={s.goalEmoji}>{goal.icon}</div>
                      <div>
                        <div className={s.goalName}>{goal.name}</div>
                        <div className={s.goalDeadline}>by {goal.deadline}</div>
                      </div>
                    </div>
                    <div className={s.goalProgress}>
                      <span className={s.goalSaved}>₹{goal.saved.toLocaleString()}</span>
                      <span className={s.goalTarget}>/ ₹{goal.target.toLocaleString()}</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
                    </div>
                    <div className={s.goalWeekly}>
                      Set aside <span>₹{goal.weeklyAmount.toLocaleString()}/week</span> · ~{weeksLeft} weeks remaining
                    </div>
                    <button className={s.goalTopUp} onClick={() => topUpGoal(goal.id)}>
                      ⬆ Top Up ₹{goal.weeklyAmount.toLocaleString()}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======== MARKETPLACE ======== */}
        {tab === 'marketplace' && (
          <div>
            <h2 className={s.sectionTitle}>🏪 Stew Marketplace</h2>
            <div className={s.mpGrid}>
              {plugins.map(plugin => (
                <div key={plugin.id} className={s.mpCard} onClick={() => setSelectedPlugin(plugin)}>
                  <div className={s.mpEmoji}>{plugin.icon}</div>
                  <div className={s.mpName}>
                    {plugin.name}
                    {installedPlugins.has(plugin.id) && <span style={{ color: 'var(--emerald)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✓</span>}
                  </div>
                  <div className={s.mpCreator}>by {plugin.creator}</div>
                  <div className={s.mpDesc}>{plugin.description}</div>
                  <div className={s.mpMeta}>
                    <span>⬇ {plugin.installs}</span>
                    <span>★ {plugin.rating}</span>
                    <span>{plugin.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ======== MODALS ======== */}

      {/* Salary Day Modal */}
      {showSalaryDay && (
        <div className="modal-overlay" onClick={() => setShowSalaryDay(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              🎉 Salary Day Budget Plan
            </h2>
            <p style={{ color: 'var(--white-60)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {persona === 'fresher'
                ? "Let's make sure your ₹67,000 lasts the whole month! Here's a smart split:"
                : "Optimal allocation for ₹67,000 based on your spending patterns:"}
            </p>
            <div className={s.salaryAllocation}>
              {salaryAllocation.default.map((alloc, i) => (
                <div key={i} className={s.allocRow}>
                  <div className={s.allocHeader}>
                    <span className={s.allocName}>{alloc.category}</span>
                    <span className={s.allocPercent}>{alloc.percent}%</span>
                  </div>
                  <div className={s.allocAmount}>₹{alloc.amount.toLocaleString()}</div>
                  <div className={s.allocItems}>
                    {alloc.items.map(item => <span key={item}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-lime" style={{ width: '100%' }} onClick={() => setShowSalaryDay(false)}>
              Lock This Plan 🔒
            </button>
          </div>
        </div>
      )}

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="modal-overlay" onClick={() => setShowGoalModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>🎯 Add New Goal</h2>
            <p style={{ color: 'var(--white-60)', fontSize: '0.85rem' }}>Pick a preset or create your own:</p>
            <div className={s.goalPresets} style={{ marginTop: '1rem' }}>
              {goalPresets.map(p => (
                <button
                  key={p.name}
                  className={s.goalPreset}
                  onClick={() => { setNewGoalName(p.name); setNewGoalIcon(p.icon); setNewGoalTarget(String(p.target)); }}
                >
                  {p.icon} {p.name}
                </button>
              ))}
            </div>
            <div className={s.goalModalForm}>
              <input className="input-field" placeholder="Goal name" value={newGoalName} onChange={e => setNewGoalName(e.target.value)} />
              <input className="input-field" placeholder="Target amount (₹)" type="number" value={newGoalTarget} onChange={e => setNewGoalTarget(e.target.value)} />
              <input className="input-field" type="date" value={newGoalDeadline} onChange={e => setNewGoalDeadline(e.target.value)} />
              <button className="btn-lime" onClick={addGoal} style={{ width: '100%' }}>Create Goal</button>
            </div>
          </div>
        </div>
      )}

      {/* Plugin Modal */}
      {selectedPlugin && (
        <div className="modal-overlay" onClick={() => setSelectedPlugin(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className={s.mpModalHeader}>
              <div className={s.mpModalEmoji}>{selectedPlugin.icon}</div>
              <div>
                <div className={s.mpModalName}>{selectedPlugin.name}</div>
                <div className={s.mpModalCreator}>by {selectedPlugin.creator}</div>
              </div>
            </div>
            <div className={s.mpModalMeta}>
              <span>⬇ {selectedPlugin.installs} installs</span>
              <span>★ {selectedPlugin.rating}</span>
              <span>{selectedPlugin.category}</span>
            </div>
            <p className={s.mpModalDesc}>{selectedPlugin.longDescription}</p>
            <button
              className={`btn-lime ${s.mpModalInstallBtn} ${installedPlugins.has(selectedPlugin.id) ? s.mpModalInstalled : ''}`}
              onClick={() => {
                setInstalledPlugins(prev => {
                  const next = new Set(prev);
                  next.add(selectedPlugin.id);
                  return next;
                });
              }}
            >
              {installedPlugins.has(selectedPlugin.id) ? 'Installed ✓' : 'Install Plugin'}
            </button>
            <div className={s.mpModalReviews}>
              <h4>Reviews</h4>
              {selectedPlugin.reviews.map((r, i) => (
                <div key={i} className={s.mpModalReview}>
                  <div className={s.mpModalReviewUser}>{r.user}</div>
                  <div className={s.mpModalReviewStars}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                  <div className={s.mpModalReviewText}>{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Float Modal */}
      {showFloat && (
        <div className="modal-overlay" onClick={() => setShowFloat(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>💸 Stew Float</h2>
            <p style={{ color: 'var(--white-60)', fontSize: '0.85rem' }}>Salary-backed micro-credit. No interest. No shame.</p>
            <div className={s.floatAmount}>₹5,000</div>
            <div className={s.floatDetails}>
              <div className={s.floatDetailRow}>
                <span>Interest</span>
                <span style={{ color: 'var(--emerald)' }}>₹0 (Free)</span>
              </div>
              <div className={s.floatDetailRow}>
                <span>Auto-debit on</span>
                <span>Next salary day</span>
              </div>
              <div className={s.floatDetailRow}>
                <span>Eligibility</span>
                <span style={{ color: 'var(--emerald)' }}>✓ Approved</span>
              </div>
              <div className={s.floatDetailRow}>
                <span>Repayment</span>
                <span>Auto via UPI</span>
              </div>
            </div>
            {!floatRequested ? (
              <button className="btn-lime" style={{ width: '100%' }} onClick={() => setFloatRequested(true)}>
                Request ₹5,000 Float
              </button>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--lime-subtle)', borderRadius: '12px', border: '1px solid rgba(204,255,0,0.2)' }}>
                <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Float Requested! 💸</p>
                <p style={{ color: 'var(--white-60)', fontSize: '0.85rem' }}>₹5,000 will be credited within 2 minutes.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
