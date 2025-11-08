import React, { useState } from 'react';
import { SlidersHorizontal, Calculator, TrendingUp } from 'lucide-react';

const peerFields = [
  { key: 'evEbitda', label: 'EV/EBITDA' },
  { key: 'pe', label: 'P/E' },
  { key: 'pb', label: 'P/BV' },
];

export default function CompsSelector({ onChange }) {
  const [multiples, setMultiples] = useState({ evEbitda: true, pe: true, pb: true });
  const [growth, setGrowth] = useState(15);

  function toggle(key) {
    const next = { ...multiples, [key]: !multiples[key] };
    setMultiples(next);
    onChange?.({ multiples: next, growth });
  }

  function handleGrowth(val) {
    const g = Number(val);
    setGrowth(g);
    onChange?.({ multiples, growth: g });
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-900/50 p-4 sm:p-6 backdrop-blur">
      <div className="flex items-center gap-2 mb-4 text-slate-200">
        <SlidersHorizontal className="w-5 h-5" />
        <h3 className="font-semibold">Comparable Company Analysis</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {peerFields.map(f => (
          <label key={f.key} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 ring-1 ring-white/10 text-slate-200">
            <input
              type="checkbox"
              checked={multiples[f.key]}
              onChange={() => toggle(f.key)}
              className="h-4 w-4 accent-emerald-500"
            />
            <span>{f.label}</span>
          </label>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2 text-slate-200 mb-2">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm">Projected Annual Growth (%)</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={growth}
          onChange={(e) => handleGrowth(e.target.value)}
          className="w-full"
        />
        <div className="mt-1 text-xs text-slate-400">{growth}% CAGR used for premium validation</div>
      </div>

      <div className="mt-5 text-xs text-slate-400 flex items-center gap-2">
        <Calculator className="w-4 h-4" />
        Toggle peer multiples and adjust growth to validate premium vs. fundamentals.
      </div>
    </div>
  );
}
