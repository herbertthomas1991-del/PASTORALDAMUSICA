import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { getMostRecentSignificantDay, toDateString, getSignificantLiturgicalDaysOfMonth, getLiturgicalDayInfo } from '../utils/liturgy';
import Header from '../components/Header';

const CommunityHome: React.FC = () => {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const now = new Date();
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));

  useEffect(() => {
    // Se não estivermos forçando a exibição da lista, redireciona para o dia atual/recente
    if (!showList) {
      const targetDate = getMostRecentSignificantDay(now);
      navigate(`/comunidade/missa/${toDateString(targetDate)}`, { replace: true });
    }
  }, [showList, navigate]);

  const liturgicalDays = getSignificantLiturgicalDaysOfMonth(viewDate.getFullYear(), viewDate.getMonth());
  
  const liturgicalTextColorMap = {
    green: 'text-emerald-600',
    white: 'text-gray-900',
    purple: 'text-purple-600',
    red: 'text-red-600'
  };

  // Enquanto redireciona, mostra um estado de carregamento simples
  if (!showList) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 mx-auto mb-4">
             <svg viewBox="0 0 200 200" className="w-full h-full opacity-20">
                <circle cx="100" cy="100" r="90" fill="#EF4444" />
                <text x="100" y="145" textAnchor="middle" style={{ fontFamily: 'serif', fontSize: '150px', fill: 'white' }}>𝄞</text>
             </svg>
          </div>
          <p className="text-xl font-black text-gray-300 uppercase tracking-[0.2em]">Carregando Liturgia...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header hideMenu logoLink="/comunidade" />
      <div className="max-w-5xl mx-auto py-16 px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-none">
            PRÓXIMAS MISSAS
          </h2>
          <p className="text-gray-400 text-lg font-bold uppercase tracking-[0.3em]">
            Selecione uma data para ler a letra
          </p>
        </div>

        <div className="flex justify-center items-center mb-14 gap-10">
          <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="p-4 text-gray-300 hover:text-red-600 transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="text-center min-w-[200px]">
            <span className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter block leading-none mb-1">{viewDate.toLocaleDateString('pt-BR', { month: 'long' })}</span>
            <span className="text-sm font-bold text-gray-300 block uppercase tracking-widest">{viewDate.getFullYear()}</span>
          </div>
          <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} className="p-4 text-gray-300 hover:text-red-600 transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {liturgicalDays.map((day, idx) => {
            const info = getLiturgicalDayInfo(day);
            return (
              <Link 
                key={idx} 
                to={`/comunidade/missa/${toDateString(day)}`}
                className="flex items-center justify-between p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:scale-[1.01] hover:shadow-xl active:scale-[0.99]"
              >
                <div className="flex items-center gap-10">
                  <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-gray-50 flex-shrink-0 border border-gray-100">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-[-2px]">DIA</span>
                    <span className={`text-4xl font-black ${liturgicalTextColorMap[info.color]}`}>{day.getDate()}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight leading-none mb-2">{info.label}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{info.description || info.celebrationType}</p>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-50 text-gray-300 transition-colors group-hover:bg-red-50 group-hover:text-red-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-20 text-center">
          <button onClick={() => setShowList(false)} className="px-10 py-5 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-xl">
            Voltar para a Missa de Hoje
          </button>
        </div>
      </div>
    </>
  );
};

export default CommunityHome;