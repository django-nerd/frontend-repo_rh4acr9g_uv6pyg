import React, { useEffect, useMemo, useState } from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

// Horizontal auto-scrolling ticker showing top performing IPOs
export default function IpoTicker({ onSelect }) {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${BASE}/api/ipos`)
      .then(r => r.json())
      .then(json => { if (mounted) setIpos(json.map(item => ({
        ...item,
        returnPct: Math.round(((item.currentPrice - item.issuePrice) / item.issuePrice) * 100),
      }))); })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [BASE]);

  // duplicate list for seamless loop
  const loop = useMemo(() => {
    const arr = ipos.length ? ipos : [];
    return [...arr, ...arr];
  }, [ipos]);

  const formatINR = (n) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(n);

  return (
    <div className="w-full overflow-hidden border-t border-white/10">
      <style>{`
        @keyframes ipo-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
      <div className="flex items-center gap-3 px-6 sm:px-8 py-2 bg-slate-950/60">
        <div className="flex items-center gap-2 text-emerald-300 text-xs font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>{loading ? 'Loading IPOs…' : 'Top Performing IPOs'}</span>
        </div>
      </div>
      <div className="relative">
        <div
          className="flex gap-4 whitespace-nowrap will-change-transform"
          style={{
            width: '200%',
            animation: 'ipo-scroll 35s linear infinite',
          }}
        >
          {loop.map((ipo, idx) => (
            <button
              type="button"
              onClick={() => onSelect && onSelect(ipo.symbol)}
              key={`${ipo.symbol || 'ipo'}-${idx}`}
              className="inline-flex min-w-[260px] max-w-[320px] mx-2 my-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur text-slate-200 hover:bg-white/10 transition-colors text-left"
              aria-label={`Open ${ipo.name} details`}
            >
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm">{ipo.name}</div>
                  <div className={`text-xs font-semibold ${ipo.returnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{ipo.returnPct}%</div>
                </div>
                <div className="mt-1 text-[11px] text-slate-400">{ipo.sector} • Listed {new Date(ipo.listDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">Issue</div>
                    <div className="font-medium">{formatINR(ipo.issuePrice)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Current</div>
                    <div className="font-medium">{formatINR(ipo.currentPrice)}</div>
                  </div>
                  <div className="flex items-end justify-end">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 text-emerald-300 px-2 py-1 text-[10px]">
                      View <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
