import React from 'react';
import { Brain, ShieldCheck } from 'lucide-react';

export default function PredictionPanel({ prediction }) {
  const { probability, drivers } = prediction || {};
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-900/50 p-4 sm:p-6 backdrop-blur" id="how-it-works">
      <div className="flex items-center gap-2 text-slate-200 mb-4">
        <Brain className="w-5 h-5" />
        <h3 className="font-semibold">Listing Gain Prediction</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="sm:col-span-2">
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${Math.round((probability ?? 0) * 100)}%` }} />
          </div>
          <div className="mt-2 text-slate-300 text-sm">
            Short-term listing gain probability: <span className="font-semibold">{probability != null ? `${Math.round(probability * 100)}%` : '—'}</span>
          </div>
          <ul className="mt-3 text-xs text-slate-400 list-disc pl-5 space-y-1">
            {(drivers || []).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-4 bg-slate-800/60 ring-1 ring-white/10">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs">Security & Integrity</span>
          </div>
          <p className="text-xs text-slate-400">
            Authentication, RBAC, input sanitization, and continuous validation against benchmark sources keep analyses trustworthy.
          </p>
        </div>
      </div>
    </div>
  );
}
