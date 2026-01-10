
import React from 'react';
import { Link } from 'react-router';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 py-6 md:py-8 px-4 text-center">
      <Link to="/" className="inline-block group">
        <div className="flex flex-col items-center">
          {/* Logo Oficial Recriado em SVG para Nitidez Máxima */}
          <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3 transition-transform group-hover:scale-105 duration-300">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
              {/* Círculo de Fundo dividido em quadrantes */}
              <defs>
                <clipPath id="circleView">
                  <circle cx="100" cy="100" r="90" />
                </clipPath>
              </defs>
              
              <g clipPath="url(#circleView)">
                {/* Top Left - Amarelo/Dourado */}
                <rect x="0" y="0" width="100" height="100" fill="#FBBF24" />
                {/* Top Right - Verde */}
                <rect x="100" y="0" width="100" height="100" fill="#16A34A" />
                {/* Bottom Left - Azul */}
                <rect x="0" y="100" width="100" height="100" fill="#0EA5E9" />
                {/* Bottom Right - Vermelho */}
                <rect x="100" y="100" width="100" height="100" fill="#EF4444" />
                
                {/* Cruz Branca Separadora */}
                <rect x="94" y="0" width="12" height="200" fill="white" />
                <rect x="0" y="94" width="200" height="12" fill="white" />
              </g>

              {/* Clave de Sol (G-Clef) centralizada */}
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

          {/* Texto da Logo conforme imagem */}
          <div className="flex flex-col items-center leading-none">
            <span className="text-gray-800 text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-1">
              Pastoral da
            </span>
            <span className="text-red-600 text-3xl md:text-4xl font-extrabold tracking-widest uppercase">
              Música
            </span>
          </div>

          <p className="text-gray-400 italic mt-3 text-xs md:text-sm font-medium">
            "Em harmonia, louvando a Deus com alegria!"
          </p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
