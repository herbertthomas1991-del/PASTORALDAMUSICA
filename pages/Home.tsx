
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { getLiturgicalYear, getLiturgicalSeason, getSignificantLiturgicalDaysOfMonth, getLiturgicalDayInfo, toDateString } from '../utils/liturgy';
import NavigationMenu from '../components/NavigationMenu';

const Home: React.FC = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  
  const currentLiturgicalYear = getLiturgicalYear(viewDate);
  const viewedSeason = getLiturgicalSeason(viewDate);
  
  const liturgicalDays = useMemo(() => {
    return getSignificantLiturgicalDaysOfMonth(viewDate.getFullYear(), viewDate.getMonth());
  }, [viewDate]);

  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const goToToday = () => setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));

  const liturgicalTextColorMap = {
    green: 'text-emerald-600',
    white: 'text-gray-900', 
    purple: 'text-purple-600',
    red: 'text-red-600'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 drop-shadow-md">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs><clipPath id="homeLogoClip"><circle cx="100" cy="100" r="90" /></clipPath></defs>
                <g clipPath="url(#homeLogoClip)">
                  <rect x="0" y="0" width="100" height="100" fill="#FBBF24" /><rect x="100" y="0" width="100" height="100" fill="#16A34A" /><rect x="0" y="100" width="100" height="100" fill="#0EA5E9" /><rect x="100" y="100" width="100" height="100" fill="#EF4444" />
                </g>
                <text x="100" y="145" textAnchor="middle" style={{ fontFamily: 'serif', fontSize: '150px', fill: 'black' }}>𝄞</text>
              </svg>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hidden sm:inline">Repertório Litúrgico</span>
          </div>
          <NavigationMenu light />
        </div>
        
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-20 text-center relative z-10">
          <div className="inline-flex items-center gap-3 mb-6 bg-black/10 px-4 py-1.5 rounded-full border border-white/5">
            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest border-r border-white/10 pr-3">Ano {currentLiturgicalYear}</span>
            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{viewedSeason}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
            PASTORAL DA MÚSICA
          </h1>
          <p className="text-white/80 text-xl md:text-3xl font-medium italic whitespace-nowrap tracking-tight leading-none" style={{ textTransform: 'none' }}>
            "Em harmonia, louvando a Deus com alegria!"
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="pt-12 pb-6 border-b border-gray-100 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-2">Acesso ao Repertório</span>
            <p className="text-2xl md:text-3xl lg:text-4xl font-black text-black tracking-tighter leading-tight">
              Selecione o dia para ver as músicas!
            </p>
          </div>
          <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm self-start md:self-auto">
            {viewDate?.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {liturgicalDays.map((day, idx) => {
              const info = getLiturgicalDayInfo(day);
              const dayOnlyDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
              const isToday = dayOnlyDate.getTime() === today.getTime();
              const isPast = dayOnlyDate < today;
              
              let cardClasses = "bg-white border-gray-100 shadow-sm hover:border-red-200 hover:shadow-lg hover:scale-[1.02]";
              if (isToday) cardClasses = "bg-white border-red-500 shadow-2xl ring-8 ring-red-500/5 scale-[1.03] z-10";
              else if (isPast) cardClasses = "bg-gray-50/80 border-gray-200 opacity-80 grayscale-[0.2]";

              return (
                <Link key={idx} to={`/missa/${toDateString(day)}`} className={`group flex items-center p-8 rounded-[2.5rem] border transition-all duration-300 ${cardClasses}`}>
                  <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 mr-6 flex-shrink-0 transition-colors ${isToday ? 'bg-red-50' : ''}`}>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-[-2px]">DIA</span>
                    <span className={`font-black text-3xl tracking-tighter leading-none ${liturgicalTextColorMap[info.color]}`}>
                      {day.getDate()}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xl md:text-2xl leading-tight font-black uppercase tracking-tight ${isPast ? 'text-gray-500' : 'text-gray-900'}`}>
                      {info.label}
                    </h4>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mt-1 truncate">
                      {info.description || info.celebrationType}
                    </p>
                  </div>
                  
                  <div className={`ml-2 transition-all ${isToday ? 'text-red-500 scale-125' : 'text-gray-100 group-hover:text-red-500 group-hover:translate-x-1'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="flex justify-center pb-16">
          <div className="flex items-center gap-2 bg-white p-3 rounded-3xl shadow-xl border border-gray-100">
            <button onClick={prevMonth} className="w-11 h-11 flex items-center justify-center rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="px-6 flex flex-col items-center min-w-[140px]">
              <span className="text-sm font-black text-gray-900 uppercase tracking-widest">
                {viewDate?.toLocaleDateString('pt-BR', { month: 'long' })}
              </span>
            </div>
            <button onClick={nextMonth} className="w-11 h-11 flex items-center justify-center rounded-2xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="w-px h-6 bg-gray-100 mx-2"></div>
            <button onClick={goToToday} className="px-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95">Hoje</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
