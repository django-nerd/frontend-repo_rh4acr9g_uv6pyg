import React, { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, ExternalLink, IndianRupee, Landmark, Calendar, Info } from 'lucide-react';

export default function IpoDetail({ symbol, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${BASE}/api/ipos/${encodeURIComponent(symbol)}`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load IPO');
        return r.json();
      })
      .then((json) => {
        if (mounted) { setData(json); setError(null); }
      })
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [symbol, BASE]);

  const returnPct = useMemo(() => {
    if (!data) return 0;
    return Math.round(((data.currentPrice - data.issuePrice) / data.issuePrice) * 100);
  }, [data]);

  const formatINR = (n) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(n || 0);

  return (
    <section className="space-y-5">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {loading && <div className="text-slate-400">Loading IPO details...</div>}
      {error && <div className="text-rose-400">{error}</div>}

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{data.name} ({data.symbol})</h2>
                  <div className="mt-1 text-sm text-slate-400">{data.sector}</div>
                </div>
                <div className={`text-sm font-semibold ${returnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{returnPct}%</div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-[11px] text-slate-400">Issue Price</div>
                  <div className="font-medium">{formatINR(data.issuePrice)}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Current Price</div>
                  <div className="font-medium">{formatINR(data.currentPrice)}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Lot Size</div>
                  <div className="font-medium">{data.lotSize || '-'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-[11px] text-slate-400">Listing</div>
                    <div className="font-medium">{data.listDate}</div>
                  </div>
                </div>
              </div>
              {data.description && (
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">{data.description}</p>
              )}
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-slate-300 font-semibold mb-3 flex items-center gap-2"><Info className="w-4 h-4" /> Subscription</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {data.subscription ? Object.entries(data.subscription).map(([k,v]) => (
                  <div key={k} className="rounded-lg bg-white/5 border border-white/10 p-3">
                    <div className="text-[11px] text-slate-400">{k}</div>
                    <div className="font-medium">{v}x</div>
                  </div>
                )) : <div className="text-slate-400">No data</div>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-slate-300 font-semibold mb-2 flex items-center gap-2"><Landmark className="w-4 h-4" /> Registrar & Exchanges</div>
              <div className="text-sm">
                <div className="text-[11px] text-slate-400">Registrar</div>
                <div className="font-medium">{data.registrar || '-'}</div>
              </div>
              <div className="mt-3 text-sm">
                <div className="text-[11px] text-slate-400">Exchanges</div>
                <div className="font-medium">{Array.isArray(data.exchanges) ? data.exchanges.join(', ') : '-'}</div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
              <div className="text-slate-300 font-semibold mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" /> Timeline</div>
              <div className="text-sm space-y-2">
                <div>
                  <div className="text-[11px] text-slate-400">Bidding Window</div>
                  <div className="font-medium">{data?.timeline?.bidding ? `${data.timeline.bidding[0]} → ${data.timeline.bidding[1]}` : '-'}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Listing</div>
                  <div className="font-medium">{data?.timeline?.listing || '-'}</div>
                </div>
              </div>
            </div>

            <a href={`https://www.google.com/search?q=${encodeURIComponent(data.name + ' IPO')}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full gap-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 text-sm">
              Research on the web <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
