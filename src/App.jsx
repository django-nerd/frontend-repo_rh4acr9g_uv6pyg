import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import HomeSection from './components/HomeSection';
import ToolsList from './components/ToolsList';
import ToolPages from './components/ToolPages';
import Auth from './components/Auth';
import Support from './components/Support';

// Simple router using state. Tool detail pages open as separate route-like state.

export default function App() {
  const [page, setPage] = useState('home');
  const [activeTool, setActiveTool] = useState(null);

  // Handle deep links like ?tool=sip
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('page');
    const t = params.get('tool');
    if (p) setPage(p);
    if (t) setActiveTool(t);
  }, []);

  // Keep URL in sync for separate "pages"
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page);
    if (activeTool) params.set('tool', activeTool);
    const query = params.toString();
    const newUrl = `${window.location.pathname}?${query}`;
    window.history.replaceState({}, '', newUrl);
  }, [page, activeTool]);

  const openToolPage = (key) => {
    setActiveTool(key);
    setPage('tool');
  };

  const renderPage = () => {
    if (page === 'home') return <HomeSection />;
    if (page === 'tools') return <ToolsList onOpenTool={openToolPage} />;
    if (page === 'tool' && activeTool) return <ToolPages tool={activeTool} />;
    if (page === 'auth') return <Auth />;
    if (page === 'support') return <Support />;
    return <HomeSection />;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar current={page === 'tool' ? 'tools' : page} onNavigate={(p) => { setPage(p); if (p !== 'tool') setActiveTool(null); }} />
      <main>{renderPage()}</main>
      <footer className="bg-slate-950 border-t border-white/10 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-slate-300 text-sm flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
          <p>© {new Date().getFullYear()} GoDigitalNest. All rights reserved.</p>
          <p>Support: godigitalnest@gmail.com • 8988516576</p>
        </div>
      </footer>
    </div>
  );
}
