
import React from 'react';
import { Link, useNavigate } from 'react-router';
import NavigationMenu from '../components/NavigationMenu';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-1">Identidade Pastoral</span>
            <h1 className="text-lg font-black text-gray-900 uppercase tracking-tight">Nossa Missão</h1>
          </div>
          <NavigationMenu />
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-20 px-6">
        <div className="bg-white rounded-[4rem] p-12 md:p-24 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-50 rounded-bl-[6rem] -mr-16 -mt-16 opacity-50"></div>
          
          <div className="relative">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-14 leading-[1.05] uppercase tracking-tighter">
              Cantando a <br/>
              <span className="text-red-600 italic">Glória de Deus.</span>
            </h2>
            
            <div className="space-y-12 text-gray-600 text-xl md:text-2xl lg:text-3xl font-medium leading-[1.7]">
              <p>
                Este espaço é dedicado a contar a trajetória de nossa pastoral. Aqui compartilhamos nossa missão, nossos desafios e a alegria inigualável de servir ao altar através da música que eleva as almas.
              </p>
              
              <div className="p-12 bg-gray-50 rounded-[3rem] border-2 border-gray-100 shadow-inner">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6">Inspirado em</h4>
                <p className="italic text-gray-500 text-2xl md:text-4xl leading-tight font-black tracking-tight">
                  "O que canta bem, reza duas vezes."
                </p>
                <p className="mt-4 text-xs font-bold text-gray-300 uppercase tracking-widest">— Santo Agostinho</p>
              </div>

              <p>
                A música na liturgia não é um adorno externo, mas parte integrante e necessária do culto cristão. Nosso objetivo é democratizar o acesso aos cantos para que toda a assembleia possa participar plenamente do mistério celebrado.
              </p>
            </div>

            <div className="mt-24 pt-14 border-t-2 border-gray-100 flex flex-col md:flex-row gap-10 items-center justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-[1.5rem] bg-red-600 flex items-center justify-center text-white shadow-xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                </div>
                <div>
                  <p className="text-base font-black text-gray-900 uppercase tracking-tight leading-none mb-1">Pastoral da Música</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Serviço de Comunhão Litúrgica</p>
                </div>
              </div>
              
              <Link to="/" className="bg-gray-900 text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl active:scale-95">
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
