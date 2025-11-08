import React from 'react';
import { Home, Wrench, User, HelpCircle, LineChart } from 'lucide-react';

const NavBar = ({ current, onNavigate }) => {
  const linkClasses = (key) =>
    `inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      current === key
        ? 'bg-indigo-600 text-white'
        : 'text-slate-200 hover:text-white hover:bg-indigo-500/30'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/70 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="text-xl sm:text-2xl font-bold tracking-tight text-white"
          aria-label="GoDigitalNest Home"
        >
          GoDigitalNest
        </button>
        <nav className="flex items-center gap-2">
          <button className={linkClasses('home')} onClick={() => onNavigate('home')}>
            <Home size={18} /> <span className="hidden sm:inline">Home</span>
          </button>
          <button className={linkClasses('ipos')} onClick={() => onNavigate('ipos')}>
            <LineChart size={18} /> <span className="hidden sm:inline">IPOs</span>
          </button>
          <button className={linkClasses('tools')} onClick={() => onNavigate('tools')}>
            <Wrench size={18} /> <span className="hidden sm:inline">Tools</span>
          </button>
          <button className={linkClasses('auth')} onClick={() => onNavigate('auth')}>
            <User size={18} /> <span className="hidden sm:inline">Login / Sign Up</span>
          </button>
          <button className={linkClasses('support')} onClick={() => onNavigate('support')}>
            <HelpCircle size={18} /> <span className="hidden sm:inline">Support</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
