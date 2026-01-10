
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { getSongsByDate } from '../services/storage';
import { VARIABLE_CATEGORIES } from '../constants';
import { getLiturgicalSundayInfo, formatDateBr } from '../utils/liturgy';

const MassDetail: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  
  const songs = useMemo(() => {
    return date ? getSongsByDate(date) : [];
  }, [date]);

  const organizedRepertoire = useMemo(() => {
    return VARIABLE_CATEGORIES.map(cat => ({
      category: cat,
      song: songs.find(s => s.category === cat)
    }));
  }, [songs]);

  if (!date) return <div className="p-10 text-center">Data não encontrada.</div>;

  const sundayDate = new Date(date + 'T12:00:00');
  const info = getLiturgicalSundayInfo(sundayDate);

  // Mapeamento de Cores Litúrgicas para Classes do Tailwind
  const colorClasses = {
    green: 'bg-emerald-600 text-white',
    white: 'bg-white text-gray-900 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] border-b border-gray-100',
    purple: 'bg-purple-800 text-white',
    red: 'bg-red-600 text-white'
  };

  const headerStyle = colorClasses[info.color] || colorClasses.green;
  const isWhite = info.color === 'white';

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/" className="text-gray-500 hover:text-red-600 transition-colors flex items-center text-sm font-medium">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Início
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        {/* Cabeçalho Litúrgico Dinâmico */}
        <div className={`${headerStyle} px-6 py-10 text-center transition-colors duration-500`}>
          <h3 className="text-xl md:text-2xl font-black mb-2 leading-tight uppercase tracking-tight">
            {info.label}
          </h3>
          <p className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isWhite ? 'text-gray-400' : 'text-white/70'}`}>
            {formatDateBr(sundayDate)}
          </p>
          {info.celebration && info.celebration !== 'Domingo do Tempo Comum' && (
            <div className={`mt-4 inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${isWhite ? 'bg-gray-100 text-gray-500' : 'bg-black/10 text-white/90'}`}>
              {info.celebration}
            </div>
          )}
        </div>

        {/* Link para Ordinário em destaque */}
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
          <Link 
            to="/ordinario" 
            className="flex items-center justify-between group"
          >
            <div>
              <p className="text-sm font-bold text-gray-800">Partes Fixas (Ordinário)</p>
              <p className="text-xs text-gray-500">Ato Penitencial, Glória, Santo e Cordeiro</p>
            </div>
            <div className="bg-white border border-gray-200 text-red-600 px-3 py-1 rounded-full text-xs font-bold group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
              Ver Opções
            </div>
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {organizedRepertoire.map(({ category, song }) => (
            <div key={category} className="p-6">
              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-[10px] font-extrabold uppercase mb-4 tracking-tighter">
                {category}
              </span>
              
              {song ? (
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{song.title}</h4>
                  <div className="text-gray-700 whitespace-pre-wrap font-medium leading-relaxed text-sm bg-gray-50 p-5 rounded-xl border border-gray-100">
                    {song.lyrics}
                  </div>
                  {song.link && (
                    <a 
                      href={song.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V9h2v7zm4 0h-2V9h2v7z"/>
                      </svg>
                      Áudio / Referência Melódica
                    </a>
                  )}
                </div>
              ) : (
                <div className="flex items-center text-gray-300 py-2">
                  <svg className="w-4 h-4 mr-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="italic text-xs font-medium">Repertório em definição para este domingo.</p>
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
