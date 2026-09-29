import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Calculator, Sparkles, CheckCircle2, XCircle, ArrowRight, Lightbulb, RefreshCw } from 'lucide-react';

// Exact codes requested by user:
// Jan: 1, Feb: 4, Mar: 4, Apr: 0, May: 2, June: 5, July: 0, Aug: 3, Sep: 6, Oct: 1, Nov: 4, Dec: 6
// For Leap Year: Jan: 0, Feb: 3
const MONTHS = [
  { name: 'January', val: 1, normalCode: 1, leapCode: 0, days: 31 },
  { name: 'February', val: 2, normalCode: 4, leapCode: 3, days: 28 },
  { name: 'March', val: 3, normalCode: 4, leapCode: 4, days: 31 },
  { name: 'April', val: 4, normalCode: 0, leapCode: 0, days: 30 },
  { name: 'May', val: 5, normalCode: 2, leapCode: 2, days: 31 },
  { name: 'June', val: 6, normalCode: 5, leapCode: 5, days: 30 },
  { name: 'July', val: 7, normalCode: 0, leapCode: 0, days: 31 },
  { name: 'August', val: 8, normalCode: 3, leapCode: 3, days: 31 },
  { name: 'September', val: 9, normalCode: 6, leapCode: 6, days: 30 },
  { name: 'October', val: 10, normalCode: 1, leapCode: 1, days: 31 },
  { name: 'November', val: 11, normalCode: 4, leapCode: 4, days: 30 },
  { name: 'December', val: 12, normalCode: 6, leapCode: 6, days: 31 }
];

// Exact Day codes: Sun - 1, Mon - 2, Tue - 3, Wed - 4, Thu - 5, Fri - 6, Sat - 0
const DAYS = [
  { code: 1, name: 'Sunday', emoji: '☀️' },
  { code: 2, name: 'Monday', emoji: '🌙' },
  { code: 3, name: 'Tuesday', emoji: '🔥' },
  { code: 4, name: 'Wednesday', emoji: '💧' },
  { code: 5, name: 'Thursday', emoji: '⚡' },
  { code: 6, name: 'Friday', emoji: '✨' },
  { code: 0, name: 'Saturday', emoji: '🪐' }
];

const PRESETS = [
  { label: '🇮🇳 15 Aug 1947', day: 15, month: 8, year: 1947, knownDay: 'Friday' },
  { label: '🇮🇳 26 Jan 1950', day: 26, month: 1, year: 1950, knownDay: 'Thursday' },
  { label: '🕊️ 2 Oct 1869', day: 2, month: 10, year: 1869, knownDay: 'Saturday' },
  { label: '⚡ 29 Feb 2024', day: 29, month: 2, year: 2024, knownDay: 'Thursday' },
  { label: '📌 Today', day: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear(), knownDay: '' }
];

