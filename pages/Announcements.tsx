
import React from 'react';
import Header from '../components/Header';

const Announcements: React.FC = () => {
  const avisos = [
    { id: 1, title: 'Ensaio Geral da Quaresma', date: 'Quarta, 19:30', content: 'Preparação técnica para o tempo da quaresma. Presença indispensável de todos os cantores e instrumentistas para afinação do repertório solene.', type: 'Importante' },
    { id: 2, title: 'Novas Cifras Disponíveis', date: 'Hoje', content: 'Foram adicionadas as cifras e áudios de referência para o próximo Domingo do Tempo Comum no sistema. Favor revisar o tom da celebração.', type: 'Novidade' },
    { id: 3, title: 'Manutenção Preventiva do Som', date: 'Sexta-feira', content: 'A mesa de som passará por manutenção técnica geral. Não utilizar os canais 5, 6 e 7 até nova orientação da coordenação.', type: 'Aviso' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto py-16 px-6">
        <div className="mb-14">
          <span className="text-[11px] font-black text-amber-500 uppercase tracking-[0.3em] block mb-3">Comunicação Oficial</span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">Mural de Avisos</h1>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {avisos.map(aviso => (
            <div key={aviso.id} className="bg-white p-10 md:p-14 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-2xl transition-all duration-500 group">
              <div className="flex-shrink-0">
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  aviso.type === 'Importante' ? 'bg-red-100 text-red-600' : 
                  aviso.type === 'Novidade' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {aviso.type}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-6 border-b border-gray-50 pb-4">
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight group-hover:text-amber-600 transition-colors">{aviso.title}</h3>
                  <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">{aviso.date}</span>
                </div>
                <p className="text-gray-600 text-xl md:text-2xl leading-[1.6] font-medium selection:bg-amber-100 italic">"{aviso.content}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
