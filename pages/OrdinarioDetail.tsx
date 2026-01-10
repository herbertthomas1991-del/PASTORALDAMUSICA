import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { getAllSongs } from '../services/storage';
import { Song } from '../types';

const OrdinarioDetail: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const decodedCategory = decodeURIComponent(category || '');
  
  const songs = useMemo(() => {
    return getAllSongs().filter(s => s.category === decodedCategory);
  }, [decodedCategory]);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center text-[11px] font-bold text-gray-400 hover:text-gray-900 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">Ordinário</span>
            <h1 className="text-sm font-black text-gray-900 uppercase tracking-tight">{decodedCategory}</h1>
          </div>
          <Link to="/" className="w-8 h-8 opacity-20 hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 200 200" className="w-full h-full grayscale">
              <g>
                <rect x="0" y="0" width="100" height="100" fill="#333" />
                <rect x="100" y="0" width="100" height="100" fill="#333" />
                <rect x="0" y="100" width="100" height="100" fill="#333" />
                <rect x="100" y="100" width="100" height="100" fill="#333" />
              </g>
              <text x="100" y="145" textAnchor="middle" style={{ fontFamily: 'serif', fontSize: '150px', fill: 'white' }}>𝄞</text>
            </svg>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-4">
        {songs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
            <p className="text-gray-400 text-sm font-medium italic">Nenhuma opção cadastrada localmente.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {songs.map((song) => (
              <div 
                key={song.id} 
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  expandedId === song.id ? 'border-blue-200 shadow-md ring-4 ring-blue-50/50' : 'border-gray-100 shadow-sm'
                }`}
              >
                <button 
                  onClick={() => toggleAccordion(song.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
                >
                  <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">{song.title}</h3>
                  <div className={`p-2 rounded-full transition-all duration-300 ${
                    expandedId === song.id ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-50 text-gray-300'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                
                <div className={`transition-all duration-300 ease-in-out ${
                  expandedId === song.id ? 'max-h-[2000px] opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                  <div className="p-8 md:p-10 bg-gray-50/30">
                    <div className="text-gray-700 whitespace-pre-wrap font-medium leading-[1.8] text-base md:text-lg">
                      {song.lyrics}
                    </div>
                    {song.link && (
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <a href={song.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 text-[10px] font-bold uppercase tracking-widest hover:underline">
                          Ver referência musical
                          <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdinarioDetail;