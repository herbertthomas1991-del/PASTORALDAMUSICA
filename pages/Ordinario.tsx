
import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FIXED_CATEGORIES } from '../constants';
import NavigationMenu from '../components/NavigationMenu';

const Ordinario: React.FC = () => {
  const navigate = useNavigate();

  // Mapeamento de ícones/descrições para cada parte fixa
  const categoryDetails: Record<string, { desc: string; icon: React.ReactNode }> = {
    'Ato Penitencial': { 
      desc: 'Pedido de perdão e misericórdia',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    },
    'Glória': { 
      desc: 'Hino de louvor e adoração',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
    },
    'Santo': { 
      desc: 'Aclamação à santidade de Deus',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    },
    'Cordeiro de Deus': { 
      desc: 'Invocação da paz e do perdão',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-blue-600 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 pt-6 flex justify-between items-center relative z-10">
          <button onClick={() => navigate(-1)} className="flex items-center text-[11px] font-bold text-white/60 hover:text-white transition-opacity">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs><clipPath id="ordinarioLogoClip"><circle cx="100" cy="100" r="90" /></clipPath></defs>
                  <g clipPath="url(#ordinarioLogoClip)">
                    <rect x="0" y="0" width="100" height="100" fill="#FBBF24" />
                    <rect x="100" y="0" width="100" height="100" fill="#16A34A" />
                    <rect x="0" y="100" width="100" height="100" fill="#0EA5E9" />
                    <rect x="100" y="100" width="100" height="100" fill="#EF4444" />
                    <rect x="94" y="0" width="12" height="200" fill="white" />
                    <rect x="0" y="94" width="200" height="12" fill="white" />
                  </g>
                  <text x="100" y="145" textAnchor="middle" style={{ fontFamily: 'serif', fontSize: '150px', fill: 'black' }}>𝄞</text>
                </svg>
              </div>
            </Link>
            <NavigationMenu light />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-10 text-center relative z-0">
          <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight mb-2">Ordinário da Missa</h1>
          <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest opacity-80">Partes fixas litúrgicas</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FIXED_CATEGORIES.map((category) => (
            <Link 
              key={category} 
              to={`/ordinario/${encodeURIComponent(category)}`}
              className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {categoryDetails[category]?.icon || <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />}
                  </svg>
                </div>
                <div className="text-gray-200 group-hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight">{category}</h3>
              <p className="text-xs text-gray-400 font-medium">{categoryDetails[category]?.desc || 'Opções para esta parte da missa.'}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ordinario;
