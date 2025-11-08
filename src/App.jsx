import React, { useEffect, useMemo, useState } from 'react';
import NavBar from './components/NavBar';
import Hero3D from './components/Hero3D';
import CompsSelector from './components/CompsSelector';
import ValuationResults from './components/ValuationResults';
import PredictionPanel from './components/PredictionPanel';
import MarketSnapshot from './components/MarketSnapshot';
import TradingTools from './components/TradingTools';
import IpoTicker from './components/IpoTicker';
import IpoDetail from './components/IpoDetail';

function App() {
  const [page, setPage] = useState('home');
  const [selector, setSelector] = useState({
    multiples: { evEbitda: true, pe: true, pb: true },
    growth: 15,
  });
  const [activeIpo, setActiveIpo] = useState(null);
  const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    document.title = 'GoDigitalNest';
  }, []);

  // Fetch valuation results from backend
  const results = useMemo(() => ({ targetPrice: null, premiumValidated: true, medianMultiples: { evEbitda: 0, pe: 0, pb: 0 }, latencyMs: 0 }), []);
  const [valuation, setValuation] = useState(results);
  useEffect(() => {
    const t0 = performance.now();
    fetch(`${BASE}/api/valuation`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selector)
    }).then(r => r.json()).then(json => {
      const latencyMs = Math.max(1, Math.round(performance.now() - t0));
      setValuation({ ...json, latencyMs });
    }).catch(() => {});
  }, [selector, BASE]);

  const [prediction, setPrediction] = useState({ probability: 0, drivers: [] });
  useEffect(() => {
    const payload = { npm: 14, subscription: 1.3, sentiment: 0.62 };
    fetch(`${BASE}/api/predict`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.json()).then(setPrediction).catch(() => {});
  }, [BASE]);

  function handleExport() {
    const rows = [
      ['Metric', 'Value'],
      ['Target Price', valuation.targetPrice != null ? valuation.targetPrice.toFixed(2) : ''],
      ['EV/EBITDA (median)', valuation.medianMultiples.evEbitda],
      ['P/E (median)', valuation.medianMultiples.pe],
      ['P/BV (median)', valuation.medianMultiples.pb],
      ['Premium Validated', valuation.premiumValidated ? 'Yes' : 'No'],
      ['Latency (ms)', valuation.latencyMs],
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
      <NavBar onNavigate={(p) => { setPage(p); setActiveIpo(null); }} active={page} />

      <IpoTicker onSelect={(symbol) => { setActiveIpo(symbol); setPage('home'); }} />

      {page === 'home' && (
        <main className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10 py-8">
          {activeIpo ? (
            <IpoDetail symbol={activeIpo} onBack={() => setActiveIpo(null)} />
          ) : (
            <>
              <Hero3D onPrimaryClick={() => {
                const el = document.getElementById('analysis');
                el?.scrollIntoView({ behavior: 'smooth' });
              }} />

              <section id="analysis" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <CompsSelector onChange={setSelector} />
                </div>
                <div className="lg:col-span-2 space-y-6">
                  <ValuationResults results={valuation} onExport={handleExport} />
                  <PredictionPanel prediction={prediction} />
                </div>
              </section>
            </>
          )}
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
        Built for the Indian markets. Live data is served via the backend where available.
      </footer>
    </div>
  );
}

export default App;
