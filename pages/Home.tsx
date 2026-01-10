import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import Header from '../components/Header';
import { getLiturgicalYear, getLiturgicalSeason, getSundaysOfMonth, getLiturgicalSundayInfo } from '../utils/liturgy';

const Home: React.FC = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Estado para controlar qual mês estamos visualizando
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  
  const year = getLiturgicalYear(viewDate);
  const season = getLiturgicalSeason(viewDate);
  
  const sundays = useMemo(() => {
    return getSundaysOfMonth(viewDate.getFullYear(), viewDate.getMonth());
  }, [viewDate]);

  // Identifica qual é a próxima missa (hoje ou a primeira futura)
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

  // Mapeamento de cores litúrgicas para classes Tailwind
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
        {/* Seção Litúrgica */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 mb-10 overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Ano Litúrgico</h2>
              <span className="text-lg md:text-xl font-black text-gray-900 leading-tight">Ano {year}</span>
            </div>

            <div className="p-6 flex flex-col items-center justify-center text-center">
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tempo Atual</h2>
              <span className="text-lg md:text-xl font-black text-gray-900 leading-tight">{season}</span>
            </div>
          </div>
        </section>

        {/* Cabeçalho do Repertório com Navegação Centralizada */}
        <section>
          <div className="flex flex-col items-center mb-10 gap-4">
            <h3 className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">Repertório das Missas</h3>
            
            <div className="flex items-center bg-white border border-gray-100 rounded-full p-1.5 shadow-sm">
              <button 
                onClick={prevMonth}
                className="p-2.5 hover:bg-gray-50 rounded-full text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Mês Anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <div className="px-8 text-center min-w-[180px]">
                <span className="text-sm font-black text-gray-900 uppercase tracking-widest block">
                  {viewDate.toLocaleDateString('pt-BR', { month: 'long' })}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter block">
                  {viewDate.getFullYear()}
                </span>
              </div>

              <button 
                onClick={nextMonth}
                className="p-2.5 hover:bg-gray-50 rounded-full text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Próximo Mês"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            
            {viewDate.getMonth() !== now.getMonth() || viewDate.getFullYear() !== now.getFullYear() ? (
              <button 
                onClick={goToToday}
                className="text-[9px] font-black text-red-600 uppercase tracking-[0.15em] hover:bg-red-50 px-3 py-1 rounded-full transition-colors"
              >
                Voltar para hoje
              </button>
            ) : null}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {sundays.map((sunday, idx) => {
              const sundayOnlyDate = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate());
              const isToday = sundayOnlyDate.getTime() === today.getTime();
              const isPast = sundayOnlyDate < today;
              const isNext = idx === nextMassIndex;
              const info = getLiturgicalSundayInfo(sunday);
              
              let cardClasses = "";
              let textClasses = "";
              let iconClasses = "";
              let dateClasses = "";
              let labelClasses = "";

              if (isToday) {
                cardClasses = "bg-red-600 border-red-700 shadow-2xl shadow-red-200 text-white translate-y-[-4px] z-10 ring-4 ring-red-600/20";
                textClasses = "text-white/80";
                iconClasses = "bg-white/20 text-white";
                dateClasses = "text-white"; 
                labelClasses = "text-red-100";
              } else if (isPast) {
                cardClasses = "bg-gray-100/50 border-gray-300 shadow-md opacity-70 grayscale-[0.4] hover:grayscale-0 hover:opacity-100 transition-all";
                textClasses = "text-gray-400";
                iconClasses = "bg-gray-200 text-gray-400";
                dateClasses = liturgicalTextColorMap[info.color] + " opacity-50";
                labelClasses = "text-gray-500";
              } else if (isNext) {
                // DESTAQUE DA PRÓXIMA MISSA (Quando não é hoje)
                cardClasses = "bg-white border-red-500 shadow-2xl hover:shadow-red-100 -translate-y-1 ring-4 ring-red-500/10";
                textClasses = "text-gray-500";
                iconClasses = "bg-red-50 text-red-500";
                dateClasses = liturgicalTextColorMap[info.color];
                labelClasses = "text-gray-900";
              } else {
                cardClasses = "bg-white border-gray-200 shadow-md hover:border-red-300 hover:shadow-xl hover:-translate-y-1";
                textClasses = "text-gray-500";
                iconClasses = "bg-gray-50 text-gray-300 group-hover:bg-red-50 group-hover:text-red-500";
                dateClasses = liturgicalTextColorMap[info.color];
                labelClasses = "text-gray-900";
              }

              return (
                <Link 
                  key={idx} 
                  to={`/missa/${sunday.toISOString().split('T')[0]}`}
                  className={`group relative block p-8 rounded-[2rem] border transition-all duration-300 ${cardClasses}`}
                >
                  {/* Badge de Próxima/Hoje */}
                  {(isNext || isToday) && (
                    <div className={`absolute -top-3 left-8 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                      isToday ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                    }`}>
                      {isToday ? 'Missa de Hoje' : 'Próxima Missa'}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <span className={`font-black text-5xl leading-none tracking-tighter ${dateClasses}`}>
                      {sunday.getDate().toString().padStart(2, '0')}
                    </span>
                    <div className={`p-3 rounded-full transition-all ${iconClasses}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black uppercase tracking-tight block ${labelClasses}`}>
                        {info.label}
                      </span>
                      {isPast && (
                        <span className="text-[8px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase">Passada</span>
                      )}
                    </div>
                    <span className={`text-xs font-medium block truncate ${textClasses}`}>
                      {info.celebration}
                    </span>
                  </div>
                </Link>
              );
            })}
            
            {sundays.length === 0 && (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm font-medium italic">Nenhum domingo encontrado para este período.</p>
              </div>
            )}
          </div>
        </section>

        <div className="mt-16 text-center">
          <Link 
            to="/admin" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-red-600 hover:border-red-200 text-[11px] font-bold transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Área de Gestão
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;