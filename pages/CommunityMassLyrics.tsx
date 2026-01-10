import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getSongsByDate, getAllSongs } from '../services/storage';
import { SongCategory, Song } from '../types';
import { getLiturgicalSundayInfo, formatDateBr } from '../utils/liturgy';

const CommunityMassLyrics: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  
  const [activeFixedId, setActiveFixedId] = useState<Record<string, string | null>>({});

  const songs = useMemo(() => (date ? getSongsByDate(date) : []), [date]);
  const allFixedSongs = useMemo(() => getAllSongs().filter(s => s.isFixed), []);

  if (!date) return null;
  const sundayDate = new Date(date + 'T12:00:00');
  const info = getLiturgicalSundayInfo(sundayDate);

  // Ordem Litúrgica da Missa
  const liturgicalFlow = [
    { category: SongCategory.Entrance, type: 'variable' },
    { category: SongCategory.Penitential, type: 'fixed' },
    { category: SongCategory.Gloria, type: 'fixed' },
    { category: SongCategory.Acclamation, type: 'variable' },
    { category: SongCategory.Offertory, type: 'variable' },
    { category: SongCategory.Holy, type: 'fixed' },
    { category: SongCategory.LambOfGod, type: 'fixed' },
    { category: SongCategory.Communion, type: 'variable' },
    { category: SongCategory.Dismissal, type: 'variable' },
  ];

  const colorClasses = {
    green: 'bg-emerald-600',
    white: 'bg-white border-b border-gray-100 shadow-sm',
    purple: 'bg-purple-800',
    red: 'bg-red-600'
  };

  const headerBg = colorClasses[info.color] || colorClasses.green;
  const isWhiteHeader = info.color === 'white';

  return (
    <div className="min-h-screen bg-white">
      {/* Header Focado */}
      <div className={`${headerBg} px-6 py-10 text-center transition-colors duration-500`}>
        <button 
          onClick={() => navigate('/comunidade')} 
          className={`absolute top-6 left-6 flex items-center text-[10px] font-black uppercase tracking-widest ${isWhiteHeader ? 'text-gray-400' : 'text-white/60'}`}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          Sair
        </button>
        <h1 className={`text-2xl font-black uppercase tracking-tighter mb-2 ${isWhiteHeader ? 'text-gray-900' : 'text-white'}`}>
          {info.label}
        </h1>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isWhiteHeader ? 'text-gray-400' : 'text-white/70'}`}>
          {formatDateBr(sundayDate)}
        </p>
      </div>

      <div className="max-w-2xl mx-auto py-12 px-6">
        <div className="space-y-16">
          {liturgicalFlow.map((step) => {
            if (step.type === 'variable') {
              const song = songs.find(s => s.category === step.category);
              return (
                <section key={step.category} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="mb-6">
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                      {step.category}
                    </span>
                  </div>
                  {song ? (
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">{song.title}</h2>
                      <div className="text-gray-800 whitespace-pre-wrap font-medium leading-[1.8] text-lg md:text-xl">
                        {song.lyrics}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-300 italic text-sm">Canto não definido para este momento.</p>
                  )}
                </section>
              );
            } else {
              const options = allFixedSongs.filter(s => s.category === step.category);
              const selectedId = activeFixedId[step.category];
              const selectedSong = options.find(o => o.id === selectedId);

              return (
                <section key={step.category} className="bg-gray-50/50 rounded-[2.5rem] p-8 border border-gray-100">
                  <div className="mb-6">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                      Parte Fixa: {step.category}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setActiveFixedId(prev => ({
                          ...prev,
                          [step.category]: prev[step.category] === option.id ? null : option.id
                        }))}
                        className={`w-full text-left px-6 py-5 rounded-2xl border transition-all flex items-center justify-between ${
                          selectedId === option.id 
                          ? 'bg-white border-blue-500 shadow-md ring-4 ring-blue-500/5' 
                          : 'bg-white border-transparent hover:border-gray-200'
                        }`}
                      >
                        <span className="text-sm font-black text-gray-900 uppercase tracking-tight">{option.title}</span>
                        <div className={`p-1 rounded-full transition-transform ${selectedId === option.id ? 'rotate-180 bg-blue-500 text-white' : 'text-gray-300'}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedSong && (
                    <div className="mt-8 pt-8 border-t border-gray-200 animate-in fade-in zoom-in-95 duration-300">
                      <div className="text-gray-800 whitespace-pre-wrap font-medium leading-[1.8] text-lg md:text-xl">
                        {selectedSong.lyrics}
                      </div>
                    </div>
                  )}
                </section>
              );
            }
          })}
        </div>

        <div className="mt-24 pt-12 border-t border-gray-100 text-center">
          <button 
            onClick={() => navigate('/comunidade')}
            className="px-10 py-5 bg-gray-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-colors shadow-xl"
          >
            Voltar para as missas
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityMassLyrics;