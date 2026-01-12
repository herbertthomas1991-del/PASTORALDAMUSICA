
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';

const Guidelines: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { 
      title: 'Conduta', 
      label: 'Manual de Conduta',
      content: [
        { title: 'Espiritualidade', text: 'O ministro não é um artista, mas um servidor da liturgia. A oração pessoal e o estado de graça são a base do ministério.' },
        { title: 'Pontualidade', text: 'Chegar com pelo menos 30 minutos de antecedência para preparação espiritual e afinação de instrumentos.' },
        { title: 'Traje e Postura', text: 'Vestir-se com sobriedade e respeito ao espaço sagrado. Evitar movimentos bruscos ou conversas paralelas durante as leituras.' },
        { title: 'Silêncio Sagrado', text: 'Guardar o silêncio antes da missa para favorecer o recolhimento da assembleia.' }
      ]
    },
    { 
      title: 'Canto', 
      label: 'Diretrizes de Canto',
      content: [
        { title: 'Serviço à Palavra', text: 'A voz do ministro deve estar a serviço da letra. O texto deve ser pronunciado com clareza para que a assembleia entenda a mensagem.' },
        { title: 'Microfone', text: 'Manter distância constante para evitar picos de volume ou sopros.' },
        { title: 'Unidade', text: 'O solista não deve sobrepor-se ao coro; a beleza da música litúrgica está na harmonia e na unidade das vozes.' },
        { title: 'Salmos', text: 'O Salmo deve ser cantado de forma clara e meditativa, respeitando as pausas litúrgicas.' }
      ]
    },
    { 
      title: 'Instrumental', 
      label: 'Acompanhamento',
      content: [
        { title: 'Subordinação', text: 'O instrumento acompanha a voz, nunca o contrário. Durante as partes cantadas pela assembleia, o volume deve permitir que a voz do povo seja ouvida.' },
        { title: 'Momentos de Silêncio', text: 'Respeitar os momentos de silêncio absoluto previstos na liturgia (após as leituras e a comunhão).' },
        { title: 'Instrumentos', text: 'Devem ser tocados com técnica, mas sem exibicionismo. Evitar solos prolongados ou estilos que fujam do caráter sagrado da celebração.' },
        { title: 'Afinação', text: 'Verificar a afinação de todos os instrumentos antes do início da celebração, fora do presbitério.' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-5xl mx-auto py-16 px-6">
        <div className="mb-14 flex flex-col items-center">
          <span className="text-[11px] font-black text-red-600 uppercase tracking-[0.3em] mb-3">Formação Litúrgica</span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter text-center">Diretrizes do Ministro</h1>
        </div>

        {/* Tab Header - Maior */}
        <div className="flex bg-white p-3 rounded-3xl border border-gray-100 shadow-sm mb-12 overflow-x-auto no-scrollbar">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 min-w-[140px] py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === idx ? 'bg-red-600 text-white shadow-xl scale-105' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content - Fontes Grandes */}
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter pl-6 border-l-8 border-red-600">
            {tabs[activeTab].label}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tabs[activeTab].content.map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
                <h4 className="text-xl font-black text-red-600 uppercase tracking-tight mb-5">{item.title}</h4>
                <p className="text-gray-600 text-lg md:text-xl leading-[1.6] font-medium italic">"{item.text}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-gray-200 text-center">
          <button onClick={() => navigate(-1)} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-600 transition-colors">
            Voltar para o sistema
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
