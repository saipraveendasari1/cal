import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  Sparkles,
  HelpCircle,
  Eye,
  Filter
} from 'lucide-react';
import questionsData from '../data/questions.json';

export default function TestPage() {
  const [testState, setTestState] = useState('setup'); // 'setup' | 'running' | 'results'
  const [testQuestions, setTestQuestions] = useState([]);
  const [testLength, setTestLength] = useState(10); // 10, 15, or 25
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedIndex }
  const [markedForReview, setMarkedForReview] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showInTestScratchpad, setShowInTestScratchpad] = useState(false);
  const [scratchModNum, setScratchModNum] = useState(47);

  // Results Review State
  const [reviewFilter, setReviewFilter] = useState('mistakes'); // 'mistakes' | 'all' | 'correct'

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (testState === 'running' && isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testState, isTimerRunning]);

  // Start Test
  const handleStartTest = (count) => {
    const totalAvailable = questionsData.length;
    let selected = [];
    if (count >= totalAvailable) {
      selected = [...questionsData];
    } else {
      // Shuffle and pick `count` questions
      const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
      selected = shuffled.slice(0, count);
    }

    setTestQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setMarkedForReview({});
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setTestState('running');
  };

  // Re-attempt only mistakes
  const handleReattemptMistakes = (mistakeQuestions) => {
    setTestQuestions(mistakeQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setMarkedForReview({});
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setTestState('running');
  };

  // Submit Test
  const handleSubmitTest = () => {
    setIsTimerRunning(false);
    setTestState('results');

    // Calculate score for confetti
    const score = testQuestions.filter(q => answers[q.id] === q.correctIndex).length;
    if (score / testQuestions.length >= 0.7) {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    }
  };

  // Format Timer
  const formatTime = (totalSec) => {
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Score stats
  const correctCount = testQuestions.filter(q => answers[q.id] === q.correctIndex).length;
  const mistakeQuestions = testQuestions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correctIndex);
  const unattemptedQuestions = testQuestions.filter(q => answers[q.id] === undefined);
  const totalQuestions = testQuestions.length;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Filtered review questions
  const filteredReviewQuestions = testQuestions.filter(q => {
    const isCorrect = answers[q.id] === q.correctIndex;
    if (reviewFilter === 'mistakes') return !isCorrect;
    if (reviewFilter === 'correct') return isCorrect;
    return true; // 'all'
  });

  return (
    <div>
      {/* 1. SETUP SCREEN */}
      {testState === 'setup' && (
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '36px 24px' }}>
          <div className="badge badge-indigo" style={{ marginBottom: '12px' }}>
            Exam Testing Portal
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
            Calendar Aptitude Practice Exam
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 28px', lineHeight: '1.6' }}>
            Test your skills on authentic questions from the Quantitative Reasoning curriculum. At the end, you will receive a detailed mistake analysis with step-by-step solutions!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <div 
              onClick={() => setTestLength(10)}
              style={{
                background: testLength === 10 ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))' : 'var(--surface-2)',
                border: testLength === 10 ? '2px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-indigo)', marginBottom: '4px' }}>
                10 Questions
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                ⚡ Quick Speed Test (~8 mins)
              </div>
            </div>

            <div 
              onClick={() => setTestLength(15)}
              style={{
                background: testLength === 15 ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))' : 'var(--surface-2)',
                border: testLength === 15 ? '2px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-purple)', marginBottom: '4px' }}>
                15 Questions
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                🎯 Standard Mock Exam (~12 mins)
              </div>
            </div>

            <div 
              onClick={() => setTestLength(25)}
              style={{
                background: testLength === 25 ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))' : 'var(--surface-2)',
                border: testLength === 25 ? '2px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green-bright)', marginBottom: '4px' }}>
                All 25 Questions
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                🏆 Full Lecture Question Bank
              </div>
            </div>
          </div>

          <button 
            className="btn-primary"
            style={{ padding: '14px 36px', fontSize: '1.1rem' }}
            onClick={() => handleStartTest(testLength)}
          >
            <span>Start Test Now</span>
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* 2. RUNNING TEST SCREEN */}
      {testState === 'running' && testQuestions.length > 0 && (
        <div>
          {/* Test Status Bar */}
          <div className="glass-card" style={{ padding: '14px 20px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="badge badge-indigo">
                  Question {currentIndex + 1} of {testQuestions.length}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Answered: <strong>{Object.keys(answers).length}</strong> / {testQuestions.length}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-2)', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                  <Clock size={16} color="var(--accent-amber)" />
                  <span className="mono" style={{ fontWeight: 800, color: 'var(--accent-amber)' }}>
                    {formatTime(timerSeconds)}
                  </span>
                </div>

                <button
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                  onClick={() => setShowInTestScratchpad(!showInTestScratchpad)}
                >
                  ⚡ Mod Scratchpad
                </button>

                <button
                  className="btn-primary"
                  style={{ background: 'var(--accent-green)', padding: '8px 18px', fontSize: '0.88rem' }}
                  onClick={handleSubmitTest}
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>

          {/* Quick Scratchpad Modal / Box if open */}
          {showInTestScratchpad && (
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--accent-indigo)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>
                  💡 Quick In-Test Modulo Helper
                </div>
                <button
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
                  onClick={() => setShowInTestScratchpad(false)}
                >
                  Close ✕
                </button>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  type="number"
                  value={scratchModNum}
                  onChange={(e) => setScratchModNum(Number(e.target.value))}
                  style={{ width: '90px', padding: '6px 10px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff', fontWeight: 700 }}
                />
                <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  mod 7 = <strong style={{ color: 'var(--accent-green-bright)' }}>{((scratchModNum % 7) + 7) % 7}</strong>
                </span>
                <span style={{ color: 'var(--border-color)' }}>|</span>
                <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  mod 4 = <strong style={{ color: 'var(--accent-amber)' }}>{((scratchModNum % 4) + 4) % 4}</strong>
                </span>
                <span style={{ color: 'var(--border-color)' }}>|</span>
                <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  ÷ 4 (Leap years) = <strong style={{ color: '#fb7185' }}>{Math.floor(scratchModNum / 4)}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Question Card & Palette Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>
            {/* Center Question View */}
            <div className="glass-card" style={{ padding: '28px' }}>
              {(() => {
                const currentQ = testQuestions[currentIndex];
                const selectedOpt = answers[currentQ.id];

                return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                        Question ID #{currentQ.id}
                      </span>
                      <button
                        onClick={() => {
                          setMarkedForReview(prev => ({
                            ...prev,
                            [currentQ.id]: !prev[currentQ.id]
                          }));
                        }}
                        style={{
                          background: markedForReview[currentQ.id] ? 'rgba(210, 153, 34, 0.2)' : 'transparent',
                          color: markedForReview[currentQ.id] ? 'var(--accent-amber)' : 'var(--text-muted)',
                          border: '1px solid var(--border-color)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {markedForReview[currentQ.id] ? '★ Marked for Review' : '☆ Mark for Review'}
                      </button>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: '1.6', marginBottom: '24px' }}>
                      {currentQ.question}
                    </h3>

                    {/* Options (Buttons) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                      {currentQ.options.map((optText, optIdx) => {
                        const isChosen = selectedOpt === optIdx;

                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              setAnswers(prev => ({
                                ...prev,
                                [currentQ.id]: optIdx
                              }));
                            }}
                            style={{
                              background: isChosen ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))' : 'var(--surface-2)',
                              border: isChosen ? '2px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                              color: 'var(--text-main)',
                              padding: '14px 18px',
                              borderRadius: 'var(--radius-md)',
                              textAlign: 'left',
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '14px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: isChosen ? 'var(--accent-indigo)' : 'var(--surface-1)',
                              color: isChosen ? '#ffffff' : 'var(--text-muted)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.85rem',
                              fontWeight: 800,
                              flexShrink: 0
                            }}>
                              {optIdx + 1}
                            </span>
                            <span>{optText}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Navigation Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        className="btn-secondary"
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                        style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
                      >
                        <ChevronLeft size={16} />
                        <span>Previous</span>
                      </button>

                      {selectedOpt !== undefined && (
                        <button
                          style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: '0.82rem', cursor: 'pointer' }}
                          onClick={() => {
                            setAnswers(prev => {
                              const updated = { ...prev };
                              delete updated[currentQ.id];
                              return updated;
                            });
                          }}
                        >
                          Clear Selection
                        </button>
                      )}

                      {currentIndex < testQuestions.length - 1 ? (
                        <button
                          className="btn-primary"
                          onClick={() => setCurrentIndex(i => Math.min(testQuestions.length - 1, i + 1))}
                        >
                          <span>Next Question</span>
                          <ChevronRight size={16} />
                        </button>
                      ) : (
                        <button
                          className="btn-primary"
                          style={{ background: 'var(--accent-green)' }}
                          onClick={handleSubmitTest}
                        >
                          <span>Review & Submit</span>
                          <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Question Navigation Palette */}
            <div className="glass-card" style={{ padding: '18px' }}>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', marginBottom: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Question Palette
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '20px' }}>
                {testQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = answers[q.id] !== undefined;
                  const isMarked = markedForReview[q.id];

                  let bg = 'var(--surface-2)';
                  let border = '1px solid var(--border-color)';
                  let color = 'var(--text-muted)';

                  if (isMarked) {
                    bg = 'rgba(210, 153, 34, 0.25)';
                    border = '1px solid var(--accent-amber)';
                    color = 'var(--accent-amber)';
                  } else if (isAnswered) {
                    bg = 'linear-gradient(135deg, var(--accent-indigo), #7c3aed)';
                    border = '1px solid var(--accent-indigo)';
                    color = '#ffffff';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      style={{
                        background: bg,
                        border: isCurrent ? '2px solid var(--border-focus)' : border,
                        color: color,
                        padding: '8px 0',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transform: isCurrent ? 'scale(1.08)' : 'none',
                        boxShadow: isCurrent ? '0 0 10px rgba(88, 166, 255, 0.4)' : 'none'
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div style={{ fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-indigo)' }} />
                  <span>Answered</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-amber)' }} />
                  <span>Marked for Review</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--surface-2)', border: '1px solid var(--border-color)' }} />
                  <span>Unanswered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TEST RESULTS & DETAILED MISTAKES BREAKDOWN */}
      {testState === 'results' && (
        <div>
          {/* Score Header Card */}
          <div className="glass-card" style={{ padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
            <span className="badge badge-indigo" style={{ marginBottom: '10px' }}>
              Final Test Analytics & Performance
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
              {percentage >= 70 ? '🎉 Exceptional Performance!' : percentage >= 40 ? '👍 Good Effort!' : '📚 Review Required!'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
              Here is the diagnostic breakdown of your calendar aptitude session.
            </p>

            {/* Score Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', maxWidth: '850px', margin: '0 auto 28px' }}>
              <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Final Score</div>
                <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-green-bright)' }}>
                  {correctCount} / {totalQuestions}
                </div>
              </div>

              <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Accuracy</div>
                <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>
                  {percentage}%
                </div>
              </div>

              <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mistakes Made</div>
                <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: mistakeQuestions.length > 0 ? 'var(--accent-red)' : 'var(--accent-green-bright)' }}>
                  {mistakeQuestions.length}
                </div>
              </div>

              <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Time Spent</div>
                <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                  {formatTime(timerSeconds)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              {mistakeQuestions.length > 0 && (
                <button
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                  onClick={() => handleReattemptMistakes(mistakeQuestions)}
                >
                  <RotateCcw size={18} />
                  <span>Re-attempt {mistakeQuestions.length} Incorrect Questions</span>
                </button>
              )}

              <button
                className="btn-secondary"
                onClick={() => setTestState('setup')}
              >
                <span>Take a New Test</span>
              </button>
            </div>
          </div>

          {/* MISTAKES & DETAILED EXPLANATIONS ACCORDION */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  Question-by-Question Review & Solutions
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Study the simple explanations and step-by-step logic to avoid repeating these mistakes in exams.
                </p>
              </div>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: '6px', background: 'var(--surface-2)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
                <button
                  onClick={() => setReviewFilter('mistakes')}
                  style={{
                    background: reviewFilter === 'mistakes' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                    color: reviewFilter === 'mistakes' ? 'var(--accent-red)' : 'var(--text-muted)',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Mistakes Only ({mistakeQuestions.length})
                </button>

                <button
                  onClick={() => setReviewFilter('all')}
                  style={{
                    background: reviewFilter === 'all' ? 'var(--surface-1)' : 'transparent',
                    color: reviewFilter === 'all' ? 'var(--text-main)' : 'var(--text-muted)',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  All Questions ({totalQuestions})
                </button>

                <button
                  onClick={() => setReviewFilter('correct')}
                  style={{
                    background: reviewFilter === 'correct' ? 'rgba(63, 185, 80, 0.2)' : 'transparent',
                    color: reviewFilter === 'correct' ? 'var(--accent-green-bright)' : 'var(--text-muted)',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Correct ({correctCount})
                </button>
              </div>
            </div>

            {/* List of Review Questions */}
            {filteredReviewQuestions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={44} color="var(--accent-green-bright)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>No Mistakes in this category!</h4>
                <p style={{ fontSize: '0.85rem' }}>You answered every question in this filter correctly.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {filteredReviewQuestions.map((q, idx) => {
                  const studentAnsIdx = answers[q.id];
                  const isCorrect = studentAnsIdx === q.correctIndex;
                  const isUnattempted = studentAnsIdx === undefined;

                  return (
                    <div
                      key={q.id}
                      style={{
                        background: 'var(--surface-2)',
                        border: `1px solid ${isCorrect ? 'rgba(63, 185, 80, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '20px',
                        borderLeft: `5px solid ${isCorrect ? 'var(--accent-green-bright)' : 'var(--accent-red)'}`
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                          Question #{q.id}
                        </span>

                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: isCorrect ? 'var(--accent-green-bright)' : 'var(--accent-red)'
                        }}>
                          {isCorrect ? (
                            <>
                              <CheckCircle2 size={16} />
                              <span>Correct</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={16} />
                              <span>{isUnattempted ? 'Unattempted' : 'Incorrect (Mistake)'}</span>
                            </>
                          )}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px', lineHeight: '1.5' }}>
                        {q.question}
                      </h4>

                      {/* Options Comparison */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                        {q.options.map((optText, optIdx) => {
                          const isStudentPick = studentAnsIdx === optIdx;
                          const isRightAnswer = q.correctIndex === optIdx;

                          let bg = 'var(--surface-1)';
                          let border = '1px solid var(--border-color)';
                          let label = null;

                          if (isRightAnswer) {
                            bg = 'rgba(63, 185, 80, 0.15)';
                            border = '2px solid var(--accent-green-bright)';
                            label = <span style={{ color: 'var(--accent-green-bright)', fontWeight: 800, fontSize: '0.75rem' }}>✅ Correct Answer</span>;
                          } else if (isStudentPick && !isRightAnswer) {
                            bg = 'rgba(239, 68, 68, 0.15)';
                            border = '2px solid var(--accent-red)';
                            label = <span style={{ color: 'var(--accent-red)', fontWeight: 800, fontSize: '0.75rem' }}>❌ Your Selection</span>;
                          }

                          return (
                            <div
                              key={optIdx}
                              style={{
                                background: bg,
                                border: border,
                                padding: '10px 14px',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.9rem'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: isRightAnswer || isStudentPick ? 700 : 500 }}>
                                  ({optIdx + 1}) {optText}
                                </span>
                                {label}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Simple Step-by-Step Explanation */}
                      <div style={{
                        background: 'var(--surface-1)',
                        padding: '14px 16px',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '3px solid var(--accent-indigo)',
                        fontSize: '0.88rem',
                        lineHeight: '1.6'
                      }}>
                        <div style={{ fontWeight: 800, color: 'var(--accent-indigo)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Lightbulb size={16} />
                          <span>Simple Answer & Mathematical Explanation:</span>
                        </div>
                        <p style={{ color: 'var(--text-main)' }}>
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
