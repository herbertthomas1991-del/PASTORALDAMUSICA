
import React from 'react';
import Header from '../components/Header';
import { getSignificantLiturgicalDaysOfMonth, getLiturgicalDayInfo } from '../utils/liturgy';

const Scale: React.FC = () => {
  const now = new Date();
  const days = getSignificantLiturgicalDaysOfMonth(now.getFullYear(), now.getMonth());

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="mb-14">
          <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] block mb-3">Escala Mensal</span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">Ministros da Música</h1>
          <p className="text-gray-400 text-lg font-bold uppercase tracking-widest mt-2">{now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</p>
        </div>

        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-widest">Celebração / Dia</th>
                <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-widest">Ministros Escalados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {days.map((day, idx) => {
                const info = getLiturgicalDayInfo(day);
                return (
                  <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-10 py-10">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">DIA</span>
                          <span className="text-2xl font-black text-gray-900">{day.getDate()}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight truncate mb-1">{info.label}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{info.celebrationType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-10">
                      <div className="flex flex-wrap gap-3">
                        <span className="px-6 py-2 bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest rounded-xl border border-blue-100 italic">
                          Aguandando confirmação...
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scale;
