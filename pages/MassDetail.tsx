
import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { getSongsByDate, getAllSongs } from '../services/storage';
import { SongCategory, Song } from '../types';
import { getLiturgicalSundayInfo, formatDateBr } from '../utils/liturgy';
import NavigationMenu from '../components/NavigationMenu';

const MassDetail: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [selectedFixedId, setSelectedFixedId] = useState<Record<string, string | null>>({});

  const songs = useMemo(() => (date ? getSongsByDate(date) : []), [date]);
  const allFixedSongs = useMemo(() => getAllSongs().filter(s => s.isFixed), []);

  if (!date) return null;
  const sundayDate = new Date(date + 'T12:00:00');
  const info = getLiturgicalSundayInfo(sundayDate);

  // Ordem Litúrgica Exata conforme solicitação
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
    green: 'bg-emerald-600 text-white',
    white: 'bg-white text-gray-900 border-b border-gray-100 shadow-sm',
    purple: 'bg-purple-800 text-white',
    red: 'bg-red-600 text-white'
  };

  const headerStyle = colorClasses[info.color] || colorClasses.green;
  const isWhite = info.color === 'white';

  return (
    <div className="min-h-screen bg-gray-50/30 pb-20">
      <div className={`${headerStyle} relative transition-colors duration-500`}>
        <div className="max-w-4xl mx-auto px-6 pt-6 flex justify-between items-center">
          <button onClick={() => navigate('/')} className={`flex items-center text-[11px] font-bold transition-opacity hover:opacity-60 ${isWhite ? 'text-gray-400' : 'text-white/60'}`}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs><clipPath id="miniLogoClip"><circle cx="100" cy="100" r="90" /></clipPath></defs>
                  <g clipPath="url(#miniLogoClip)">
                    <rect x="0" y="0" width="100" height="100" fill="#FBBF24" /><rect x="100" y="0" width="100" height="100" fill="#16A34A" /><rect x="0" y="100" width="100" height="100" fill="#0EA5E9" /><rect x="100" y="100" width="100" height="100" fill="#EF4444" />
                  </g>
                  <text x="100" y="145" textAnchor="middle" style={{ fontFamily: 'serif', fontSize: '150px', fill: 'black' }}>𝄞</text>
                </svg>
              </div>
            </Link>
            <NavigationMenu light={!isWhite} />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-xl md:text-3xl font-black mb-1 leading-tight uppercase tracking-tight">{info.label}</h1>
          <p className={`text-[10px] uppercase font-bold tracking-widest ${isWhite ? 'text-gray-400' : 'text-white/70'}`}>{formatDateBr(sundayDate)}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="space-y-4">
          {liturgicalFlow.map((step) => {
            const isExpanded = expandedCategories[step.category];
            
            let songToDisplay: Song | undefined;
            if (step.mode === 'direct') {
              songToDisplay = songs.find(s => s.category === step.category) || allFixedSongs.find(s => s.category === step.category);
            }

            if (step.mode === 'direct') {
              return (
                <div key={step.category} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-red-200 shadow-md ring-4 ring-red-500/5' : 'border-gray-100 shadow-sm'}`}>
                  <button onClick={() => toggleCategory(step.category)} className="w-full px-6 py-5 flex items-center justify-between text-left group">
                    <div className="min-w-0 pr-4">
                      <h3 className={`text-base font-black uppercase tracking-tight transition-colors ${isExpanded ? 'text-red-600' : 'text-gray-900 group-hover:text-red-600'}`}>
                        {step.category}
                      </h3>
                      {songToDisplay && !songToDisplay.isFixed && (
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 truncate">
                           {songToDisplay.title}
                         </p>
                      )}
                    </div>
                    <div className={`flex-shrink-0 p-2 rounded-full transition-all ${isExpanded ? 'bg-red-600 text-white rotate-180' : 'text-gray-300 bg-gray-50'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>

                  {isExpanded && songToDisplay && (
                    <div className="px-6 pb-8 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="text-gray-700 whitespace-pre-wrap font-medium leading-[1.8] text-base md:text-lg border-t border-gray-50 pt-6">
                        {songToDisplay.lyrics}
                      </div>
                      {songToDisplay.link && (
                        <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
                          <a href={songToDisplay.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-red-600 text-[10px] font-black uppercase tracking-widest hover:underline bg-red-50 px-4 py-2 rounded-lg transition-colors">
                            Ouvir Gravação
                            <svg className="w-3.5 h-3.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            } else {
              const options = allFixedSongs.filter(o => o.category === step.category);
              const selectedId = selectedFixedId[step.category];
              const selectedSong = options.find(o => o.id === selectedId);

              return (
                <div key={step.category} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-blue-200 shadow-md ring-4 ring-blue-500/5' : 'border-gray-100 shadow-sm'}`}>
                  <button onClick={() => toggleCategory(step.category)} className="w-full px-6 py-5 flex items-center justify-between text-left group">
                    <h3 className={`text-base font-black uppercase tracking-tight transition-colors ${isExpanded ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'}`}>
                      {step.category}
                    </h3>
                    <div className={`p-2 rounded-full transition-all ${isExpanded ? 'bg-blue-600 text-white rotate-180' : 'text-gray-300 bg-gray-50'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-8 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 gap-2 border-t border-gray-50 pt-4">
                        {options.map((option) => (
                          <div key={option.id} className="space-y-4">
                            <button
                              onClick={() => setSelectedFixedId(prev => ({ ...prev, [step.category]: prev[step.category] === option.id ? null : option.id }))}
                              className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between ${selectedId === option.id ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' : 'bg-gray-50/50 border-transparent text-gray-500 hover:border-gray-200'}`}
                            >
                              <span className="text-xs font-bold uppercase tracking-tight">{option.title}</span>
                              {selectedId === option.id && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </button>
                            {selectedId === option.id && (
                              <div className="p-6 bg-white rounded-xl border border-blue-50 text-gray-700 whitespace-pre-wrap font-medium leading-[1.8] text-base md:text-lg animate-in zoom-in-95 duration-200">
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

export default MassDetail;
