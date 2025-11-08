import React from 'react';
import { Home, LineChart, Calculator } from 'lucide-react';

export default function NavBar({ onNavigate, active }) {
  const items = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'market', label: 'Market', icon: LineChart },
    { key: 'tools', label: 'Tools', icon: Calculator },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center gap-6">
        <div className="text-sm font-semibold text-white/80">IPO Analyser</div>
        <div className="flex items-center gap-1 text-sm">
          {items.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${active === key ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
