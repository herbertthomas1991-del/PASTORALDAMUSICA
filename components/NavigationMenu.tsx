
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';

const NavigationMenu: React.FC<{ light?: boolean }> = ({ light = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Início', path: '/', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
    { name: 'Assembleia', path: '/comunidade', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
    { name: 'Ordinário', path: '/ordinario', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> },
  ];

  const adminItems = [
    { name: 'Diretrizes', path: '/diretrizes', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
    { name: 'Escala', path: '/escala', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
    { name: 'Mural de Avisos', path: '/avisos', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /> },
    { 
      name: 'Área de Gestão', 
      path: '/admin', 
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      ) 
    },
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

      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-md" onClick={() => setIsOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-12">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Menu Pastoral</span>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <nav className="space-y-4">
              <div className="space-y-2">
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest pl-4">Comunidade</span>
                {menuItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-4 p-4 rounded-2xl font-black text-xs uppercase tracking-tight transition-all ${location.pathname === item.path ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 space-y-2">
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest pl-4">Coordenação</span>
                {adminItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-4 p-4 rounded-2xl font-black text-xs uppercase tracking-tight transition-all ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;
