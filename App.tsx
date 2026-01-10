
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router';
import Header from './components/Header';
import Home from './pages/Home';
import MassDetail from './pages/MassDetail';
import Ordinario from './pages/Ordinario';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-red-100 selection:text-red-600">
        <Header />
        
        <main className="flex-grow pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/missa/:date" element={<MassDetail />} />
            <Route path="/ordinario" element={<Ordinario />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-100 py-10 px-4 text-center text-gray-400">
          <div className="max-w-4xl mx-auto">
             <div className="flex justify-center gap-4 mb-4 opacity-30 grayscale pointer-events-none">
                <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
             </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-300">Pastoral da Música</p>
            <p className="mt-1 text-[10px] font-medium opacity-60">Em harmonia, louvando a Deus com alegria!</p>
            <p className="mt-4 text-[10px]">&copy; {new Date().getFullYear()} — Repertório Litúrgico Digital</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
