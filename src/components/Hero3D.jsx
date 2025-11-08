import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero3D = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28">
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow">
          Navigate IPOs with Confidence
        </h1>
        <p className="mt-4 text-slate-200 text-base sm:text-lg max-w-2xl drop-shadow">
          Real-time market snapshot, IPO insights, and pro-grade trading calculators — all in one place.
        </p>
      </div>
    </section>
  );
};

export default Hero3D;
