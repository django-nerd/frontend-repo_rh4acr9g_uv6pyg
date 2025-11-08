import React from 'react';
import Hero3D from './Hero3D';

const HomeSection = () => {
  return (
    <div className="bg-slate-950 text-white">
      <Hero3D />
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold">Why GoDigitalNest</h2>
        <p className="mt-3 text-slate-300 max-w-3xl">
          Clean, readable typography and higher contrast ensure every detail is visible against the background.
          Track IPOs, explore markets, and run trading math with clarity.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl p-5 bg-slate-800/70 border border-white/10">
            <h3 className="font-semibold">IPO Intelligence</h3>
            <p className="text-slate-300 text-sm mt-1">Upcoming and recent listings with crisp insights.</p>
          </div>
          <div className="rounded-xl p-5 bg-slate-800/70 border border-white/10">
            <h3 className="font-semibold">Market Snapshot</h3>
            <p className="text-slate-300 text-sm mt-1">Indices and movers with fast filtering.</p>
          </div>
          <div className="rounded-xl p-5 bg-slate-800/70 border border-white/10">
            <h3 className="font-semibold">Trading Calculators</h3>
            <p className="text-slate-300 text-sm mt-1">From SIP to P&L—designed for accuracy.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
