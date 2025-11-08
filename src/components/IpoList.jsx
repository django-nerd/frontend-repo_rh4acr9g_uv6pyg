import React, { useEffect, useMemo, useState } from 'react';
import { TrendingUp, Calendar, ArrowUpRight, Search } from 'lucide-react';

export default function IpoList({ onOpenDetail }) {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('open'); // open | all
  const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${BASE}/api/ipos`)
      .then(r => r.json())
      .then(json => { if (mounted) setIpos(json || []); })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [BASE]);

  const isOpenNow = (ipo) => {
    const range = ipo?.timeline?.bidding;
    if (!range || range.length < 2) return false;
    const now = new Date();
    const start = new Date(range[0]);
    const end = new Date(range[1]);
    return now >= start && now <= end;
  };

  const filtered = useMemo(() => {
    let list = [...ipos];
    if (tab === 'open') list = list.filter(isOpenNow);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(i => (i.name || '').toLowerCase().includes(q) || (i.symbol || '').toLowerCase().includes(q));
    }
    return list;
  }, [ipos, tab, query]);

  const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-white">
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">IPO Centre</h1>
          <p className="mt-2 text-slate-300">Browse all listings and see what\'s open for subscription right now.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or symbol"
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button
          onClick={() => setTab('open')}
          className={`px-3 py-1.5 rounded-md text-sm border ${tab === 'open' ? 'bg-indigo-600 border-indigo-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
        >Open Now</button>
        <button
          onClick={() => setTab('all')}
          className={`px-3 py-1.5 rounded-md text-sm border ${tab === 'all' ? 'bg-indigo-600 border-indigo-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
        >All IPOs</button>
        <div className="text-xs text-slate-400 ml-auto">{filtered.length} shown</div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading && (
          <div className="col-span-full text-slate-400">Loading IPOs…</div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="col-span-full text-slate-400">No IPOs found.</div>
        )}
        {filtered.map((ipo) => {
          const open = isOpenNow(ipo);
          const returnPct = ipo.issuePrice && ipo.currentPrice ? Math.round(((ipo.currentPrice - ipo.issuePrice) / ipo.issuePrice) * 100) : 0;
          return (
            <button
              key={ipo.symbol}
              onClick={() => onOpenDetail && onOpenDetail(ipo.symbol)}
              className="text-left rounded-xl bg-slate-900/40 border border-white/10 hover:border-white/20 transition-colors p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">{ipo.name} <span className="text-slate-400 text-sm">({ipo.symbol})</span></div>
                  <div className="text-xs text-slate-400 mt-0.5">{ipo.sector || '—'}</div>
                </div>
                <div className={`text-xs font-semibold ${returnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{Number.isFinite(returnPct) ? `${returnPct}%` : ''}</div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-[11px] text-slate-400">Issue Price</div>
                  <div className="font-medium">{formatINR(ipo.issuePrice)}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Current</div>
                  <div className="font-medium">{formatINR(ipo.currentPrice)}</div>
                </div>
                <div className="flex items-center justify-end">
                  {open ? (
                    <span className="inline-flex items-center gap-1 text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-md text-[11px]">
                      <TrendingUp className="w-3 h-3" /> Open Now
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-slate-300 bg-white/10 px-2 py-1 rounded-md text-[11px]">
                      Details <ArrowUpRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Listing: {ipo.listDate || '—'}</div>
                {ipo?.timeline?.bidding && (
                  <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Bidding: {ipo.timeline.bidding[0]} → {ipo.timeline.bidding[1]}</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
