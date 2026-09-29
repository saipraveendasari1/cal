import React, { useState } from 'react';
import { BookOpen, Sparkles, AlertCircle, Award, CheckCircle, ChevronRight, HelpCircle } from 'lucide-react';

export default function LecturePage({ onOpenCalculator }) {
  const [activeSection, setActiveSection] = useState('codes');

  const sections = [
    { id: 'codes', label: '1. Master Calendar Codes (144 025...)' },
    { id: 'walkthrough', label: '2. Step-by-Step Examples (1947 & 1950)' },
    { id: 'odd_days', label: '3. What are Odd Days?' },
    { id: 'leap_year', label: '4. Leap Year & Century Rules' },
    { id: 'century', label: '5. Century Odd Days (100-400 yrs)' },
    { id: 'repetition', label: '6. Calendar Repetition Tricks' },
  ];

  return (
    <div>
      {/* Top Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge badge-amber" style={{ marginBottom: '8px' }}>
              Standard Codes: 144 025 036 146 • Sun=1 to Sat=0
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>
              Calendar Codes & Aptitude Theory
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '750px' }}>
              Master the exact codes for Month, Century, and Day of Week, along with step-by-step calculation proofs and odd day reduction rules.
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={onOpenCalculator}
          >
            <span>Try Live Calculator</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Lecture Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Sidebar Index */}
        <div className="glass-card" style={{ padding: '16px', position: 'sticky', top: '20px' }}>
          <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '12px', paddingLeft: '8px' }}>
            Lecture Topics
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  background: activeSection === s.id ? 'linear-gradient(135deg, var(--accent-indigo), #7c3aed)' : 'transparent',
                  color: activeSection === s.id ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{s.label}</span>
                {activeSection === s.id && <ChevronRight size={16} />}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div>
          {/* SECTION 1: MASTER CODES */}
          {activeSection === 'codes' && (
            <div className="glass-card">
              <div className="card-header">
                <span className="badge badge-amber">Official Calendar Codes</span>
                <h3 className="card-title" style={{ marginTop: '8px' }}>
                  Month Codes, Century Codes & Day Codes
                </h3>
                <p className="card-subtitle">
                  These exact codes allow you to determine the day of the week for any date in history within 15 seconds.
                </p>
              </div>

              {/* 3 Main Code Reference Tables */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* 1. Month Codes */}
                <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ color: 'var(--accent-indigo)', fontSize: '1rem', fontWeight: 800 }}>
                      1. Month Codes
                    </h4>
                    <span className="mono" style={{ fontSize: '0.78rem', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--accent-indigo)', padding: '2px 8px', borderRadius: '4px' }}>
                      144 025 036 146
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                      { name: 'Jan', code: 1, leap: 0 },
                      { name: 'Feb', code: 4, leap: 3 },
                      { name: 'Mar', code: 4, leap: 4 },
                      { name: 'Apr', code: 0, leap: 0 },
                      { name: 'May', code: 2, leap: 2 },
                      { name: 'June', code: 5, leap: 5 },
                      { name: 'July', code: 0, leap: 0 },
                      { name: 'Aug', code: 3, leap: 3 },
                      { name: 'Sep', code: 6, leap: 6 },
                      { name: 'Oct', code: 1, leap: 1 },
                      { name: 'Nov', code: 4, leap: 4 },
                      { name: 'Dec', code: 6, leap: 6 },
                    ].map(m => (
                      <div key={m.name} style={{ background: 'var(--surface-1)', padding: '8px', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.name}</div>
                        <div className="mono" style={{ fontWeight: 800, color: '#facc15', fontSize: '1.1rem' }}>
                          {m.code}
                        </div>
                        {m.leap !== m.code && (
                          <div style={{ fontSize: '0.68rem', color: 'var(--accent-red)' }}>
                            Leap: {m.leap}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    💡 <strong>Easy Memory Trick:</strong><br />
                    • Jan–Mar: <strong>144</strong> (12²)<br />
                    • Apr–Jun: <strong>025</strong> (5²)<br />
                    • Jul–Sep: <strong>036</strong> (6²)<br />
                    • Oct–Dec: <strong>146</strong> (12² + 2)
                  </div>
                </div>

                {/* 2. Century Codes */}
                <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ color: 'var(--accent-amber)', fontSize: '1rem', fontWeight: 800 }}>
                      2. Century Codes
                    </h4>
                    <span className="mono" style={{ fontSize: '0.78rem', background: 'rgba(234, 179, 8, 0.2)', color: 'var(--accent-amber)', padding: '2px 8px', borderRadius: '4px' }}>
                      6, 4, 2, 0 Cycle
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[
                      { range: '1500 - 1599', code: 0 },
                      { range: '1600 - 1699', code: 6 },
                      { range: '1700 - 1799', code: 4 },
                      { range: '1800 - 1899', code: 2 },
                      { range: '1900 - 1999', code: 0 },
                      { range: '2000 - 2099', code: 6 },
                      { range: '2100 - 2199', code: 4 },
                      { range: '2200 - 2299', code: 2 },
                    ].map(c => (
                      <div key={c.range} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-1)', padding: '7px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.85rem' }}>{c.range}</span>
                        <span className="mono" style={{ fontWeight: 800, color: '#39c5cf', fontSize: '1rem' }}>
                          Code: {c.code}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    💡 <strong>400-Year Cycle Rule:</strong> Divide century by 4. Remainder 0 = 6, 1 = 4, 2 = 2, 3 = 0.
                  </div>
                </div>

                {/* 3. Day Codes */}
                <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ color: 'var(--accent-green-bright)', fontSize: '1rem', fontWeight: 800 }}>
                      3. Day Codes
                    </h4>
                    <span className="mono" style={{ fontSize: '0.78rem', background: 'rgba(63, 185, 80, 0.2)', color: 'var(--accent-green-bright)', padding: '2px 8px', borderRadius: '4px' }}>
                      Sun=1 to Sat=0
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[
                      { day: 'Sun', code: 1, emoji: '☀️' },
                      { day: 'Mon', code: 2, emoji: '🌙' },
                      { day: 'Tue', code: 3, emoji: '🔥' },
                      { day: 'Wed', code: 4, emoji: '💧' },
                      { day: 'Thu', code: 5, emoji: '⚡' },
                      { day: 'Fri', code: 6, emoji: '✨' },
                      { day: 'Sat', code: 0, emoji: '🪐' },
                    ].map(d => (
                      <div key={d.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-1)', padding: '7px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontSize: '0.88rem' }}>{d.emoji} {d.day}</span>
                        <span className="mono" style={{ fontWeight: 800, color: 'var(--accent-green-bright)', fontSize: '1rem' }}>
                          Code: {d.code}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    💡 <strong>Remainder Meaning:</strong> After dividing the grand total by 7, the remainder directly corresponds to these day codes!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: EXAMPLES WALKTHROUGH */}
          {activeSection === 'walkthrough' && (
            <div className="glass-card">
              <div className="card-header">
                <span className="badge badge-green">Worked Examples</span>
                <h3 className="card-title" style={{ marginTop: '8px' }}>
                  Solving with the New Codes: 15 Aug 1947 & 26 Jan 1950
                </h3>
                <p className="card-subtitle">
                  Watch how the formula yields 100% correct answers with these exact codes.
                </p>
              </div>

              {/* Example 1 */}
              <div style={{ background: 'var(--surface-2)', padding: '20px', borderRadius: 'var(--radius-lg)', marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--accent-indigo)', fontSize: '1.1rem', marginBottom: '12px' }}>
                  Example 1: 15th August 1947
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                    <span>1. Date:</span>
                    <span className="mono" style={{ fontWeight: 700 }}>15</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                    <span>2. Month Code (August):</span>
                    <span className="mono" style={{ fontWeight: 700, color: '#facc15' }}>3</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                    <span>3. Century Code (1900-1999):</span>
                    <span className="mono" style={{ fontWeight: 700, color: '#39c5cf' }}>0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                    <span>4. Last 2 Digits of Year:</span>
                    <span className="mono" style={{ fontWeight: 700 }}>47</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                    <span>5. Leap Years (47 ÷ 4):</span>
                    <span className="mono" style={{ fontWeight: 700 }}>11</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '1.1rem' }}>
                    <strong>Grand Sum:</strong>
                    <strong className="mono" style={{ color: 'var(--accent-indigo)' }}>
                      15 + 3 + 0 + 47 + 11 = 76
                    </strong>
                  </div>
                </div>

                <div style={{ marginTop: '16px', padding: '14px', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div className="mono" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                    76 ÷ 7 = 10 weeks + <span style={{ color: 'var(--accent-green-bright)' }}>Remainder 6</span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-green-bright)', marginTop: '4px' }}>
                    Day Code 6 = ✨ FRIDAY ✨
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div style={{ background: 'var(--surface-2)', padding: '20px', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ color: 'var(--accent-purple)', fontSize: '1.1rem', marginBottom: '12px' }}>
                  Example 2: 26th January 1950 (Republic Day)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                    <span>1. Date:</span>
                    <span className="mono" style={{ fontWeight: 700 }}>26</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                    <span>2. Month Code (Jan - Ordinary Year):</span>
                    <span className="mono" style={{ fontWeight: 700, color: '#facc15' }}>1</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                    <span>3. Century Code (1900s):</span>
                    <span className="mono" style={{ fontWeight: 700, color: '#39c5cf' }}>0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                    <span>4. Last 2 Digits:</span>
                    <span className="mono" style={{ fontWeight: 700 }}>50</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px' }}>
                    <span>5. Leap Years (50 ÷ 4):</span>
                    <span className="mono" style={{ fontWeight: 700 }}>12</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '1.1rem' }}>
                    <strong>Grand Sum:</strong>
                    <strong className="mono" style={{ color: 'var(--accent-purple)' }}>
                      26 + 1 + 0 + 50 + 12 = 89
                    </strong>
                  </div>
                </div>

                <div style={{ marginTop: '16px', padding: '14px', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div className="mono" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                    89 ÷ 7 = 12 weeks + <span style={{ color: 'var(--accent-green-bright)' }}>Remainder 5</span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '4px' }}>
                    Day Code 5 = ⚡ THURSDAY ⚡
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: ODD DAYS */}
          {activeSection === 'odd_days' && (
            <div className="glass-card">
              <div className="card-header">
                <span className="badge badge-indigo">Fundamental Concept</span>
                <h3 className="card-title" style={{ marginTop: '8px' }}>
                  What are Odd Days?
                </h3>
              </div>

              <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--accent-indigo)', marginBottom: '20px' }}>
                <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                  <strong>Odd days</strong> means the <strong>remainder</strong> obtained on dividing the total number of days by <strong>seven (7)</strong>.
                </p>
                <div className="mono" style={{ background: 'var(--surface-1)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginTop: '10px', fontSize: '1.05rem', color: 'var(--accent-green-bright)' }}>
                  Odd Days = Total Days mod 7 &nbsp;&nbsp;(Values strictly from 0 to 6)
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div style={{ background: 'var(--surface-2)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '4px' }}>Example 1: 26 Days</div>
                  <div className="mono" style={{ fontSize: '0.95rem' }}>26 ÷ 7 = 3 weeks + <strong>5 odd days</strong></div>
                </div>

                <div style={{ background: 'var(--surface-2)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-green-bright)', marginBottom: '4px' }}>Example 2: 42 Days</div>
                  <div className="mono" style={{ fontSize: '0.95rem' }}>42 ÷ 7 = 6 weeks + <strong>0 odd days</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: LEAP YEAR */}
          {activeSection === 'leap_year' && (
            <div className="glass-card">
              <div className="card-header">
                <span className="badge badge-green">Leap Year Rules</span>
                <h3 className="card-title" style={{ marginTop: '8px' }}>
                  Leap Year vs Ordinary Year
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '20px' }}>
                <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-blue)', marginBottom: '8px' }}>
                    1. Ordinary Year (365 days)
                  </div>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.9rem', lineHeight: '1.7' }}>
                    <li>365 ÷ 7 = <strong>52 weeks + 1 Odd Day</strong></li>
                    <li>Jan code = 1, Feb code = 4</li>
                  </ul>
                </div>

                <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-red)', marginBottom: '8px' }}>
                    2. Leap Year (366 days)
                  </div>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.9rem', lineHeight: '1.7' }}>
                    <li>366 ÷ 7 = <strong>52 weeks + 2 Odd Days</strong></li>
                    <li>Jan code = 0, Feb code = 3 (adjust by -1)</li>
                  </ul>
                </div>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '18px', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ color: 'var(--accent-red)', marginBottom: '6px' }}>Century Year Rule:</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  A century year (ending in '00') is a leap year <strong>ONLY if it is divisible by 400</strong> (e.g. 1600, 2000, 2400). Years like 1700, 1800, 1900, 2100 are NOT leap years!
                </p>
              </div>
            </div>
          )}

          {/* SECTION 5: CENTURY ODD DAYS */}
          {activeSection === 'century' && (
            <div className="glass-card">
              <div className="card-header">
                <span className="badge badge-amber">Century Cycle</span>
                <h3 className="card-title" style={{ marginTop: '8px' }}>
                  Evaluation of Odd Days in Centuries
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: 'var(--surface-2)', padding: '14px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>100 Years</div>
                  <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>5</div>
                </div>
                <div style={{ background: 'var(--surface-2)', padding: '14px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>200 Years</div>
                  <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-purple)' }}>3</div>
                </div>
                <div style={{ background: 'var(--surface-2)', padding: '14px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>300 Years</div>
                  <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-amber)' }}>1</div>
                </div>
                <div style={{ background: 'var(--surface-2)', padding: '14px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '2px solid var(--accent-green-bright)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-green-bright)' }}>400 Years</div>
                  <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-green-bright)' }}>0</div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: CALENDAR REPETITION */}
          {activeSection === 'repetition' && (
            <div className="glass-card">
              <div className="card-header">
                <span className="badge badge-purple">Repetition Rules</span>
                <h3 className="card-title" style={{ marginTop: '8px' }}>
                  Calendar Repetition Shortcuts
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-md)', borderTop: '4px solid var(--accent-red)' }}>
                  <h4 style={{ color: 'var(--accent-red)', marginBottom: '4px' }}>Leap Year</h4>
                  <p style={{ fontSize: '0.9rem' }}>Repeats after <strong>28 Years</strong> (e.g. 1984 + 28 = 2012)</p>
                </div>

                <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-md)', borderTop: '4px solid var(--accent-blue)' }}>
                  <h4 style={{ color: 'var(--accent-blue)', marginBottom: '4px' }}>Leap Year + 1</h4>
                  <p style={{ fontSize: '0.9rem' }}>Repeats after <strong>6 Years</strong> (e.g. 2005 + 6 = 2011)</p>
                </div>

                <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-md)', borderTop: '4px solid var(--accent-indigo)' }}>
                  <h4 style={{ color: 'var(--accent-indigo)', marginBottom: '4px' }}>Leap Year + 2 or + 3</h4>
                  <p style={{ fontSize: '0.9rem' }}>Repeats after <strong>11 Years</strong> (e.g. 2002 + 11 = 2013)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
