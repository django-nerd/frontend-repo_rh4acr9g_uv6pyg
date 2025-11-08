import React, { useMemo } from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

// Horizontal auto-scrolling ticker showing top performing IPOs
export default function IpoTicker() {
  // Example data; replace via backend for live data
  const ipos = useMemo(() => [
    {
      name: 'IdeaForge',
      sector: 'Aerospace & Defence',
      listDate: 'Jun 2023',
      issuePrice: 672,
      currentPrice: 1360,
    },
    {
      name: 'Tata Tech',
      sector: 'IT Services',
      listDate: 'Nov 2023',
      issuePrice: 500,
      currentPrice: 1210,
    },
    {
      name: 'EMS Ltd',
      sector: 'Utilities',
      listDate: 'Sep 2023',
      issuePrice: 211,
      currentPrice: 497,
    },
    {
      name: 'IKIO Lighting',
      sector: 'Consumer Durables',
      listDate: 'Jun 2023',
      issuePrice: 285,
      currentPrice: 470,
    },
    {
      name: 'Concord Biotech',
      sector: 'Pharma',
      listDate: 'Aug 2023',
      issuePrice: 741,
      currentPrice: 980,
    },
    {
      name: 'SBFC Finance',
      sector: 'NBFC',
      listDate: 'Aug 2023',
      issuePrice: 57,
      currentPrice: 97,
    },
  ].map(item => ({
    ...item,
    returnPct: Math.round(((item.currentPrice - item.issuePrice) / item.issuePrice) * 100),
  })), []);

  // duplicate list for seamless loop
  const loop = [...ipos, ...ipos];

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
          <span>Top Performing IPOs</span>
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
            <div
              key={idx}
              className="inline-flex min-w-[260px] max-w-[320px] mx-2 my-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur text-slate-200 hover:bg-white/10 transition-colors"
            >
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm">{ipo.name}</div>
                  <div className={`text-xs font-semibold ${ipo.returnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{ipo.returnPct}%</div>
                </div>
                <div className="mt-1 text-[11px] text-slate-400">{ipo.sector} • Listed {ipo.listDate}</div>
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
                      Gain <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
