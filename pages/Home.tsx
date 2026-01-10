
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import Header from '../components/Header';
import { getLiturgicalYear, getLiturgicalSeason, getSundaysOfMonth, getLiturgicalSundayInfo, toDateString } from '../utils/liturgy';

const Home: React.FC = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  
  const year = getLiturgicalYear(viewDate);
  const season = getLiturgicalSeason(viewDate);
  
  const sundays = useMemo(() => {
    return getSundaysOfMonth(viewDate.getFullYear(), viewDate.getMonth());
  }, [viewDate]);

  const nextMassIndex = useMemo(() => {
    return sundays.findIndex(sunday => {
      const sDate = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate());
      return sDate >= today;
    });
  }, [sundays, today]);

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const goToToday = () => {
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const liturgicalTextColorMap = {
    green: 'text-emerald-600',
    white: 'text-amber-500', 
    purple: 'text-purple-600',
    red: 'text-red-600'
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 mb-10 overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="p-5 flex flex-col items-center justify-center text-center">
              <h2 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Ano Litúrgico</h2>
              <span className="text-base md:text-lg font-black text-gray-900 leading-tight">Ano {year}</span>
            </div>
            <div className="p-5 flex flex-col items-center justify-center text-center">
              <h2 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Tempo Atual</h2>
              <span className="text-base md:text-lg font-black text-gray-900 leading-tight">{season}</span>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col items-center mb-10 gap-4">
            <div className="flex items-center bg-white border border-gray-100 rounded-full p-1 shadow-md">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="px-6 text-center min-w-[160px]">
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest block leading-none">
                  {viewDate.toLocaleDateString('pt-BR', { month: 'long' })}
                </span>
              </div>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            {(viewDate.getMonth() !== now.getMonth() || viewDate.getFullYear() !== now.getFullYear()) && (
              <button onClick={goToToday} className="text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline px-3 py-1 transition-all">
                Voltar para este mês
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sundays.map((sunday, idx) => {
              const sundayOnlyDate = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate());
              const isToday = sundayOnlyDate.getTime() === today.getTime();
              const isPast = sundayOnlyDate < today;
              const isNext = idx === nextMassIndex;
              const info = getLiturgicalSundayInfo(sunday);
              
              let cardClasses = "bg-white border-gray-100 shadow-md hover:border-red-200 hover:shadow-lg";
              let textClasses = "text-gray-400";
              let dateClasses = liturgicalTextColorMap[info.color];
              let labelClasses = "text-gray-900";

              if (isToday) {
                cardClasses = "bg-white border-red-500 shadow-xl ring-4 ring-red-500/5 translate-y-[-2px]";
              } else if (isPast) {
                cardClasses = "bg-gray-50/50 border-gray-100 opacity-60 grayscale-[0.3] shadow-md";
                textClasses = "text-gray-300";
                dateClasses = "text-gray-400";
                labelClasses = "text-gray-400";
              } else if (isNext) {
                cardClasses = "bg-white border-red-300 shadow-lg translate-y-[-1px]";
              }

              return (
                <Link key={idx} to={`/missa/${toDateString(sunday)}`} className={`group relative flex items-center p-5 rounded-2xl border transition-all duration-300 ${cardClasses}`}>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 mr-5 transition-colors group-hover:bg-red-50`}>
                    <span className={`font-black text-xl md:text-2xl tracking-tighter ${dateClasses}`}>
                      {sunday.getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className={`text-[10px] font-black uppercase tracking-tight truncate ${labelClasses}`}>
                        {info.label}
                      </h4>
                      {isToday && <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>}
                    </div>
                    <p className={`text-[10px] font-medium uppercase tracking-wider truncate ${textClasses}`}>
                      {info.celebration}
                    </p>
                  </div>
                  <div className="text-gray-200 group-hover:text-red-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <div className="mt-12 text-center">
          <Link to="/admin" className="inline-flex items-center px-5 py-2.5 rounded-full bg-white border border-gray-100 text-gray-300 hover:text-red-600 hover:border-red-200 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95">
            Acesso Restrito
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
