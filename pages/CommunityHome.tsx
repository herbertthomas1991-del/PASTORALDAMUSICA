import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { getLiturgicalYear, getLiturgicalSeason, getSundaysOfMonth, getLiturgicalSundayInfo } from '../utils/liturgy';

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
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <div className="w-20 h-20 mx-auto mb-6">
          <Link to="/comunidade"> {/* Logo agora volta para a home da comunidade, não do site global */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs><clipPath id="communityLogo"><circle cx="100" cy="100" r="90" /></clipPath></defs>
              <g clipPath="url(#communityLogo)">
                <rect x="0" y="0" width="100" height="100" fill="#FBBF24" />
                <rect x="100" y="0" width="100" height="100" fill="#16A34A" />
                <rect x="0" y="100" width="100" height="100" fill="#0EA5E9" />
                <rect x="100" y="100" width="100" height="100" fill="#EF4444" />
              </g>
              <text x="100" y="145" textAnchor="middle" style={{ fontFamily: 'serif', fontSize: '150px', fill: 'white' }}>𝄞</text>
            </svg>
          </Link>
        </div>
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Acompanhe a Missa</h1>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Pastoral da Música • Assembleia</p>
      </div>

      <div className="flex justify-center items-center mb-10 gap-6">
        <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="p-2 text-gray-300 hover:text-red-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-center min-w-[150px]">
          <span className="text-lg font-black text-gray-900 uppercase tracking-widest block">{viewDate.toLocaleDateString('pt-BR', { month: 'long' })}</span>
          <span className="text-xs font-bold text-gray-400 block">{viewDate.getFullYear()}</span>
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
              className={`flex items-center justify-between p-6 bg-white rounded-3xl border transition-all ${
                isToday || isNext ? 'border-red-500 shadow-lg ring-4 ring-red-500/5' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center gap-6">
                <span className={`text-3xl font-black ${liturgicalTextColorMap[info.color]}`}>{sunday.getDate()}</span>
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{info.label}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{info.celebration}</p>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isToday || isNext ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-300'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityHome;