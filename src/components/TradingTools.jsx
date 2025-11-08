import React from 'react';
import { Calculator, Percent, IndianRupee, ArrowRight } from 'lucide-react';

function Num({ label, value, onChange, step = 'any', min, max }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-slate-300">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value || '0'))}
        step={step}
        min={min}
        max={max}
        className="rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/30"
      />
    </label>
  );
}

function Card({ title, icon: Icon, children, footer }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
      <div className="flex items-center gap-2 text-slate-300 mb-3">
        <Icon className="w-5 h-5" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {children}
      </div>
      {footer}
    </div>
  );
}

export default function TradingTools() {
  // SIP Calculator
  const [sipMonthly, setSipMonthly] = React.useState(10000);
  const [sipReturn, setSipReturn] = React.useState(12);
  const [sipYears, setSipYears] = React.useState(10);
  const sipMonths = sipYears * 12;
  const sipRate = sipReturn / 12 / 100;
  const sipFuture = sipMonthly * ((Math.pow(1 + sipRate, sipMonths) - 1) / sipRate) * (1 + sipRate);
  const sipInvested = sipMonthly * sipMonths;
  const sipGain = sipFuture - sipInvested;

  // Lumpsum calculator
  const [lsAmount, setLsAmount] = React.useState(500000);
  const [lsReturn, setLsReturn] = React.useState(12);
  const [lsYears, setLsYears] = React.useState(5);
  const lsFuture = lsAmount * Math.pow(1 + lsReturn / 100, lsYears);

  // CAGR calculator
  const [cStart, setCStart] = React.useState(100000);
  const [cEnd, setCEnd] = React.useState(250000);
  const [cYears, setCYears] = React.useState(3);
  const cagr = (Math.pow(cEnd / cStart, 1 / cYears) - 1) * 100;

  // Break-even share price
  const [entry, setEntry] = React.useState(950);
  const [qty, setQty] = React.useState(100);
  const [broker, setBroker] = React.useState(0.03); // % per side
  const [charges, setCharges] = React.useState(0.02); // taxes and others %
  const totalBuy = entry * qty * (1 + (broker + charges) / 100);
  const breakEven = totalBuy / qty / (1 - (broker + charges) / 100);

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 text-slate-300">
        <Calculator className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Trading Tools & Calculators (India)</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="SIP Calculator" icon={Percent}>
          <Num label="Monthly Investment (₹)" value={sipMonthly} onChange={setSipMonthly} />
          <Num label="Expected Return (% p.a.)" value={sipReturn} onChange={setSipReturn} />
          <Num label="Investment Period (years)" value={sipYears} onChange={setSipYears} />
          <div className="col-span-1 sm:col-span-2 text-sm">
            <div className="flex items-center justify-between py-1"><span>Invested</span><span>₹{sipInvested.toLocaleString('en-IN')}</span></div>
            <div className="flex items-center justify-between py-1"><span>Est. Value</span><span>₹{sipFuture.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
            <div className="flex items-center justify-between py-1"><span>Est. Gain</span><span className="text-emerald-400">₹{sipGain.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
          </div>
        </Card>

        <Card title="Lumpsum Calculator" icon={IndianRupee}>
          <Num label="Invested Amount (₹)" value={lsAmount} onChange={setLsAmount} />
          <Num label="Expected Return (% p.a.)" value={lsReturn} onChange={setLsReturn} />
          <Num label="Investment Period (years)" value={lsYears} onChange={setLsYears} />
          <div className="col-span-1 sm:col-span-2 text-sm">
            <div className="flex items-center justify-between py-1"><span>Future Value</span><span>₹{lsFuture.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
          </div>
        </Card>

        <Card title="CAGR Calculator" icon={Percent}>
          <Num label="Start Value (₹)" value={cStart} onChange={setCStart} />
          <Num label="End Value (₹)" value={cEnd} onChange={setCEnd} />
          <Num label="Years" value={cYears} onChange={setCYears} />
          <div className="col-span-1 sm:col-span-2 text-sm">
            <div className="flex items-center justify-between py-1"><span>CAGR</span><span className="text-emerald-400">{isFinite(cagr) ? cagr.toFixed(2) : '-'}%</span></div>
          </div>
        </Card>

        <Card title="Break-even Share Price" icon={ArrowRight}>
          <Num label="Entry Price (₹)" value={entry} onChange={setEntry} />
          <Num label="Quantity" value={qty} onChange={setQty} />
          <Num label="Brokerage (% per side)" value={broker} onChange={setBroker} />
          <Num label="Other Charges (% per side)" value={charges} onChange={setCharges} />
          <div className="col-span-1 sm:col-span-2 text-sm">
            <div className="flex items-center justify-between py-1"><span>Total Buy (incl. charges)</span><span>₹{totalBuy.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
            <div className="flex items-center justify-between py-1"><span>Break-even Price</span><span className="text-emerald-400">₹{breakEven.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span></div>
          </div>
        </Card>
      </div>

      <p className="text-xs text-slate-500">These tools use Indian currency and compounding conventions. Consult your broker for exact charges and taxes.</p>
    </section>
  );
}
