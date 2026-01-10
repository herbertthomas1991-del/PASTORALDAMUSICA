
import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { getSongsByDate } from '../services/storage';
import { VARIABLE_CATEGORIES } from '../constants';
import { getLiturgicalSundayInfo, formatDateBr } from '../utils/liturgy';
import NavigationMenu from '../components/NavigationMenu';

const MassDetail: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  
  const songs = useMemo(() => {
    return date ? getSongsByDate(date) : [];
  }, [date]);

  const organizedRepertoire = VARIABLE_CATEGORIES.map(cat => ({
    category: cat,
    song: songs.find(s => s.category === cat)
  }));

  if (!date) return null;

  const sundayDate = new Date(date + 'T12:00:00');
  const info = getLiturgicalSundayInfo(sundayDate);

  const colorClasses = {
    green: 'bg-emerald-600 text-white',
    white: 'bg-white text-gray-900 border-b border-gray-100 shadow-sm',
    purple: 'bg-purple-800 text-white',
    red: 'bg-red-600 text-white'
  };

  const headerStyle = colorClasses[info.color] || colorClasses.green;
  const isWhite = info.color === 'white';

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header Compacto */}
      <div className={`${headerStyle} relative transition-colors duration-500`}>
        <div className="max-w-4xl mx-auto px-6 pt-6 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className={`flex items-center text-[11px] font-bold transition-opacity hover:opacity-60 ${isWhite ? 'text-gray-400' : 'text-white/60'}`}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs><clipPath id="miniLogoClip"><circle cx="100" cy="100" r="90" /></clipPath></defs>
                  <g clipPath="url(#miniLogoClip)">
                    <rect x="0" y="0" width="100" height="100" fill="#FBBF24" />
                    <rect x="100" y="0" width="100" height="100" fill="#16A34A" />
                    <rect x="0" y="100" width="100" height="100" fill="#0EA5E9" />
                    <rect x="100" y="100" width="100" height="100" fill="#EF4444" />
                    <rect x="94" y="0" width="12" height="200" fill="white" />
                    <rect x="0" y="94" width="200" height="12" fill="white" />
                  </g>
                  <text x="100" y="145" textAnchor="middle" style={{ fontFamily: 'serif', fontSize: '150px', fill: 'black' }}>𝄞</text>
                </svg>
              </div>
            </Link>
            <NavigationMenu light={!isWhite} />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-10 text-center">
          <h1 className="text-xl md:text-3xl font-black mb-2 leading-tight uppercase tracking-tight">{info.label}</h1>
          <p className={`text-[10px] uppercase font-bold tracking-widest ${isWhite ? 'text-gray-400' : 'text-white/70'}`}>{formatDateBr(sundayDate)}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-10 px-4">
        {/* Link para o Ordinário (Fixas) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 mb-8 group hover:border-blue-200 transition-all cursor-pointer" onClick={() => navigate('/ordinario')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
               </div>
               <div>
                <p className="text-[11px] font-bold text-gray-900 uppercase tracking-wide">Ordinário da Missa</p>
                <p className="text-[10px] text-gray-400 font-medium">Partes fixas: Glória, Santo, Cordeiro...</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-gray-200 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </div>
        </div>

        {/* Card Principal de Repertório */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {organizedRepertoire.map(({ category, song }, index) => (
            <div key={category} className={`p-8 md:p-10 ${index !== organizedRepertoire.length - 1 ? 'border-b border-gray-50' : ''}`}>
              {/* Categoria (Pill/Badge) */}
              <div className="inline-block px-3 py-1.5 bg-gray-100 rounded-md mb-6">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{category}</span>
              </div>

              {song ? (
                <div className="animate-in fade-in duration-500">
                  <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">{song.title}</h4>
                  <div className="text-gray-700 whitespace-pre-wrap font-medium leading-[1.8] text-base md:text-lg">{song.lyrics}</div>
                  {song.link && (
                    <div className="mt-8 pt-6 border-t border-gray-50">
                      <a href={song.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline">
                        Ouvir no YouTube
                        <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm font-medium italic opacity-80">Repertório em definição para este domingo.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MassDetail;
