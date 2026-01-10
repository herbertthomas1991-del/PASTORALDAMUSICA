
import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { getAllSongs } from '../services/storage';
import { FIXED_CATEGORIES } from '../constants';

const Ordinario: React.FC = () => {
  const allSongs = useMemo(() => getAllSongs(), []);
  
  const fixedSections = useMemo(() => {
    return FIXED_CATEGORIES.map(cat => ({
      category: cat,
      options: allSongs.filter(s => s.category === cat)
    }));
  }, [allSongs]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/" className="text-gray-500 hover:text-red-600 transition-colors flex items-center text-sm font-medium">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Início
        </Link>
        <h2 className="text-xl font-bold text-gray-800">Ordinário da Missa</h2>
      </div>

      <div className="bg-blue-600 p-6 rounded-2xl shadow-lg mb-8 text-white">
        <h3 className="text-2xl font-bold mb-2">Partes Fixas</h3>
        <p className="text-blue-100 text-sm opacity-90">
          Cantos cujas letras não mudam, variando apenas a melodia. Abaixo estão as opções que o coro costuma utilizar.
        </p>
      </div>

      <div className="space-y-12">
        {fixedSections.map(({ category, options }) => (
          <section key={category}>
            <div className="flex items-center mb-4">
              <div className="h-8 w-1 bg-red-600 rounded-full mr-3"></div>
              <h4 className="text-lg font-bold text-gray-900 uppercase tracking-tight">{category}</h4>
            </div>

            {options.length === 0 ? (
              <p className="text-gray-400 italic text-sm ml-4">Nenhuma opção cadastrada ainda.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {options.map(song => (
                  <div key={song.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="text-lg font-bold text-gray-800 mb-3">{song.title}</h5>
                    <div className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto mb-4 border-l-2 border-gray-100 pl-4 font-medium">
                      {song.lyrics}
                    </div>
                    {song.link && (
                      <a 
                        href={song.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 text-xs font-bold hover:underline inline-flex items-center"
                      >
                        Escutar melodia
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Ordinario;
