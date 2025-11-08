import React, { useMemo, useState } from 'react';

// Simple calculators kept client-side to ensure immediate interactivity

export const SIPTool = () => {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const result = useMemo(() => {
    const n = years * 12;
    const i = rate / 100 / 12;
    const fv = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = monthly * n;
    return { fv, invested, gain: fv - invested };
  }, [monthly, years, rate]);

  return (
    <CalculatorLayout title="SIP Calculator">
      <NumberInput label="Monthly Investment" value={monthly} setValue={setMonthly} prefix="₹" />
      <NumberInput label="Expected Return (p.a)" value={rate} setValue={setRate} suffix="%" />
      <NumberInput label="Years" value={years} setValue={setYears} />
      <Result invested={result.invested} future={result.fv} gain={result.gain} />
    </CalculatorLayout>
  );
};

export const LumpsumTool = () => {
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10);

  const result = useMemo(() => {
    const fv = amount * Math.pow(1 + rate / 100, years);
    return { fv, invested: amount, gain: fv - amount };
  }, [amount, years, rate]);

  return (
    <CalculatorLayout title="Lumpsum Calculator">
      <NumberInput label="Investment Amount" value={amount} setValue={setAmount} prefix="₹" />
      <NumberInput label="Expected Return (p.a)" value={rate} setValue={setRate} suffix="%" />
      <NumberInput label="Years" value={years} setValue={setYears} />
      <Result invested={result.invested} future={result.fv} gain={result.gain} />
    </CalculatorLayout>
  );
};

export const CAGRTool = () => {
  const [start, setStart] = useState(100000);
  const [end, setEnd] = useState(200000);
  const [years, setYears] = useState(3);

  const cagr = useMemo(() => (Math.pow(end / start, 1 / years) - 1) * 100, [start, end, years]);

  return (
    <CalculatorLayout title="CAGR Calculator">
      <NumberInput label="Start Value" value={start} setValue={setStart} prefix="₹" />
      <NumberInput label="End Value" value={end} setValue={setEnd} prefix="₹" />
      <NumberInput label="Years" value={years} setValue={setYears} />
      <div className="mt-4 text-white text-lg">CAGR: {isFinite(cagr) ? cagr.toFixed(2) : '—'}%</div>
    </CalculatorLayout>
  );
};

export const BreakEvenTool = () => {
  const [buy, setBuy] = useState(100);
  const [qty, setQty] = useState(100);
  const [brokerage, setBrokerage] = useState(0.03);

  const breakeven = useMemo(() => buy + (brokerage / 100) * buy * 2, [buy, brokerage]);

  return (
    <CalculatorLayout title="Break-even Calculator">
      <NumberInput label="Buy Price" value={buy} setValue={setBuy} prefix="₹" />
      <NumberInput label="Quantity" value={qty} setValue={setQty} />
      <NumberInput label="Brokerage (%)" value={brokerage} setValue={setBrokerage} suffix="%" />
      <div className="mt-4 text-white text-lg">Break-even Price: ₹{breakeven.toFixed(2)}</div>
    </CalculatorLayout>
  );
};

export const IntradayPLTool = () => {
  const [buy, setBuy] = useState(100);
  const [sell, setSell] = useState(102);
  const [qty, setQty] = useState(100);
  const [charges, setCharges] = useState(0.05);

  const pl = useMemo(() => (sell - buy) * qty - ((buy + sell) * qty * (charges / 100)), [buy, sell, qty, charges]);

  return (
    <CalculatorLayout title="Intraday P&L">
      <NumberInput label="Buy Price" value={buy} setValue={setBuy} prefix="₹" />
      <NumberInput label="Sell Price" value={sell} setValue={setSell} prefix="₹" />
      <NumberInput label="Quantity" value={qty} setValue={setQty} />
      <NumberInput label="Charges (%)" value={charges} setValue={setCharges} suffix="%" />
      <div className="mt-4 text-white text-lg">P&L: ₹{pl.toFixed(2)}</div>
    </CalculatorLayout>
  );
};

export const PositionSizingTool = () => {
  const [capital, setCapital] = useState(100000);
  const [riskPct, setRiskPct] = useState(1);
  const [stopLoss, setStopLoss] = useState(2);

  const qty = useMemo(() => {
    const riskAmount = (riskPct / 100) * capital;
    return riskAmount / stopLoss;
  }, [capital, riskPct, stopLoss]);

  return (
    <CalculatorLayout title="Position Sizing">
      <NumberInput label="Capital" value={capital} setValue={setCapital} prefix="₹" />
      <NumberInput label="Risk per Trade (%)" value={riskPct} setValue={setRiskPct} suffix="%" />
      <NumberInput label="Stop Loss (₹ per share)" value={stopLoss} setValue={setStopLoss} prefix="₹" />
      <div className="mt-4 text-white text-lg">Suggested Quantity: {isFinite(qty) ? Math.floor(qty) : '—'}</div>
    </CalculatorLayout>
  );
};

const CalculatorLayout = ({ title, children }) => (
  <div className="min-h-screen bg-slate-950 pt-20 pb-10">
    <div className="max-w-3xl mx-auto px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
      <div className="mt-6 bg-slate-800/70 border border-white/10 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  </div>
);

const NumberInput = ({ label, value, setValue, prefix = '', suffix = '' }) => (
  <label className="block">
    <span className="text-slate-300 text-sm">{label}</span>
    <div className="mt-1 flex items-center rounded-lg bg-slate-900 border border-white/10 overflow-hidden">
      {prefix ? <span className="px-3 text-slate-400">{prefix}</span> : null}
      <input
        type="number"
        className="w-full bg-transparent px-3 py-2 text-white outline-none"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        step="any"
      />
      {suffix ? <span className="px-3 text-slate-400">{suffix}</span> : null}
    </div>
  </label>
);

export default function ToolPages({ tool }) {
  if (tool === 'sip') return <SIPTool />;
  if (tool === 'lumpsum') return <LumpsumTool />;
  if (tool === 'cagr') return <CAGRTool />;
  if (tool === 'breakeven') return <BreakEvenTool />;
  if (tool === 'intraday') return <IntradayPLTool />;
  if (tool === 'position') return <PositionSizingTool />;
  return (
    <div className="min-h-screen bg-slate-950 pt-24 text-center text-white">
      <p>Tool not found.</p>
    </div>
  );
}
