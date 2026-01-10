
import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getSongsByDate, getAllSongs } from '../services/storage';
import { SongCategory, Song } from '../types';
import { getLiturgicalSundayInfo, formatDateBr } from '../utils/liturgy';

const CommunityMassLyrics: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [activeFixedId, setActiveFixedId] = useState<Record<string, string | null>>({});

  const sundayDate = useMemo(() => (date ? new Date(date + 'T12:00:00') : new Date()), [date]);
  
  const songs = useMemo(() => (date ? getSongsByDate(date) : []), [date]);
  const allFixedSongs = useMemo(() => getAllSongs(sundayDate).filter(s => s.isFixed), [sundayDate]);

  if (!date) return null;
  const info = getLiturgicalSundayInfo(sundayDate);

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
    white: 'bg-white border-b border-gray-100 shadow-sm',
    purple: 'bg-purple-800',
    red: 'bg-red-600'
  };

  const headerBg = colorClasses[info.color] || colorClasses.green;
  const isWhiteHeader = info.color === 'white';

  return (
    <div className="min-h-screen bg-gray-50/20 pb-20">
      <div className={`${headerBg} px-6 py-10 text-center transition-colors duration-500 relative shadow-sm`}>
        <button onClick={() => navigate('/comunidade')} className={`absolute top-1/2 -translate-y-1/2 left-6 flex items-center text-xs font-black uppercase tracking-widest ${isWhiteHeader ? 'text-gray-400' : 'text-white/60'}`}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          Sair
        </button>
        <h1 className={`text-xl md:text-2xl font-black uppercase tracking-tight ${isWhiteHeader ? 'text-gray-900' : 'text-white'}`}>
          {info.label}
        </h1>
        <p className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${isWhiteHeader ? 'text-gray-400' : 'text-white/70'}`}>
          {formatDateBr(sundayDate)}
        </p>
      </div>

      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="space-y-4">
          {liturgicalFlow.map((step) => {
            const isExpanded = expandedCategories[step.category];
            let songToDisplay: Song | undefined;
            if (step.mode === 'direct') {
              songToDisplay = songs.find(s => s.category === step.category) || allFixedSongs.find(s => s.category === step.category);
            }

            if (step.mode === 'direct') {
              return (
                <div key={step.category} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-red-200 shadow-md' : 'border-gray-100 shadow-sm'}`}>
                  <button onClick={() => toggleCategory(step.category)} className="w-full px-6 py-5 flex items-center justify-between text-left group">
                    <div className="min-w-0 pr-4">
                      <h3 className={`text-sm md:text-base font-black uppercase tracking-tight transition-colors ${isExpanded ? 'text-red-600' : 'text-gray-900 group-hover:text-red-600'}`}>
                        {step.category}
                      </h3>
                      {songToDisplay && !songToDisplay.isFixed && (
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 truncate">{songToDisplay.title}</p>
                      )}
                    </div>
                    <div className={`flex-shrink-0 p-1.5 rounded-full transition-all ${isExpanded ? 'bg-red-600 text-white rotate-180' : 'text-gray-200 bg-gray-50'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>
                  {isExpanded && songToDisplay && (
                    <div className="px-6 pb-8 pt-4 animate-in fade-in slide-in-from-top-2 duration-300 border-t border-gray-50">
                      <div className="text-gray-700 whitespace-pre-wrap font-medium leading-[1.8] text-base md:text-lg">
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
                <div key={step.category} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-blue-200 shadow-md' : 'border-gray-100 shadow-sm'}`}>
                  <button onClick={() => toggleCategory(step.category)} className="w-full px-6 py-5 flex items-center justify-between text-left group">
                    <h3 className={`text-sm md:text-base font-black uppercase tracking-tight transition-colors ${isExpanded ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'}`}>
                      {step.category}
                    </h3>
                    <div className={`p-1.5 rounded-full transition-all ${isExpanded ? 'bg-blue-600 text-white rotate-180' : 'text-gray-200 bg-gray-50'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-6 pb-8 pt-4 border-t border-gray-50 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 gap-2">
                        {options.map((option) => (
                          <div key={option.id} className="space-y-4">
                            <button
                              onClick={() => setActiveFixedId(prev => ({ ...prev, [step.category]: prev[step.category] === option.id ? null : option.id }))}
                              className={`w-full text-left px-5 py-3 rounded-xl border transition-all flex items-center justify-between ${selectedId === option.id ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' : 'bg-gray-50/50 border-transparent text-gray-500'}`}
                            >
                              <span className="text-xs font-bold uppercase tracking-tight">{option.title}</span>
                              {selectedId === option.id && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </button>
                            {selectedId === option.id && (
                              <div className="p-6 bg-white rounded-xl border border-blue-50 text-gray-700 whitespace-pre-wrap font-medium leading-[1.8] text-base md:text-lg">
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
