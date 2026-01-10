
import React from 'react';
import { Link, useNavigate } from 'react-router';
import NavigationMenu from '../components/NavigationMenu';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center text-[11px] font-bold text-gray-400 hover:text-gray-900 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-1">A Pastoral</span>
            <h1 className="text-sm font-black text-gray-900 uppercase tracking-tight">Nossa História</h1>
          </div>
          <NavigationMenu />
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-16 px-6">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
          {/* Elemento Decorativo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[5rem] -mr-10 -mt-10 opacity-50"></div>
          
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-10 leading-[1.1] uppercase tracking-tighter">
              Cantando a <br/>
              <span className="text-red-600 italic">Beleza de Deus.</span>
            </h2>
            
            <div className="space-y-8 text-gray-600 text-lg font-medium leading-[1.8]">
              <p>
                Este espaço é dedicado a contar a trajetória de nossa pastoral. Em breve, este texto será atualizado com as palavras que descrevem nossa missão, nossos desafios e a alegria de servir através da música litúrgica.
              </p>
              
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Em Definição</h4>
                <p className="italic text-gray-400 text-base">
                  "O que canta bem, reza duas vezes." — Santo Agostinho
                </p>
              </div>

              <p>
                A música na liturgia não é um enfeite, mas parte integrante e necessária do culto cristão. Nosso objetivo é facilitar o acesso aos cantos para que toda a comunidade possa participar plenamente de cada celebração.
              </p>
            </div>

            <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex gap-2">
                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 uppercase">Pastoral da Música</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Serviço Litúrgico</p>
                </div>
              </div>
              
              <Link to="/" className="text-[11px] font-black text-red-600 uppercase tracking-widest hover:underline">
                Voltar para o início
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
