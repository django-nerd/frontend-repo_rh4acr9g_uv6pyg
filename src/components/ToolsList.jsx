import React from 'react';
import { Calculator, TrendingUp, Percent, Briefcase, Scale, Wallet, LineChart } from 'lucide-react';

const tools = [
  { key: 'sip', name: 'SIP Calculator', icon: Wallet, description: 'Plan monthly investments and projected corpus.' },
  { key: 'lumpsum', name: 'Lumpsum Calculator', icon: Briefcase, description: 'Forecast returns for one-time investments.' },
  { key: 'cagr', name: 'CAGR Calculator', icon: TrendingUp, description: 'Compute compounded annual growth rate.' },
  { key: 'breakeven', name: 'Break-even Calculator', icon: Scale, description: 'Find the price to break even after costs.' },
  { key: 'intraday', name: 'Intraday P&L', icon: LineChart, description: 'Assess intraday profit/loss and risk.' },
  { key: 'position', name: 'Position Sizing', icon: Percent, description: 'Size positions based on risk per trade.' },
];

const ToolsList = ({ onOpenTool }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-white">Trading Tools</h2>
      <p className="text-slate-300 mt-2">Pick a tool to open it in a separate page.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => onOpenTool(t.key)}
              className="group text-left bg-slate-800/70 border border-white/10 rounded-xl p-5 hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-300">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{t.name}</h3>
                  <p className="text-slate-300 text-sm">{t.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsList;
