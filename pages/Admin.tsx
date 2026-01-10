
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Song, SongCategory } from '../types';
import { saveSong, getAllSongs, deleteSong } from '../services/storage';
import { VARIABLE_CATEGORIES, FIXED_CATEGORIES } from '../constants';
import { getSundaysOfMonth, toDateString } from '../utils/liturgy';
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

  const now = new Date();
  const nextSundays = [
    ...getSundaysOfMonth(now.getFullYear(), now.getMonth()),
    ...getSundaysOfMonth(now.getFullYear(), now.getMonth() + 1)
  ].filter(d => d >= new Date(now.setHours(0,0,0,0)));

  useEffect(() => {
    setSongs(getAllSongs());
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
    setSongs(getAllSongs());
    
    setTitle('');
    setLyrics('');
    setLink('');
    alert("Canto salvo localmente!");
  };

  const handleDelete = (id: string) => {
    if (id.startsWith('local-')) {
      if (confirm("Deseja excluir este registro local?")) {
        deleteSong(id);
        setSongs(getAllSongs());
      }
    } else {
      alert("Este canto faz parte do banco de dados oficial (código).");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white border-b border-gray-800 relative">
        <div className="max-w-5xl mx-auto px-6 pt-6 flex justify-between items-center relative z-10">
          <button onClick={() => navigate(-1)} className="flex items-center text-[11px] font-bold text-white/40 hover:text-white transition-opacity">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Voltar
          </button>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:scale-105 transition-transform">
              <div className="w-10 h-10 drop-shadow-md">
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
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-3">Área do Coordenador</h1>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Gestão de Repertório e Cantos</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <section className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight">Adicionar Canto</h3>
              <p className="text-xs text-gray-400 mb-8">Cadastre cantos para os próximos domingos.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-3">Título</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white outline-none transition-all text-sm font-semibold" placeholder="Título..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-3">Categoria</label>
                  <select value={category} onChange={e => setCategory(e.target.value as SongCategory)} className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white outline-none text-sm font-semibold">
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
                    <label className="block text-xs font-bold text-gray-400 mb-3">Domingo</label>
                    <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white outline-none text-sm font-semibold">
                      <option value="">Escolher data...</option>
                      {nextSundays.map(date => {
                        const dStr = toDateString(date);
                        return <option key={dStr} value={dStr}>{date.toLocaleDateString('pt-BR')}</option>;
                      })}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-3">Letra</label>
                  <textarea rows={8} value={lyrics} onChange={e => setLyrics(e.target.value)} className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white outline-none text-sm font-medium" placeholder="Letra completa..."></textarea>
                </div>
                <button type="submit" className="w-full bg-red-600 text-white font-bold py-5 rounded-2xl hover:bg-red-700 transition-all shadow-xl text-[13px] uppercase tracking-widest">Salvar Repertório</button>
              </form>
            </div>
          </section>

          <section className="lg:col-span-3">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-10 uppercase tracking-tight">Repertório Cadastrado</h3>
              <div className="space-y-4 pr-2">
                {songs.map(song => (
                  <div key={song.id} className="p-6 rounded-2xl flex justify-between items-center bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <div>
                      <h4 className="font-black text-gray-900 text-sm uppercase tracking-tight">{song.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{song.category} {!song.isFixed && `• ${song.date?.split('-').reverse().join('/')}`}</p>
                    </div>
                    {song.id.startsWith('local-') && (
                      <button onClick={() => handleDelete(song.id)} className="p-2 text-gray-300 hover:text-red-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
