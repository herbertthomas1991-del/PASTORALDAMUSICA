
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Song, SongCategory } from '../types';
import { saveSong, deleteSong, getAdminSongsList } from '../services/storage';
import { VARIABLE_CATEGORIES, FIXED_CATEGORIES } from '../constants';
import { getSignificantLiturgicalDaysOfMonth, toDateString, getLiturgicalYear, getLiturgicalDayInfo } from '../utils/liturgy';
import NavigationMenu from '../components/NavigationMenu';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState<SongCategory>(SongCategory.Entrance);
  const [selectedDate, setSelectedDate] = useState('');
  
  const isFixedCategory = FIXED_CATEGORIES.includes(category);

  // Exibe dias de 2028 como padrão no Admin
  const now = new Date();
  const startYear = now.getFullYear() < 2028 ? 2028 : now.getFullYear();
  const startMonth = now.getFullYear() < 2028 ? 0 : now.getMonth();

  const significantDays = [
    ...getSignificantLiturgicalDaysOfMonth(startYear, startMonth),
    ...getSignificantLiturgicalDaysOfMonth(startYear, startMonth + 1)
  ];

  useEffect(() => {
    setSongs(getAdminSongsList());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !lyrics || (!selectedDate && !isFixedCategory)) {
      alert("Por favor, preencha o título, a letra e a data.");
      return;
    }

    const newSong: Song = {
      id: `local-${Math.random().toString(36).substr(2, 9)}`,
      title,
      lyrics,
      link,
      category,
      date: isFixedCategory ? undefined : selectedDate,
      isFixed: isFixedCategory
    };

    saveSong(newSong);
    setSongs(getAdminSongsList());
    
    setTitle('');
    setLyrics('');
    setLink('');
    alert("Canto salvo localmente!");
  };

  const handleDelete = (id: string) => {
    if (id.startsWith('local-')) {
      if (confirm("Deseja excluir este registro local?")) {
        deleteSong(id);
        setSongs(getAdminSongsList());
      }
    } else {
      alert("Este canto faz parte do banco de dados oficial (código).");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-600 text-white border-b border-red-700 relative">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center relative z-10">
          <button onClick={() => navigate(-1)} className="flex items-center text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-opacity">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:scale-105 transition-transform">
              <div className="w-8 h-8 drop-shadow-md">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs><clipPath id="adminLogoClip"><circle cx="100" cy="100" r="90" /></clipPath></defs>
                  <g clipPath="url(#adminLogoClip)">
                    <rect x="0" y="0" width="100" height="100" fill="#FBBF24" /><rect x="100" y="0" width="100" height="100" fill="#16A34A" /><rect x="0" y="100" width="100" height="100" fill="#0EA5E9" /><rect x="100" y="100" width="100" height="100" fill="#EF4444" />
                  </g>
                  <text x="100" y="145" textAnchor="middle" style={{ fontFamily: 'serif', fontSize: '150px', fill: 'black' }}>𝄞</text>
                </svg>
              </div>
            </Link>
            <NavigationMenu light />
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 py-12 text-center md:py-20">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Gestão do Coordenador</h1>
          <p className="text-white/60 text-lg md:text-2xl font-bold uppercase tracking-[0.2em]">Administração de Repertório — 2028</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          <section className="lg:col-span-2">
            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
              <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-none">Novo Canto</h3>
              <p className="text-lg text-gray-400 mb-10 font-medium">Cadastre cantos para os próximos domingos ou solenidades.</p>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Título da Música</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-8 py-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus:border-red-100 focus:bg-white outline-none transition-all text-xl font-bold" placeholder="Título..." />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Categoria Litúrgica</label>
                  <select value={category} onChange={e => setCategory(e.target.value as SongCategory)} className="w-full px-8 py-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus:border-red-100 focus:bg-white outline-none text-xl font-bold appearance-none">
                    <optgroup label="Variáveis">
                      {VARIABLE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </optgroup>
                    <optgroup label="Fixas">
                      {FIXED_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </optgroup>
                  </select>
                </div>
                {!isFixedCategory && (
                  <div>
                    <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Data da Celebração</label>
                    <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full px-8 py-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus:border-red-100 focus:bg-white outline-none text-xl font-bold appearance-none">
                      <option value="">Escolher data...</option>
                      {significantDays.map(date => {
                        const dStr = toDateString(date);
                        const info = getLiturgicalDayInfo(date);
                        return <option key={dStr} value={dStr}>{date.toLocaleDateString('pt-BR')} — {info.label}</option>;
                      })}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Letra Completa</label>
                  <textarea rows={10} value={lyrics} onChange={e => setLyrics(e.target.value)} className="w-full px-8 py-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus:border-red-100 focus:bg-white outline-none text-xl font-medium leading-relaxed" placeholder="Cole a letra aqui..."></textarea>
                </div>
                <button type="submit" className="w-full bg-red-600 text-white font-black py-8 rounded-[2rem] hover:bg-red-700 transition-all shadow-2xl text-lg uppercase tracking-widest active:scale-95">
                  Salvar Repertório
                </button>
              </form>
            </div>
          </section>

          <section className="lg:col-span-3">
            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
              <h3 className="text-3xl font-black text-gray-900 mb-12 uppercase tracking-tight leading-none">Listagem Atual</h3>
              <div className="space-y-6">
                {songs.map(song => (
                  <div key={song.id} className="p-8 rounded-[2rem] flex justify-between items-center bg-gray-50 border border-transparent hover:border-red-100 hover:bg-white transition-all group">
                    <div>
                      <h4 className="font-black text-gray-900 text-xl md:text-2xl uppercase tracking-tight mb-2 group-hover:text-red-600 transition-colors">{song.title}</h4>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                        {song.category} {!song.isFixed && ` • ${song.date?.split('-').reverse().join('/')}`}
                      </p>
                    </div>
                    {song.id.startsWith('local-') && (
                      <button onClick={() => handleDelete(song.id)} className="p-4 text-gray-200 hover:text-red-600 transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
