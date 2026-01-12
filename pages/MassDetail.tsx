
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getSongsByDate, getAllSongs } from '../services/storage';
import { SongCategory, Song, LiturgicalSeason } from '../types';
import { getLiturgicalDayInfo, getLiturgicalSeason } from '../utils/liturgy';
import NavigationMenu from '../components/NavigationMenu';

const MassDetail: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollInterval = useRef<number | null>(null);

  const sundayDate = useMemo(() => (date ? new Date(date + 'T12:00:00') : new Date()), [date]);
  const songsForDate = useMemo(() => (date ? getSongsByDate(date) : []), [date]);
  const allSongs = useMemo(() => getAllSongs(sundayDate), [sundayDate]);
  
  const season = useMemo(() => getLiturgicalSeason(sundayDate), [sundayDate]);
  const info = getLiturgicalDayInfo(sundayDate);

  const isGloriaOmitted = (season === LiturgicalSeason.Lent || info.label.includes('Sexta-feira Santa'));

  useEffect(() => {
    if (isAutoScrolling) {
      scrollInterval.current = window.setInterval(() => {
        window.scrollBy({ top: 1, behavior: 'auto' });
      }, 100); 
    } else {
      if (scrollInterval.current) clearInterval(scrollInterval.current);
    }
    return () => { if (scrollInterval.current) clearInterval(scrollInterval.current); };
  }, [isAutoScrolling]);

  if (!date) return null;

  const liturgicalFlow = [
    { category: SongCategory.Entrance },
    { category: SongCategory.Penitential },
    { category: SongCategory.Gloria },
    { category: SongCategory.Acclamation },
    { category: SongCategory.Offertory },
    { category: SongCategory.Holy },
    { category: SongCategory.LambOfGod },
    { category: SongCategory.Communion },
    { category: SongCategory.Dismissal },
  ];

  const colorStyles = {
    green: 'bg-emerald-600 text-white',
    white: 'bg-white text-gray-900 border-b border-gray-100',
    purple: 'bg-purple-800 text-white',
    red: 'bg-red-600 text-white'
  };

  const headerStyle = colorStyles[info.color] || colorStyles.green;
  const isWhite = info.color === 'white';

  return (
    <div className="min-h-screen bg-white pb-60">
      <button 
        onClick={() => setIsAutoScrolling(!isAutoScrolling)}
        className={`fixed bottom-8 right-6 z-[120] p-4 rounded-full shadow-2xl transition-all border flex items-center gap-3 px-6 ${
          isAutoScrolling ? 'bg-red-600 text-white scale-110 border-red-500' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
        }`}
      >
        <span className="text-[9px] font-black uppercase tracking-widest">
          {isAutoScrolling ? 'Parar' : 'Rolagem Auto'}
        </span>
        <svg className={`w-5 h-5 ${isAutoScrolling ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      <div className={`${headerStyle} shadow-sm transition-all duration-300 relative z-[110] sticky top-0 h-12 flex items-center`}>
        <div className="max-w-6xl mx-auto w-full px-6 flex justify-between items-center">
          <button onClick={() => navigate('/')} className={`flex items-center text-[9px] font-black uppercase tracking-widest transition-opacity hover:opacity-70 ${isWhite ? 'text-gray-400' : 'text-white/60'}`}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
          <div className="text-center">
            <h1 className="text-[10px] font-black uppercase tracking-widest leading-none truncate max-w-[150px] sm:max-w-none">{info.label}</h1>
          </div>
          <NavigationMenu light={!isWhite} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 px-6">
        <div className="space-y-16">
          {liturgicalFlow.map((step) => {
            const isOmitted = isGloriaOmitted && step.category === SongCategory.Gloria;
            const options = [
              ...songsForDate.filter(s => s.category === step.category),
              ...allSongs.filter(s => s.category === step.category && s.isFixed)
            ];

            if (isOmitted) {
              return (
                <section key={step.category} className="opacity-30 border-l-2 border-red-600 pl-6 py-2">
                  <h2 className="text-lg font-black uppercase tracking-tighter text-gray-400 mb-1">{step.category}</h2>
                  <p className="text-[8px] font-black text-red-600 uppercase tracking-widest">Omite-se hoje</p>
                </section>
              );
            }

            return (
              <section key={step.category} className="relative">
                <div className="sticky top-12 bg-white/95 backdrop-blur-sm z-[100] border-b-2 border-red-600 pt-6 pb-2 mb-6">
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                    {step.category}
                  </h2>
                </div>

                {options.length > 0 ? (
                  <div className="space-y-12">
                    {options.map((song, sIdx) => {
                      const hasMultipleOptions = options.length > 1;

                      return (
                        <div key={song.id} className="animate-in fade-in duration-500">
                          {hasMultipleOptions && (
                            <div className="sticky top-[84px] bg-white/90 backdrop-blur-md z-[90] flex items-center justify-between py-2 mb-4 border-b border-gray-100">
                              <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">
                                Opção {sIdx + 1}
                              </span>
                              {song.tempo && <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{song.tempo}</span>}
                            </div>
                          )}

                          {!hasMultipleOptions && (
                            <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-2">
                              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-tight">{song.title}</h3>
                              {song.tempo && <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{song.tempo}</span>}
                            </div>
                          )}

                          <div className="font-mono-custom text-2xl md:text-4xl leading-[1.4] text-gray-900 whitespace-pre-wrap selection:bg-red-50">
                            {song.chords && (
                              <div className="mb-6 text-red-600 font-bold bg-red-50/30 p-5 rounded-2xl border border-red-100 text-lg md:text-2xl">
                                <span className="text-[8px] font-black uppercase tracking-widest block mb-1 opacity-40">Tom / Acordes</span>
                                {song.chords}
                              </div>
                            )}
                            <div className="px-1">
                              {song.lyrics}
                            </div>
                          </div>

                          {hasMultipleOptions && sIdx < options.length - 1 && (
                            <div className="pt-12"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-6 border-b border-dashed border-gray-100 text-center">
                    <p className="text-[9px] font-black text-gray-200 uppercase tracking-widest italic">Aguardando repertório...</p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MassDetail;
