
import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { getLiturgicalYear, getLiturgicalSeason, getSundaysOfMonth, getLiturgicalSundayInfo } from '../utils/liturgy';

const Home: React.FC = () => {
  const now = new Date();
  const year = getLiturgicalYear(now);
  const season = getLiturgicalSeason(now);
  
  const sundays = useMemo(() => {
    return getSundaysOfMonth(now.getFullYear(), now.getMonth());
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Seção Litúrgica Otimizada - 2 Colunas Lado a Lado */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          <div className="p-5 flex flex-col items-center justify-center transition-colors hover:bg-gray-50/50 text-center">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 whitespace-nowrap">Ano Litúrgico</h2>
            <div className="flex items-center">
              <span className="text-sm md:text-xl font-bold text-gray-800 leading-tight">Ano {year}</span>
            </div>
          </div>

          <div className="p-5 flex flex-col items-center justify-center transition-colors hover:bg-gray-50/50 text-center">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 whitespace-nowrap">Tempo Atual</h2>
            <div className="flex items-center">
              <span className="text-sm md:text-xl font-bold text-gray-800 leading-tight">{season}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Próximas Missas */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">Próximas Missas</h3>
          <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase tracking-tighter">
            {now.toLocaleDateString('pt-BR', { month: 'long' })}
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sundays.map((sunday, idx) => {
            const isToday = sunday.toDateString() === now.toDateString();
            const info = getLiturgicalSundayInfo(sunday);
            
            return (
              <Link 
                key={idx} 
                to={`/missa/${sunday.toISOString().split('T')[0]}`}
                className={`group block p-5 rounded-xl border transition-all duration-200 ${
                  isToday 
                  ? 'bg-red-600 border-red-600 shadow-lg shadow-red-100 text-white' 
                  : 'bg-white border-gray-100 hover:border-red-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-black text-2xl leading-none ${isToday ? 'text-white' : 'text-red-600'}`}>
                    {sunday.getDate()}
                  </span>
                  <div className={`p-1.5 rounded-full transition-colors ${
                    isToday ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-300'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider block ${isToday ? 'text-red-100' : 'text-gray-500'}`}>
                    {info.label}
                  </span>
                  <span className={`text-xs font-medium block truncate ${isToday ? 'text-white/90' : 'text-gray-400'}`}>
                    {info.celebration}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link 
          to="/admin" 
          className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-red-600 hover:border-red-100 text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Área Administrativa (Coro)
        </Link>
      </div>
    </div>
  );
};

export default Home;
