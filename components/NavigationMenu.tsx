import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';

const NavigationMenu: React.FC<{ light?: boolean }> = ({ light = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Início', path: '/', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
    { name: 'Modo Congregação', path: '/comunidade', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
    { name: 'Ordinário da Missa', path: '/ordinario', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /> },
    { name: 'Sobre a Pastoral', path: '/sobre', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { name: 'Área de Gestão', path: '/admin', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /> },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          light ? 'text-white/80 hover:bg-white/10' : 'text-gray-400 hover:bg-gray-100'
        }`}
        aria-label="Abrir menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        <div 
          className={`absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-12">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-300 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl font-black text-sm uppercase tracking-tight transition-all ${
                    location.pathname === item.path 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-gray-100">
               <div className="flex items-center gap-3 opacity-30 grayscale mb-4">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div>
               </div>
               <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest leading-relaxed">
                  Pastoral da Música<br/>
                  Versão 1.0.0
               </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;