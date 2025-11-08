import React from 'react';
import { TrendingUp, Search } from 'lucide-react';

const indices = [
  { name: 'NIFTY 50', last: 23200.5, chg: 0.62 },
  { name: 'NIFTY BANK', last: 49875.9, chg: -0.18 },
  { name: 'SENSEX', last: 76980.3, chg: 0.41 },
  { name: 'NIFTY IT', last: 36420.1, chg: 0.25 },
];

const stocksData = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2965.4, pe: 27.3, pb: 2.4, mcap: '20.4T' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3942.1, pe: 30.8, pb: 15.4, mcap: '14.6T' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1542.3, pe: 19.2, pb: 2.8, mcap: '11.5T' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1178.6, pe: 20.4, pb: 3.4, mcap: '8.6T' },
  { symbol: 'INFY', name: 'Infosys', price: 1624.8, pe: 24.7, pb: 7.8, mcap: '6.8T' },
  { symbol: 'ITC', name: 'ITC', price: 462.9, pe: 26.1, pb: 7.1, mcap: '5.8T' },
  { symbol: 'LT', name: 'Larsen & Toubro', price: 3698.2, pe: 31.2, pb: 6.3, mcap: '5.4T' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2420.5, pe: 56.4, pb: 10.2, mcap: '5.1T' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 840.7, pe: 13.8, pb: 2.0, mcap: '7.5T' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1388.4, pe: 63.2, pb: 9.1, mcap: '8.2T' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 7350.0, pe: 34.6, pb: 7.9, mcap: '4.4T' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1740.3, pe: 23.5, pb: 3.1, mcap: '3.6T' },
];

function formatChg(chg) {
  const sign = chg >= 0 ? '+' : '';
  const color = chg >= 0 ? 'text-emerald-400' : 'text-rose-400';
  return <span className={color}>{sign}{chg.toFixed(2)}%</span>;
}

export default function MarketSnapshot() {
  const [q, setQ] = React.useState('');
  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return stocksData;
    return stocksData.filter(x =>
      x.symbol.toLowerCase().includes(s) || x.name.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2 text-slate-300">
        <TrendingUp className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Indian Market Snapshot</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {indices.map((idx) => (
          <div key={idx.name} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
            <div className="text-xs text-slate-400">{idx.name}</div>
            <div className="mt-1 text-xl font-semibold">{idx.last.toLocaleString('en-IN')}</div>
            <div className="mt-1 text-sm">{formatChg(idx.chg)}</div>
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
                  <td className="px-4 py-2 text-right">₹{s.price.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-2 text-right">{s.pe.toFixed(1)}</td>
                  <td className="px-4 py-2 text-right">{s.pb.toFixed(1)}</td>
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

      <p className="text-xs text-slate-500">Data is illustrative and formatted for Indian market conventions (₹, en-IN). Connect the live market feed in the backend to make this real-time.</p>
    </section>
  );
}
