import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3D({ onPrimaryClick }) {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Subtle gradient overlays that don't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(56,189,248,0.10),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 h-full flex items-center">
        <div className="max-w-2xl text-slate-100">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 ring-1 ring-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs tracking-wide uppercase text-slate-300">FinTech IPO Analyser</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Risk‑Optimized Valuation & Listing Gain Prediction
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Analyze peer comps, validate growth‑aligned premiums, and forecast listing gain probability — all in one analytical console.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onPrimaryClick} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
              Start Analysis
            </button>
            <a href="#how-it-works" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur">
              How it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
