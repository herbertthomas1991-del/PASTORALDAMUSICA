import React from 'react';
import { Link } from 'react-router';
import NavigationMenu from './NavigationMenu';

interface HeaderProps {
  hideMenu?: boolean;
  logoLink?: string;
}

const Header: React.FC<HeaderProps> = ({ hideMenu = false, logoLink = "/" }) => {
  return (
    <header className="bg-white border-b border-gray-100 py-6 md:py-8 px-4 relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Menu posicionado no canto superior direito */}
        {!hideMenu && (
          <div className="absolute right-4 top-4 md:right-8 md:top-8">
            <NavigationMenu />
          </div>
        )}

        <Link to={logoLink} className="inline-block group text-center">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4 transition-transform group-hover:scale-105 duration-300">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
                <defs>
                  <clipPath id="circleView">
                    <circle cx="100" cy="100" r="90" />
                  </clipPath>
                </defs>
                <g clipPath="url(#circleView)">
                  <rect x="0" y="0" width="100" height="100" fill="#FBBF24" />
                  <rect x="100" y="0" width="100" height="100" fill="#16A34A" />
                  <rect x="0" y="100" width="100" height="100" fill="#0EA5E9" />
                  <rect x="100" y="100" width="100" height="100" fill="#EF4444" />
                  <rect x="94" y="0" width="12" height="200" fill="white" />
                  <rect x="0" y="94" width="200" height="12" fill="white" />
                </g>
                <text 
                  x="100" 
                  y="145" 
                  textAnchor="middle" 
                  style={{ 
                    fontFamily: 'serif', 
                    fontSize: '160px', 
                    fill: 'black',
                    fontWeight: 'normal'
                  }}
                >
                  𝄞
                </text>
              </svg>
            </div>

            <div className="flex flex-col items-center leading-none">
              <h1 className="text-red-600 text-2xl md:text-4xl font-extrabold tracking-wider uppercase whitespace-nowrap">
                Pastoral da Música
              </h1>
            </div>

            <p className="text-gray-400 italic mt-1 text-xs md:text-sm font-medium">
              "Em harmonia, louvando a Deus com alegria!"
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;