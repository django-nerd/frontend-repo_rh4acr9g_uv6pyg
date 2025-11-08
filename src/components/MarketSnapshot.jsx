import React, { useEffect, useMemo, useState } from 'react';
import { TrendingUp, Search } from 'lucide-react';

export default function MarketSnapshot() {
  const [q, setQ] = useState('');
  const [data, setData] = useState({ indices: [], stocks: [] });
  const [loading, setLoading] = useState(true);
  const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${BASE}/api/market`).then(r => r.json()).then(json => {
      if (mounted) setData(json);
    }).catch(() => {}).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [BASE]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data.stocks;
    return data.stocks.filter(x =>
      x.symbol.toLowerCase().includes(s) || x.name.toLowerCase().includes(s)
    );
  }, [q, data]);

  function formatChg(chg) {
    const sign = chg >= 0 ? '+' : '';
    const color = chg >= 0 ? 'text-emerald-400' : 'text-rose-400';
    return <span className={color}>{sign}{chg.toFixed(2)}%</span>;
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2 text-slate-300">
        <TrendingUp className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Indian Market Snapshot</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(data.indices || []).map((idx) => (
          <div key={idx.name} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
            <div className="text-xs text-slate-400">{idx.name}</div>
            <div className="mt-1 text-xl font-semibold">{Number(idx.last).toLocaleString('en-IN')}</div>
            <div className="mt-1 text-sm">{formatChg(Number(idx.chg))}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/40 px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search NIFTY stocks (symbol or name)"
            className="w-full bg-transparent outline-none text-sm placeholder:text-slate-500"
          />
        </div>

        <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/60 text-slate-300">
              <tr>
                <th className="text-left px-4 py-2 font-medium">Symbol</th>
                <th className="text-left px-4 py-2 font-medium">Name</th>
                <th className="text-right px-4 py-2 font-medium">Last</th>
                <th className="text-right px-4 py-2 font-medium">P/E</th>
                <th className="text-right px-4 py-2 font-medium">P/B</th>
                <th className="text-right px-4 py-2 font-medium">M.Cap</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.symbol} className="border-t border-white/5 hover:bg-slate-900/30">
                  <td className="px-4 py-2 font-mono">{s.symbol}</td>
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2 text-right">₹{Number(s.price).toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2 text-right">{Number(s.pe).toFixed(1)}</td>
                  <td className="px-4 py-2 text-right">{Number(s.pb).toFixed(1)}</td>
                  <td className="px-4 py-2 text-right">{s.mcap}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-400" colSpan={6}>No matches</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-500">Indices and stocks powered by backend API. Replace stubs with live NSE/BSE data provider for production use.</p>
    </section>
  );
}
