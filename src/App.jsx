import React, { useMemo, useState } from 'react';
import NavBar from './components/NavBar';
import Hero3D from './components/Hero3D';
import CompsSelector from './components/CompsSelector';
import ValuationResults from './components/ValuationResults';
import PredictionPanel from './components/PredictionPanel';
import MarketSnapshot from './components/MarketSnapshot';
import TradingTools from './components/TradingTools';

function App() {
  const [page, setPage] = useState('home');
  const [selector, setSelector] = useState({
    multiples: { evEbitda: true, pe: true, pb: true },
    growth: 15,
  });

  // Simulated analytics calculations for demo UI
  const results = useMemo(() => {
    const t0 = performance.now();
    const active = Object.entries(selector.multiples).filter(([, v]) => v).map(([k]) => k);

    const medians = { evEbitda: 12.4, pe: 18.7, pb: 3.1 };
    const priceByMultiple = { evEbitda: 95, pe: 102, pb: 88 };
    const targetPrice = active.length
      ? active.reduce((acc, k) => acc + priceByMultiple[k], 0) / active.length
      : null;

    const impliedPremium = targetPrice ? Math.max(0, (targetPrice - 90) / 90) * 100 : 0;
    const premiumValidated = impliedPremium <= selector.growth * 1.2;

    const latencyMs = Math.max(3, Math.round(performance.now() - t0));

    return {
      targetPrice,
      premiumValidated,
      medianMultiples: medians,
      latencyMs,
    };
  }, [selector]);

  const prediction = useMemo(() => {
    const npm = 14;
    const subQ = 1.3;
    const sentiment = 0.62;
    let p = 0.35 * (npm / 20) + 0.4 * (subQ / 2) + 0.25 * sentiment;
    p = Math.max(0, Math.min(1, p));
    return {
      probability: p,
      drivers: [
        `NPM% contribution: ${(npm / 20 * 35).toFixed(1)} pts`,
        `Subscription intensity: ${(subQ / 2 * 40).toFixed(1)} pts`,
        `Social sentiment: ${(sentiment * 25).toFixed(1)} pts`,
      ],
    };
  }, [selector]);

  function handleExport() {
    const rows = [
      ['Metric', 'Value'],
      ['Target Price', results.targetPrice != null ? results.targetPrice.toFixed(2) : ''],
      ['EV/EBITDA (median)', results.medianMultiples.evEbitda],
      ['P/E (median)', results.medianMultiples.pe],
      ['P/BV (median)', results.medianMultiples.pb],
      ['Premium Validated', results.premiumValidated ? 'Yes' : 'No'],
      ['Latency (ms)', results.latencyMs],
      ['Listing Gain Probability', prediction.probability != null ? Math.round(prediction.probability * 100) + '%': ''],
    ];
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ipo_valuation_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavBar onNavigate={setPage} active={page} />

      {page === 'home' && (
        <main className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10 py-8">
          <Hero3D onPrimaryClick={() => {
            const el = document.getElementById('analysis');
            el?.scrollIntoView({ behavior: 'smooth' });
          }} />

          <section id="analysis" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CompsSelector onChange={setSelector} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <ValuationResults results={results} onExport={handleExport} />
              <PredictionPanel prediction={prediction} />
            </div>
          </section>
        </main>
      )}

      {page === 'market' && (
        <main className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8 py-8">
          <MarketSnapshot />
        </main>
      )}

      {page === 'tools' && (
        <main className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8 py-8">
          <TradingTools />
        </main>
      )}

      <footer className="max-w-7xl mx-auto px-6 sm:px-8 py-8 text-xs text-slate-500">
        Built for the Indian markets. Figures are illustrative; connect live feeds and models in the backend for production.
      </footer>
    </div>
  );
}

export default App;
