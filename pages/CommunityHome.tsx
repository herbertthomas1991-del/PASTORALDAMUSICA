import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import Header from '../components/Header';
import { getSundaysOfMonth, getLiturgicalSundayInfo } from '../utils/liturgy';

const CommunityHome: React.FC = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  
  const sundays = useMemo(() => getSundaysOfMonth(viewDate.getFullYear(), viewDate.getMonth()), [viewDate]);
  
  const nextMassIndex = useMemo(() => {
    return sundays.findIndex(sunday => {
      const sDate = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate());
      return sDate >= today;
    });
  }, [sundays, today]);

  const liturgicalTextColorMap = {
    green: 'text-emerald-600',
    white: 'text-amber-500', 
    purple: 'text-purple-600',
    red: 'text-red-600'
  };

  return (
    <>
      <Header hideMenu logoLink="/comunidade" />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
            CANTE A MISSA
          </h2>
          <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
            Acompanhe as letras das músicas do dia
          </p>
        </div>

        <div className="flex justify-center items-center mb-10 gap-6">
          <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="p-2 text-gray-300 hover:text-red-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="text-center min-w-[150px]">
            <span className="text-sm md:text-base font-black text-gray-900 uppercase tracking-widest block">{viewDate.toLocaleDateString('pt-BR', { month: 'long' })}</span>
            <span className="text-[10px] font-bold text-gray-400 block uppercase">{viewDate.getFullYear()}</span>
          </div>
          <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} className="p-2 text-gray-300 hover:text-red-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sundays.map((sunday, idx) => {
            const sDate = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate());
            const isToday = sDate.getTime() === today.getTime();
            const isNext = idx === nextMassIndex;
            const info = getLiturgicalSundayInfo(sunday);
            
            return (
              <Link 
                key={idx} 
                to={`/comunidade/missa/${sunday.toISOString().split('T')[0]}`}
                className={`flex items-center justify-between p-6 bg-white rounded-3xl border transition-all hover:scale-[1.01] active:scale-[0.99] ${
                  isToday || isNext ? 'border-red-500 shadow-xl ring-4 ring-red-500/5' : 'border-gray-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className={`text-2xl md:text-3xl font-black ${liturgicalTextColorMap[info.color]}`}>{sunday.getDate()}</span>
                  <div>
                    <h3 className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-tight">{info.label}</h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider">{info.celebration}</p>
                  </div>
                </div>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors ${isToday || isNext ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-300'}`}>
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommunityHome;