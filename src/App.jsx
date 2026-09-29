import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LecturePage from './components/LecturePage';
import CalculationPage from './components/CalculationPage';
import TestPage from './components/TestPage';
import ModuloPlayground from './components/ModuloPlayground';

export default function App() {
  const [activeTab, setActiveTab] = useState('lecture'); // 'lecture' | 'calculation' | 'tests' | 'modulo'
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Pages */}
      <main>
        {activeTab === 'lecture' && (
          <LecturePage onOpenCalculator={() => setActiveTab('calculation')} />
        )}

        {activeTab === 'calculation' && (
          <CalculationPage />
        )}

        {activeTab === 'tests' && (
          <TestPage />
        )}

        {activeTab === 'modulo' && (
          <ModuloPlayground />
        )}
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
        <p>
          Calendars Quant & Reasoning Department • Session 07 Interactive Curriculum • Built with React & Vite
        </p>
      </footer>
    </div>
  );
}
