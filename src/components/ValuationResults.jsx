import React from 'react';
import { Gauge, FileSpreadsheet, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ValuationResults({ results, onExport }) {
  const { targetPrice, medianMultiples, premiumValidated, latencyMs } = results || {};

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-900/50 p-4 sm:p-6 backdrop-blur" id="results">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-200">
          <Gauge className="w-5 h-5" />
          <h3 className="font-semibold">Valuation Results</h3>
        </div>
        <button onClick={onExport} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors">
          <FileSpreadsheet className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Target Price" value={targetPrice ? `$${targetPrice.toFixed(2)}` : '—'} subtitle="Median peer multiple" />
        <Card title="Median Multiples" value={medianMultiples ? formatMultiples(medianMultiples) : '—'} subtitle="EV/EBITDA · P/E · P/BV" />
        <Card title="Latency" value={latencyMs ? `${latencyMs} ms` : '—'} subtitle="NFR ≤ 5000 ms" />
      </div>

      <div className="mt-6">
        {premiumValidated ? (
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            Premium validated against growth projections.
          </div>
        ) : (
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            Premium not justified by projected growth.
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, value, subtitle }) {
  return (
    <div className="rounded-xl p-4 bg-slate-800/60 ring-1 ring-white/10">
      <div className="text-slate-400 text-xs">{title}</div>
      <div className="text-slate-100 text-2xl font-bold mt-1">{value}</div>
      <div className="text-slate-500 text-xs mt-1">{subtitle}</div>
    </div>
  );
}

function formatMultiples(m) {
  return `EV/EBITDA ${m.evEbitda?.toFixed?.(1) ?? m.evEbitda} · P/E ${m.pe?.toFixed?.(1) ?? m.pe} · P/BV ${m.pb?.toFixed?.(1) ?? m.pb}`;
}
