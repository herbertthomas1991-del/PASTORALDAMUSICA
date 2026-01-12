import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { getAllSongs } from '../services/storage';

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
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">Ordinário da Missa</span>
            <h1 className="text-lg font-black text-gray-900 uppercase tracking-tight">{decodedCategory}</h1>
          </div>
          <Link to="/" className="w-8 h-8 opacity-20 hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 200 200" className="w-full h-full grayscale"><g><rect x="0" y="0" width="100" height="100" fill="#333" /><rect x="100" y="0" width="100" height="100" fill="#333" /><rect x="0" y="100" width="100" height="100" fill="#333" /><rect x="100" y="100" width="100" height="100" fill="#333" /></g><text x="100" y="145" textAnchor="middle" style={{ fontFamily: 'serif', fontSize: '150px', fill: 'white' }}>𝄞</text></svg>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-6">
        {songs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-gray-100 border-dashed">
            <p className="text-gray-400 text-lg font-black uppercase tracking-widest italic">Aguardando repertório oficial...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {songs.map((song) => (
              <div 
                key={song.id} 
                className={`bg-white rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                  expandedId === song.id ? 'border-blue-200 shadow-2xl ring-8 ring-blue-50/50' : 'border-gray-100 shadow-sm'
                }`}
              >
                <button 
                  onClick={() => toggleAccordion(song.id)}
                  className="w-full px-10 py-8 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors group"
                >
                  <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors ${expandedId === song.id ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-500'}`}>
                    {song.title}
                  </h3>
                  <div className={`p-3 rounded-full transition-all duration-500 ${
                    expandedId === song.id ? 'bg-blue-600 text-white rotate-180 scale-110 shadow-lg' : 'bg-gray-50 text-gray-300'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                
                <div className={`transition-all duration-500 ease-in-out ${
                  expandedId === song.id ? 'max-h-[3000px] opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                  <div className="p-10 md:p-14 bg-gray-50/20">
                    <div className="font-mono-custom text-xl md:text-3xl lg:text-4xl text-gray-900 whitespace-pre-wrap leading-[1.5] selection:bg-blue-100">
                      {song.lyrics}
                    </div>
                    {song.link && (
                      <div className="mt-12 pt-10 border-t border-gray-100 flex justify-end">
                        <a href={song.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                          Referência em Áudio
                          <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
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