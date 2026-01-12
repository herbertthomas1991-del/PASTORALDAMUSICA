
import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getSongsByDate, getAllSongs } from '../services/storage';
import { SongCategory, Song, LiturgicalSeason } from '../types';
import { getLiturgicalDayInfo, getLiturgicalSeason } from '../utils/liturgy';

const CommunityMassLyrics: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [activeFixedId, setActiveFixedId] = useState<Record<string, string | null>>({});

  const sundayDate = useMemo(() => (date ? new Date(date + 'T12:00:00') : new Date()), [date]);
  
  const songs = useMemo(() => (date ? getSongsByDate(date) : []), [date]);
  const allFixedSongs = useMemo(() => getAllSongs(sundayDate).filter(s => s.isFixed), [sundayDate]);

  const season = useMemo(() => getLiturgicalSeason(sundayDate), [sundayDate]);
  const info = getLiturgicalDayInfo(sundayDate);

  // Regra Litúrgica: Omitir Glória na Quaresma e na Sexta-feira Santa
  const isGloriaOmitted = (season === LiturgicalSeason.Lent || info.label.includes('Sexta-feira Santa'));

  if (!date) return null;

  const liturgicalFlow = [
    { category: SongCategory.Entrance, mode: 'direct' },
    { category: SongCategory.Penitential, mode: 'menu' },
    { category: SongCategory.Gloria, mode: 'direct' },
    { category: SongCategory.Acclamation, mode: 'direct' },
    { category: SongCategory.Offertory, mode: 'direct' },
    { category: SongCategory.Holy, mode: 'direct' },
    { category: SongCategory.LambOfGod, mode: 'direct' },
    { category: SongCategory.Communion, mode: 'direct' },
    { category: SongCategory.Dismissal, mode: 'direct' },
  ];

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const colorClasses = {
    green: 'bg-emerald-600',
    white: 'bg-white border-b-4 border-amber-100 shadow-lg',
    purple: 'bg-purple-800',
    red: 'bg-red-600'
  };

  const headerBg = colorClasses[info.color] || colorClasses.green;
  const isWhiteHeader = info.color === 'white';

  return (
    <div className="min-h-screen bg-gray-50/20 pb-20">
      <div className={`${headerBg} px-6 py-14 text-center transition-all duration-500 relative z-10`}>
        <button onClick={() => navigate('/comunidade')} className={`absolute top-8 left-6 flex items-center text-[10px] font-black uppercase tracking-widest ${isWhiteHeader ? 'text-gray-400' : 'text-white/60'}`}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          Calendário
        </button>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <div className={`flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl ${isWhiteHeader ? 'bg-gray-100' : 'bg-white/10'} flex-shrink-0 transition-all border border-white/10`}>
            <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-[-2px] ${isWhiteHeader ? 'text-gray-300' : 'text-white/40'}`}>DIA</span>
            <span className={`text-3xl md:text-5xl font-black tracking-tighter leading-none ${isWhiteHeader ? 'text-gray-900' : 'text-white'}`}>
              {sundayDate.getDate()}
            </span>
          </div>
          
          <div className="min-w-0 text-center md:text-left md:border-l-2 md:border-current/10 md:pl-8">
            <h1 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2 ${isWhiteHeader ? 'text-gray-900' : 'text-white'}`}>
              {info.label}
            </h1>
            {info.description && (
              <p className={`text-sm md:text-xl font-bold tracking-tight uppercase ${isWhiteHeader ? 'text-gray-400' : 'text-white/80'}`}>
                {info.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="space-y-6">
          {liturgicalFlow.map((step) => {
            const isExpanded = expandedCategories[step.category];
            const isOmittedStep = isGloriaOmitted && step.category === SongCategory.Gloria;
            
            let songToDisplay: Song | undefined;
            if (step.mode === 'direct' && !isOmittedStep) {
              songToDisplay = songs.find(s => s.category === step.category) || allFixedSongs.find(s => s.category === step.category);
            }

            if (isOmittedStep) {
              return (
                <div key={step.category} className="bg-white/50 rounded-3xl border border-gray-100 shadow-sm opacity-60">
                   <div className="w-full px-10 py-8 flex items-center justify-between text-left">
                    <div className="min-w-0 pr-4">
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-gray-300 leading-none">
                        {step.category}
                      </h3>
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mt-2">Omite-se nesta celebração</p>
                    </div>
                    <div className="flex-shrink-0 p-3 rounded-full text-gray-200 bg-gray-50">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M18 12H6" /></svg>
                    </div>
                  </div>
                </div>
              );
            }

            if (step.mode === 'direct') {
              return (
                <div key={step.category} className={`bg-white rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${isExpanded ? 'border-red-200 shadow-2xl ring-8 ring-red-50/50' : 'border-gray-100 shadow-sm'}`}>
                  <button onClick={() => toggleCategory(step.category)} className="w-full px-10 py-8 flex items-center justify-between text-left group">
                    <div className="min-w-0 pr-6">
                      <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors leading-none ${isExpanded ? 'text-red-600' : 'text-gray-900 group-hover:text-red-600'}`}>
                        {step.category}
                      </h3>
                      {songToDisplay && !songToDisplay.isFixed && (
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 truncate">{songToDisplay.title}</p>
                      )}
                    </div>
                    <div className={`flex-shrink-0 p-3 rounded-full transition-all duration-500 ${isExpanded ? 'bg-red-600 text-white rotate-180 scale-110 shadow-lg' : 'text-gray-200 bg-gray-50'}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>
                  {isExpanded && songToDisplay && (
                    <div className="px-10 pb-12 pt-6 animate-in fade-in slide-in-from-top-4 duration-500 border-t border-gray-50 bg-gray-50/10">
                      <div className="text-gray-800 whitespace-pre-wrap font-medium leading-[1.6] text-xl md:text-3xl italic">
                        {songToDisplay.lyrics}
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              const options = allFixedSongs.filter(o => o.category === step.category);
              const selectedId = activeFixedId[step.category];

              return (
                <div key={step.category} className={`bg-white rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${isExpanded ? 'border-blue-200 shadow-2xl ring-8 ring-blue-50/50' : 'border-gray-100 shadow-sm'}`}>
                  <button onClick={() => toggleCategory(step.category)} className="w-full px-10 py-8 flex items-center justify-between text-left group">
                    <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors leading-none ${isExpanded ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'}`}>
                      {step.category}
                    </h3>
                    <div className={`p-3 rounded-full transition-all duration-500 ${isExpanded ? 'bg-blue-600 text-white rotate-180 scale-110 shadow-lg' : 'text-gray-200 bg-gray-50'}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-10 pb-12 pt-6 border-t border-gray-50 animate-in fade-in slide-in-from-top-4 duration-500 bg-gray-50/10">
                      <div className="grid grid-cols-1 gap-4">
                        {options.map((option) => (
                          <div key={option.id} className="space-y-4">
                            <button
                              onClick={() => setActiveFixedId(prev => ({ ...prev, [step.category]: prev[step.category] === option.id ? null : option.id }))}
                              className={`w-full text-left px-8 py-5 rounded-2xl border transition-all flex items-center justify-between ${selectedId === option.id ? 'bg-blue-600 border-blue-600 text-white shadow-xl scale-[1.02]' : 'bg-white border-gray-100 text-gray-500 hover:border-blue-200'}`}
                            >
                              <span className="text-lg font-black uppercase tracking-tight">{option.title}</span>
                              {selectedId === option.id && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </button>
                            {selectedId === option.id && (
                              <div className="p-10 bg-white rounded-3xl border border-blue-50 shadow-inner text-gray-800 whitespace-pre-wrap font-medium leading-[1.6] text-xl md:text-3xl italic">
                                {option.lyrics}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default CommunityMassLyrics;
