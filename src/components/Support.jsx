import React from 'react';

const Support = () => {
  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-10">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-white">Customer Care</h1>
        <p className="mt-2 text-slate-300">We are here to help. Reach us through the following:</p>
        <div className="mt-6 bg-slate-800/70 border border-white/10 rounded-xl p-6 space-y-3 text-slate-200">
          <div>
            <span className="text-slate-400">Email</span>
            <p className="text-white text-lg">godigitalnest@gmail.com</p>
          </div>
          <div>
            <span className="text-slate-400">Phone</span>
            <p className="text-white text-lg">8988516576</p>
          </div>
          <p className="text-slate-400 text-sm">Support hours: 9am – 6pm IST, Mon–Fri</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
