import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router';
import Home from './pages/Home';
import MassDetail from './pages/MassDetail';
import Ordinario from './pages/Ordinario';
import OrdinarioDetail from './pages/OrdinarioDetail';
import Admin from './pages/Admin';
import About from './pages/About';
import CommunityHome from './pages/CommunityHome';
import CommunityMassLyrics from './pages/CommunityMassLyrics';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans selection:bg-red-100 selection:text-red-600 bg-gray-50">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/missa/:date" element={<MassDetail />} />
            <Route path="/ordinario" element={<Ordinario />} />
            <Route path="/ordinario/:category" element={<OrdinarioDetail />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* Rotas da Comunidade (Assembleia) */}
            <Route path="/comunidade" element={<CommunityHome />} />
            <Route path="/comunidade/missa/:date" element={<CommunityMassLyrics />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-100 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-3 mb-6 opacity-20 grayscale grayscale-0">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pastoral da Música</p>
            <p className="mt-4 text-[10px] text-gray-300 font-medium uppercase tracking-tight">
              &copy; {new Date().getFullYear()} — Repertório Litúrgico Digital
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;