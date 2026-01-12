
import React from 'react';
import { Link } from 'react-router';
import NavigationMenu from './NavigationMenu';

interface HeaderProps {
  hideMenu?: boolean;
  logoLink?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  hideMenu = false, 
  logoLink = "/"
}) => {
  return (
    <header className="bg-white border-b border-gray-100 relative py-2 md:py-3 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Grupo Identidade Compacto */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Link to={logoLink} className="group transition-transform duration-500 hover:scale-105 flex-shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 drop-shadow-sm">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <clipPath id="circleHeaderCompactLogo">
                    <circle cx="100" cy="100" r="90" />
                  </clipPath>
                </defs>
                <g clipPath="url(#circleHeaderCompactLogo)">
                  <rect x="0" y="0" width="100" height="100" fill="#FBBF24" />
                  <rect x="100" y="0" width="100" height="100" fill="#16A34A" />
                  <rect x="0" y="100" width="100" height="100" fill="#0EA5E9" />
                  <rect x="100" y="100" width="100" height="100" fill="#EF4444" />
                </g>
                <text x="100" y="145" textAnchor="middle" style={{ fontFamily: 'serif', fontSize: '150px', fill: 'black' }}>𝄞</text>
              </svg>
            </div>
          </Link>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-none whitespace-nowrap overflow-hidden">
            Músicas para a Missa
          </h2>
        </div>
        
        {/* Menu */}
        {!hideMenu && (
          <div className="flex items-center flex-shrink-0">
            <NavigationMenu />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