export default function CalculationPage() {
  const [inputDay, setInputDay] = useState(15);
  const [inputMonth, setInputMonth] = useState(8);
  const [inputYear, setInputYear] = useState(1947);
  const [userGuessedDay, setUserGuessedDay] = useState(null);

  // Interactive In-Calculation Modulo State
  const [selectedTotalMod7, setSelectedTotalMod7] = useState(null);
  const [selectedYearMod4, setSelectedYearMod4] = useState(null);
  const [selectedDateMod7, setSelectedDateMod7] = useState(null);

  // Leap year helper
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // Exact Century Codes:
  // 1500-1599: 0
  // 1600-1699: 6
  // 1700-1799: 4
  // 1800-1899: 2
  // 1900-1999: 0
  // 2000-2099: 6
  // 2100-2199: 4
  // 2200-2299: 2
  const getCenturyCode = (year) => {
    const century = Math.floor(year / 100);
    const rem = century % 4;
    if (rem === 0) return 6; // 1600, 2000, 2400
    if (rem === 1) return 4; // 1700, 2100
    if (rem === 2) return 2; // 1800, 2200
    return 0;               // 1500, 1900, 2300
  };

  // Main Calculation using the requested codes
  const calc = useMemo(() => {
    const d = parseInt(inputDay, 10) || 1;
    const m = parseInt(inputMonth, 10) || 1;
    const y = parseInt(inputYear, 10) || 2000;

    const leap = isLeapYear(y);
    const monthObj = MONTHS[m - 1] || MONTHS[0];
    const monthCode = (leap && (m === 1 || m === 2)) ? monthObj.leapCode : monthObj.normalCode;
    const centuryCode = getCenturyCode(y);
    const last2Digits = y % 100;
    const leapYearsInLast2 = Math.floor(last2Digits / 4);

    // Sum formula
    const totalSum = d + monthCode + centuryCode + last2Digits + leapYearsInLast2;
    const remainder = totalSum % 7;
    const quotient = Math.floor(totalSum / 7);
    
    // In this code system: 1=Sun, 2=Mon, 3=Tue, 4=Wed, 5=Thu, 6=Fri, 0=Sat
    const actualDay = DAYS.find(day => day.code === remainder)?.name || 'Saturday';

    // Sub-mod calculations
    const dateMod7 = d % 7;
    const last2Mod7 = last2Digits % 7;
    const last2Mod4 = last2Digits % 4;
    const leapsMod7 = leapYearsInLast2 % 7;
    const sumOfMods = dateMod7 + monthCode + centuryCode + last2Mod7 + leapsMod7;
    const proRemainder = sumOfMods % 7;

    return {
      d,
      m,
      y,
      monthName: monthObj.name,
      leap,
      monthCode,
      centuryCode,
      last2Digits,
      leapYearsInLast2,
      totalSum,
      remainder,
      quotient,
      actualDay,
      dateMod7,
      last2Mod7,
      last2Mod4,
      leapsMod7,
      sumOfMods,
      proRemainder
    };
  }, [inputDay, inputMonth, inputYear]);

  // Handle Confetti
  useEffect(() => {
    if (userGuessedDay === calc.actualDay) {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
  }, [userGuessedDay, calc.actualDay]);

  const handleSelectPreset = (p) => {
    setInputDay(p.day);
    setInputMonth(p.month);
    setInputYear(p.year);
    setUserGuessedDay(p.knownDay || null);
    setSelectedTotalMod7(null);
    setSelectedYearMod4(null);
    setSelectedDateMod7(null);
  };

  return (
    <div>
      {/* Code System Notification Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(99, 102, 241, 0.15))',
        border: '1px solid rgba(234, 179, 8, 0.4)',
        padding: '12px 18px',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>⚡</span>
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Using Specific Calendar Codes: Month (<strong>144 025 036 146</strong>) • Century (<strong>6, 4, 2, 0</strong>) • Day (<strong>Sun=1 to Sat=0</strong>)
          </span>
        </div>
        <span className="badge badge-amber">Active Standard</span>
      </div>

      {/* Input Card */}
      <div className="glass-card">
        <div className="card-header">
          <div className="badge badge-indigo">Aptitude Calculation Studio</div>
          <h2 className="card-title" style={{ marginTop: '8px' }}>
            <Calculator size={22} color="var(--accent-indigo)" />
            <span>Interactive Calendar Calculator & Modulo Solver</span>
          </h2>
          <p className="card-subtitle">
            Enter any date, select what day you think it is using the options buttons, and check the complete breakdown with live Mod 7 and Mod 4 options!
          </p>
        </div>

        {/* Presets */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>Famous Presets:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              className="btn-secondary"
              style={{ padding: '4px 12px', fontSize: '0.82rem', borderRadius: '20px' }}
              onClick={() => handleSelectPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Day of Month (Date)
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={inputDay}
              onChange={(e) => { setInputDay(e.target.value); setUserGuessedDay(null); setSelectedTotalMod7(null); }}
              style={{ width: '100%', padding: '10px 14px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '1rem', fontWeight: 700 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Month
            </label>
            <select
              value={inputMonth}
              onChange={(e) => { setInputMonth(Number(e.target.value)); setUserGuessedDay(null); setSelectedTotalMod7(null); }}
              style={{ width: '100%', padding: '10px 14px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '1rem', fontWeight: 700 }}
            >
              {MONTHS.map(m => (
                <option key={m.val} value={m.val}>
                  {m.val}. {m.name} (Code: {m.normalCode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Year (YYYY)
            </label>
            <input
              type="number"
              min="1"
              max="9999"
              value={inputYear}
              onChange={(e) => { setInputYear(e.target.value); setUserGuessedDay(null); setSelectedTotalMod7(null); }}
              style={{ width: '100%', padding: '10px 14px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '1rem', fontWeight: 700 }}
            />
          </div>
        </div>

        {/* Day Guess Options Row */}
        <div style={{ background: 'var(--surface-2)', padding: '16px 20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-indigo)' }}>
              🎯 Student Challenge: What day is {calc.d} {calc.monthName} {calc.y}?
            </h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Click an option button to guess!
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
            {DAYS.map(d => {
              const isSelected = userGuessedDay === d.name;
              return (
                <button
                  key={d.code}
                  onClick={() => setUserGuessedDay(d.name)}
                  style={{
                    background: isSelected ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))' : 'var(--surface-1)',
                    border: isSelected ? '2px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    padding: '12px 6px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    boxShadow: isSelected ? '0 0 14px rgba(99, 102, 241, 0.35)' : 'none'
                  }}
                >
                  <div>{d.emoji} {d.name}</div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Code: {d.code}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Guess Validation Result Banner */}
        {userGuessedDay && (
          <div style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            background: userGuessedDay === calc.actualDay ? 'rgba(46, 160, 67, 0.15)' : 'rgba(248, 81, 73, 0.15)',
            border: `1px solid ${userGuessedDay === calc.actualDay ? 'var(--accent-green-bright)' : 'var(--accent-red)'}`
          }}>
            {userGuessedDay === calc.actualDay ? (
              <CheckCircle2 size={32} color="var(--accent-green-bright)" style={{ flexShrink: 0 }} />
            ) : (
              <XCircle size={32} color="var(--accent-red)" style={{ flexShrink: 0 }} />
            )}
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: userGuessedDay === calc.actualDay ? 'var(--accent-green-bright)' : 'var(--accent-red)', marginBottom: '2px' }}>
                {userGuessedDay === calc.actualDay
                  ? `Spot On! ${calc.actualDay} is 100% Correct!`
                  : `Incorrect! You chose ${userGuessedDay}, but the correct day is ${calc.actualDay}.`}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                {userGuessedDay === calc.actualDay
                  ? `Your day matches remainder ${calc.remainder}! Review the step-by-step breakdown below.`
                  : `Follow the step-by-step breakdown below to see how remainder ${calc.remainder} maps to ${calc.actualDay}.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* STEP-BY-STEP CALCULATION ENGINE */}
      <div className="glass-card">
        <div className="card-header">
          <div className="badge badge-green">Standard Aptitude Method</div>
          <h2 className="card-title" style={{ marginTop: '8px' }}>
            Aptitude Formula Breakdown: Date + Month Code + Century Code + Last 2 Digits + Leap Years
          </h2>
          <p className="card-subtitle">
            Using your exact codes: Month Code (<strong>{calc.monthCode}</strong>), Century Code (<strong>{calc.centuryCode}</strong>), and Day mapping (<strong>Code {calc.remainder} → {calc.actualDay}</strong>).
          </p>
        </div>

        {/* Master Formula Equation Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(56, 139, 253, 0.12))',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          padding: '18px 24px',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-indigo)', fontWeight: 800, marginBottom: '8px' }}>
            Official Aptitude Formula
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', fontSize: '1.05rem', fontWeight: 700 }}>
            <span>Day Code = (</span>
            <span style={{ background: 'rgba(56, 139, 253, 0.25)', color: '#58a6ff', padding: '2px 8px', borderRadius: '4px' }}>Date: {calc.d}</span>
            <span>+</span>
            <span style={{ background: 'rgba(168, 85, 247, 0.25)', color: '#c084fc', padding: '2px 8px', borderRadius: '4px' }}>Month Code: {calc.monthCode}</span>
            <span>+</span>
            <span style={{ background: 'rgba(234, 179, 8, 0.25)', color: '#facc15', padding: '2px 8px', borderRadius: '4px' }}>Century Code: {calc.centuryCode}</span>
            <span>+</span>
            <span style={{ background: 'rgba(20, 184, 166, 0.25)', color: '#2dd4bf', padding: '2px 8px', borderRadius: '4px' }}>Last 2 Digits: {calc.last2Digits}</span>
            <span>+</span>
            <span style={{ background: 'rgba(244, 63, 94, 0.25)', color: '#fb7185', padding: '2px 8px', borderRadius: '4px' }}>Leap Years: {calc.leapYearsInLast2}</span>
            <span>)</span>
            <span className="mono" style={{ color: 'var(--accent-indigo)', fontWeight: 800, fontSize: '1.2rem' }}>÷ 7</span>
          </div>
        </div>

        {/* 5 Distinct Step Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {/* Step 1: Date */}
          <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="badge" style={{ background: 'rgba(56, 139, 253, 0.2)', color: '#58a6ff' }}>Step 1</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date</span>
            </div>
            <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>{calc.d}</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 12px' }}>
              Take the calendar day of the month directly: <strong>{calc.d}</strong>.
            </p>
            <div style={{ background: 'var(--surface-1)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', border: '1px dashed var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{calc.d} mod 7:</span>
              <span className="mono" style={{ fontWeight: 800, color: 'var(--accent-indigo)' }}>{calc.dateMod7}</span>
            </div>
          </div>

          {/* Step 2: Month Code */}
          <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>Step 2</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Month Code</span>
            </div>
            <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>{calc.monthCode}</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 12px' }}>
              For <strong>{calc.monthName}</strong>: {calc.leap && (calc.m === 1 || calc.m === 2) ? (
                <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>⚠️ Leap Year Code ({calc.monthCode}) used!</span>
              ) : (
                <span>Standard code is <strong>{calc.monthCode}</strong>.</span>
              )}
            </p>
            <div style={{ background: 'var(--surface-1)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', border: '1px dashed var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Code (144 025 036 146):</span>
              <span className="mono" style={{ fontWeight: 800, color: 'var(--accent-purple)' }}>Code = {calc.monthCode}</span>
            </div>
          </div>

          {/* Step 3: Century Code */}
          <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="badge" style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#facc15' }}>Step 3</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Century Code</span>
            </div>
            <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>{calc.centuryCode}</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 12px' }}>
              For <strong>{Math.floor(calc.y / 100)}00–{Math.floor(calc.y / 100)}99</strong>: Century code is <strong>{calc.centuryCode}</strong>.
            </p>
            <div style={{ background: 'var(--surface-1)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', border: '1px dashed var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Cycle (1600:6, 1700:4, 1800:2, 1900:0, 2000:6):</span>
              <span className="mono" style={{ fontWeight: 800, color: 'var(--accent-amber)' }}>Code = {calc.centuryCode}</span>
            </div>
          </div>

          {/* Step 4: Last 2 Digits */}
          <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="badge" style={{ background: 'rgba(20, 184, 166, 0.2)', color: '#2dd4bf' }}>Step 4</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last 2 Digits (YY)</span>
            </div>
            <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>{calc.last2Digits}</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 12px' }}>
              The last two digits of year {calc.y} is <strong>{calc.last2Digits}</strong>.
            </p>
            <div style={{ background: 'var(--surface-1)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', border: '1px dashed var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{calc.last2Digits} mod 7:</span>
              <span className="mono" style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>{calc.last2Mod7}</span>
            </div>
          </div>

          {/* Step 5: Leap Years in Last 2 Digits */}
          <div style={{ background: 'var(--surface-2)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="badge" style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#fb7185' }}>Step 5</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Leap Years (÷ 4)</span>
            </div>
            <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>{calc.leapYearsInLast2}</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 12px' }}>
              Divide {calc.last2Digits} by 4: <strong>{calc.last2Digits} ÷ 4 = {calc.leapYearsInLast2}</strong> (Quotient).
            </p>
            <div style={{ background: 'var(--surface-1)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', border: '1px dashed var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{calc.leapYearsInLast2} mod 7:</span>
              <span className="mono" style={{ fontWeight: 800, color: 'var(--accent-red)' }}>{calc.leapsMod7}</span>
            </div>
          </div>
        </div>

        {/* IN-CALCULATION MODULO 7 & MODULO 4 INTERACTIVE OPTION BUTTONS */}
        <div style={{
          background: 'var(--surface-2)',
          border: '2px dashed var(--accent-indigo)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sparkles size={22} color="var(--accent-indigo)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              Live Modulo Practice: Test Mod 7 and Mod 4 via Option Buttons
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {/* Practice 1: Total Sum Mod 7 */}
            <div style={{ background: 'var(--surface-1)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '4px', color: 'var(--accent-indigo)' }}>
                1. What is the Grand Sum ({calc.totalSum}) mod 7?
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Select the remainder option button:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '10px' }}>
                {[0, 1, 2, 3, 4, 5, 6].map(opt => {
                  const isSelected = selectedTotalMod7 === opt;
                  const isRight = isSelected && opt === calc.remainder;
                  const isWrong = isSelected && opt !== calc.remainder;

                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedTotalMod7(opt);
                        if (opt === calc.remainder) confetti({ particleCount: 50, spread: 60 });
                      }}
                      style={{
                        padding: '10px 4px',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'JetBrains Mono',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        border: '1px solid var(--border-color)',
                        background: isRight ? 'var(--accent-green-bright)' : isWrong ? 'var(--accent-red)' : 'var(--surface-2)',
                        color: (isRight || isWrong) ? '#ffffff' : 'var(--text-main)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedTotalMod7 !== null && (
                <div style={{
                  fontSize: '0.85rem',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: selectedTotalMod7 === calc.remainder ? 'rgba(63, 185, 80, 0.15)' : 'rgba(248, 81, 73, 0.15)',
                  color: selectedTotalMod7 === calc.remainder ? 'var(--accent-green-bright)' : 'var(--accent-red)',
                  fontWeight: 600
                }}>
                  {selectedTotalMod7 === calc.remainder
                    ? `✅ Correct! ${calc.totalSum} ÷ 7 leaves Remainder ${calc.remainder} (Day Code ${calc.remainder} = ${calc.actualDay})`
                    : `❌ Not quite! ${calc.totalSum} = (7 × ${calc.quotient}) + ${calc.remainder}. Remainder is ${calc.remainder}.`}
                </div>
              )}
            </div>

            {/* Practice 2: Last 2 Digits Mod 4 (Is it Leap?) */}
            <div style={{ background: 'var(--surface-1)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '4px', color: 'var(--accent-red)' }}>
                2. What is Last 2 Digits ({calc.last2Digits}) mod 4?
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Select remainder option (0 means Leap Year!):
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px' }}>
                {[0, 1, 2, 3].map(opt => {
                  const isSelected = selectedYearMod4 === opt;
                  const isRight = isSelected && opt === calc.last2Mod4;
                  const isWrong = isSelected && opt !== calc.last2Mod4;

                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedYearMod4(opt);
                        if (opt === calc.last2Mod4) confetti({ particleCount: 50, spread: 60 });
                      }}
                      style={{
                        padding: '10px 4px',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'JetBrains Mono',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        border: '1px solid var(--border-color)',
                        background: isRight ? 'var(--accent-green-bright)' : isWrong ? 'var(--accent-red)' : 'var(--surface-2)',
                        color: (isRight || isWrong) ? '#ffffff' : 'var(--text-main)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt} {opt === 0 ? '🌟 Leap' : ''}
                    </button>
                  );
                })}
              </div>

              {selectedYearMod4 !== null && (
                <div style={{
                  fontSize: '0.85rem',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: selectedYearMod4 === calc.last2Mod4 ? 'rgba(63, 185, 80, 0.15)' : 'rgba(248, 81, 73, 0.15)',
                  color: selectedYearMod4 === calc.last2Mod4 ? 'var(--accent-green-bright)' : 'var(--accent-red)',
                  fontWeight: 600
                }}>
                  {selectedYearMod4 === calc.last2Mod4
                    ? `✅ Correct! ${calc.last2Digits} mod 4 = ${calc.last2Mod4}. (${calc.last2Mod4 === 0 ? 'Divisible by 4 (Leap year)' : `Not leap, ${calc.last2Mod4} year(s) after leap`})`
                    : `❌ Not quite! ${calc.last2Digits} ÷ 4 leaves Remainder ${calc.last2Mod4}.`}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calculation Total & Final Division Result Box */}
        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>
                Step 6: Compute Grand Total
              </span>
              <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>
                {calc.d} + {calc.monthCode} + {calc.centuryCode} + {calc.last2Digits} + {calc.leapYearsInLast2} = <span style={{ color: 'var(--accent-indigo)' }}>{calc.totalSum}</span>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-purple))', color: '#fff', padding: '8px 20px', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '1.3rem' }}>
              Sum = {calc.totalSum}
            </div>
          </div>

          <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800 }}>
            Step 7: Final Division by 7 & Day Code Mapping
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '12px' }}>
            <div style={{ background: 'var(--surface-1)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Division</div>
              <div className="mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-muted)', marginTop: '4px' }}>
                {calc.totalSum} ÷ 7
              </div>
            </div>

            <div style={{ background: 'var(--surface-1)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Quotient (Complete Weeks)</div>
              <div className="mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                {calc.quotient} weeks
              </div>
            </div>

            <div style={{ background: 'var(--surface-1)', padding: '16px', borderRadius: 'var(--radius-md)', border: '2px solid var(--accent-green-bright)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-green-bright)', fontWeight: 800 }}>Remainder (Day Code)</div>
              <div className="mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-green-bright)', marginTop: '2px' }}>
                {calc.remainder}
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-indigo)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-indigo)', fontWeight: 800 }}>Final Day (Code {calc.remainder})</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-purple)', marginTop: '4px' }}>
                🎉 {calc.actualDay}
              </div>
            </div>
          </div>

          {/* Pro Mental Math Shortcut */}
          <div style={{ marginTop: '20px', padding: '16px 20px', borderRadius: 'var(--radius-lg)', background: 'rgba(35, 134, 54, 0.1)', border: '1px solid rgba(46, 160, 67, 0.3)' }}>
            <h4 style={{ color: 'var(--accent-green-bright)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Lightbulb size={20} />
              <span>Aptitude Pro Trick: Mod 7 Reduction Shortcut</span>
            </h4>
            <p style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
              Instead of adding large numbers: {calc.d} + {calc.monthCode} + {calc.centuryCode} + {calc.last2Digits} + {calc.leapYearsInLast2} = {calc.totalSum}, reduce each component mod 7 first!
              <br />
              • Date: {calc.d} mod 7 = <strong>{calc.dateMod7}</strong> &nbsp;|&nbsp;
              Month = <strong>{calc.monthCode}</strong> &nbsp;|&nbsp;
              Century = <strong>{calc.centuryCode}</strong> &nbsp;|&nbsp;
              Year: {calc.last2Digits} mod 7 = <strong>{calc.last2Mod7}</strong> &nbsp;|&nbsp;
              Leap Years: {calc.leapYearsInLast2} mod 7 = <strong>{calc.leapsMod7}</strong>
              <br />
              <strong>Quick Sum:</strong> {calc.dateMod7} + {calc.monthCode} + {calc.centuryCode} + {calc.last2Mod7} + {calc.leapsMod7} = <strong>{calc.sumOfMods}</strong>
              <br />
              <strong>{calc.sumOfMods} mod 7 = <span style={{ color: 'var(--accent-green-bright)', fontWeight: 800 }}>{calc.proRemainder}</span> (Code {calc.proRemainder} → {calc.actualDay})</strong>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
