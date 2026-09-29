import React from 'react';
import { BookOpen, Calculator, CheckSquare, Sparkles, Sun, Moon, Calendar } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, setTheme }) {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <div className="brand-badge">
          <Calendar size={24} />
        </div>
        <div className="brand-text">
          <h1>Aptitude Calendar Master</h1>
          <p>Quantitative Aptitude & Reasoning • Calendar Concepts, Modulo & Exams</p>
        </div>
      </div>

      <nav className="nav-links">
        <button
          className={`nav-tab-btn ${activeTab === 'lecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('lecture')}
        >
          <BookOpen size={18} />
          <span>Lecture Notes</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'calculation' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculation')}
        >
          <Calculator size={18} />
          <span>Date & Modulo Solver</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          <CheckSquare size={18} />
          <span>Practice Test & Mistakes</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'modulo' ? 'active' : ''}`}
          onClick={() => setActiveTab('modulo')}
        >
          <Sparkles size={18} />
          <span>Mod 7 & 4 Lab</span>
        </button>
      </nav>

      <div>
        <button
          className="theme-btn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
}
