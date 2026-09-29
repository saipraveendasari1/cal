import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, XCircle, Calculator, Zap } from 'lucide-react';

const DAY_MAP = {
  1: 'Sunday ☀️',
  2: 'Monday 🌙',
  3: 'Tuesday 🔥',
  4: 'Wednesday 💧',
  5: 'Thursday ⚡',
  6: 'Friday ✨',
  0: 'Saturday 🪐'
};

export default function ModuloPlayground() {
  const [mod7Input, setMod7Input] = useState(47);
  const [selectedMod7, setSelectedMod7] = useState(null);

  const [mod4Input, setMod4Input] = useState(24);
  const [selectedMod4, setSelectedMod4] = useState(null);

  const n7 = parseInt(mod7Input, 10) || 0;
  const actualMod7 = ((n7 % 7) + 7) % 7;
  const quotient7 = Math.floor(n7 / 7);

  const n4 = parseInt(mod4Input, 10) || 0;
  const actualMod4 = ((n4 % 4) + 4) % 4;
  const quotient4 = Math.floor(n4 / 4);

  return (
    <div>
      {/* Header */}
      <div className="glass-card">
        <div className="card-header">
          <div className="badge badge-amber">Standard Codes (Sun=1 to Sat=0)</div>
          <h2 className="card-title" style={{ marginTop: '8px' }}>
            <Zap size={22} color="var(--accent-indigo)" />
            <span>Interactive Modulo 7 & Modulo 4 Training Lab</span>
          </h2>
          <p className="card-subtitle">
            Master the two core mathematical operations required in every calendar problem: <strong>Mod 7 (Odd Days & Day Code)</strong> and <strong>Mod 4 & Div 4 (Leap Year Quotient)</strong> using multiple choice option buttons!
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* CARD 1: MODULO 7 */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span className="badge badge-indigo">Tool 1: Modulo 7</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Odd Days & Day Code</span>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>
            Find {mod7Input || 0} mod 7
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Enter any number of days, or click presets, then tap an option button to test your remainder prediction:
          </p>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
            <input
              type="number"
              className="mono"
              value={mod7Input}
              onChange={(e) => { setMod7Input(e.target.value); setSelectedMod7(null); }}
              style={{ width: '120px', padding: '10px 14px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: '#fff', fontSize: '1.2rem', fontWeight: 800, textAlign: 'center' }}
            />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[15, 26, 28, 29, 30, 31, 47, 76, 89].map(val => (
                <button
                  key={val}
                  className="btn-secondary"
                  style={{ padding: '6px 10px', fontSize: '0.78rem', borderRadius: '14px' }}
                  onClick={() => { setMod7Input(val); setSelectedMod7(null); }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Option Buttons: 0 to 6 */}
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
            Select remainder option (matches Day Code):
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '16px' }}>
            {[1, 2, 3, 4, 5, 6, 0].map(opt => {
              const isSelected = selectedMod7 === opt;
              const isRight = isSelected && opt === actualMod7;
              const isWrong = isSelected && opt !== actualMod7;

              return (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedMod7(opt);
                    if (opt === actualMod7) confetti({ particleCount: 50, spread: 60 });
                  }}
                  style={{
                    padding: '12px 4px',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)',
                    background: isRight ? 'var(--accent-green-bright)' : isWrong ? 'var(--accent-red)' : 'var(--surface-2)',
                    color: (isRight || isWrong) ? '#ffffff' : 'var(--text-main)',
                    boxShadow: isRight ? '0 0 14px rgba(63, 185, 80, 0.4)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Mathematical Proof */}
          <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-indigo)' }}>
            <div style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: '4px', color: 'var(--accent-indigo)' }}>
              Mathematical Proof:
            </div>
            <div className="mono" style={{ fontSize: '0.95rem', marginBottom: '6px' }}>
              {n7} = (7 × {quotient7}) + <strong style={{ color: 'var(--accent-green-bright)' }}>{actualMod7}</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {n7} days consists of <strong>{quotient7} full weeks</strong> and <strong>{actualMod7} odd days</strong>.
              Remainder <strong>{actualMod7}</strong> corresponds to <strong>{DAY_MAP[actualMod7]}</strong>!
            </p>
          </div>
        </div>

        {/* CARD 2: MODULO 4 & DIV 4 */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span className="badge badge-amber">Tool 2: Modulo 4 & Div 4</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Leap Year Quotient</span>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>
            Find {mod4Input || 0} mod 4 & ({mod4Input || 0} ÷ 4)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Enter the last 2 digits of the year to test if it's a leap year and how many leap years have accumulated:
          </p>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
            <input
              type="number"
              className="mono"
              value={mod4Input}
              onChange={(e) => { setMod4Input(e.target.value); setSelectedMod4(null); }}
              style={{ width: '120px', padding: '10px 14px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: '#fff', fontSize: '1.2rem', fontWeight: 800, textAlign: 'center' }}
            />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[0, 24, 47, 50, 72, 84, 96, 99].map(val => (
                <button
                  key={val}
                  className="btn-secondary"
                  style={{ padding: '6px 10px', fontSize: '0.78rem', borderRadius: '14px' }}
                  onClick={() => { setMod4Input(val); setSelectedMod4(null); }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Option Buttons: 0 to 3 */}
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
            Select remainder option (0 = Leap Year):
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {[0, 1, 2, 3].map(opt => {
              const isSelected = selectedMod4 === opt;
              const isRight = isSelected && opt === actualMod4;
              const isWrong = isSelected && opt !== actualMod4;

              return (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedMod4(opt);
                    if (opt === actualMod4) confetti({ particleCount: 50, spread: 60 });
                  }}
                  style={{
                    padding: '12px 6px',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '1rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)',
                    background: isRight ? 'var(--accent-green-bright)' : isWrong ? 'var(--accent-red)' : 'var(--surface-2)',
                    color: (isRight || isWrong) ? '#ffffff' : 'var(--text-main)',
                    boxShadow: isRight ? '0 0 14px rgba(63, 185, 80, 0.4)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {opt} {opt === 0 ? '✨ Leap' : ''}
                </button>
              );
            })}
          </div>

          {/* Mathematical Proof */}
          <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-amber)' }}>
            <div style={{ fontWeight: 800, fontSize: '0.92rem', marginBottom: '4px', color: 'var(--accent-amber)' }}>
              Step 5 Leap Year Value (Quotient):
            </div>
            <div className="mono" style={{ fontSize: '0.95rem', marginBottom: '6px' }}>
              {n4} ÷ 4 = <strong style={{ color: 'var(--accent-indigo)', fontSize: '1.1rem' }}>{quotient4}</strong> leap years accumulated
            </div>
            <div style={{ fontSize: '0.82rem', color: actualMod4 === 0 ? 'var(--accent-green-bright)' : 'var(--text-muted)', fontWeight: 600 }}>
              {actualMod4 === 0 ? '✅ Remainder is 0: Year is divisible by 4 (Leap Year).' : `ℹ️ Remainder is ${actualMod4}: Year is not divisible by 4.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
