
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Song, SongCategory } from '../types';
import { saveSong, getAllSongs, deleteSong } from '../services/storage';
import { VARIABLE_CATEGORIES, FIXED_CATEGORIES } from '../constants';
import { getSundaysOfMonth, formatDateBr } from '../utils/liturgy';

const Admin: React.FC = () => {
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
      alert("Por favor, preencha o título, a letra e a data (se for canto de domingo).");
      return;
    }

    const newSong: Song = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      lyrics,
      link,
      category,
      date: isFixedCategory ? undefined : selectedDate,
      isFixed: isFixedCategory
    };

    saveSong(newSong);
    setSongs(getAllSongs());
    
    // Clear form
    setTitle('');
    setLyrics('');
    setLink('');
    alert("Canto publicado com sucesso!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Deseja realmente excluir este canto?")) {
      deleteSong(id);
      setSongs(getAllSongs());
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header Centralizado com Hierarquia Ajustada */}
      <div className="mb-12 flex flex-col items-center">
        <Link to="/" className="mb-4 text-gray-400 hover:text-red-600 transition-colors flex items-center text-xs font-bold uppercase tracking-widest">
          <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Sair da Gestão
        </Link>
        <h2 className="text-lg md:text-xl font-black text-gray-900 tracking-[0.2em] uppercase text-center border-b-2 border-red-600 pb-1">
          Gestão de Repertório
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form Section */}
        <section className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Título do Canto</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-800"
                  placeholder="Nome do canto..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Categoria Litúrgica</label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value as SongCategory)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm font-medium text-gray-800 cursor-pointer"
                >
                  <optgroup label="Cantos de Domingo (Variáveis)">
                    {VARIABLE_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Ordinário (Partes Fixas)">
                    {FIXED_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {!isFixedCategory && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Selecione o Domingo</label>
                  <select 
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm font-medium text-gray-800 cursor-pointer"
                  >
                    <option value="">Escolha uma data...</option>
                    {nextSundays.map(date => {
                      const dStr = date.toISOString().split('T')[0];
                      return (
                        <option key={dStr} value={dStr}>
                          {date.getDate()}/{date.getMonth() + 1} - {date.getFullYear()}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              {isFixedCategory && (
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter leading-tight">
                    Parte Fixa: Este canto será adicionado à lista permanente do Ordinário da Missa.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Letra / Cifras</label>
                <textarea 
                  rows={8}
                  value={lyrics}
                  onChange={e => setLyrics(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm font-medium text-gray-800 font-sans"
                  placeholder="Cole aqui a letra..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Link da Melodia (Opcional)</label>
                <input 
                  type="url" 
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm font-medium text-gray-800"
                  placeholder="Link YouTube/Spotify..."
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-100 active:scale-[0.98] uppercase tracking-wider text-xs"
              >
                Publicar no Repertório
              </button>
            </form>
          </div>
        </section>

        {/* List Section */}
        <section className="lg:col-span-3">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-6 text-gray-800 flex items-center">
               <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
               Histórico de Publicações
            </h3>
            <div className="space-y-3 max-h-[1000px] overflow-y-auto pr-2">
              {songs.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                   <p className="text-gray-400 text-sm font-medium">Nenhum canto publicado no banco de dados.</p>
                </div>
              ) : (
                songs.sort((a, b) => {
                  if (a.isFixed && !b.isFixed) return 1;
                  if (!a.isFixed && b.isFixed) return -1;
                  return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
                }).map(song => (
                  <div key={song.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center group hover:bg-white hover:border-red-200 transition-all">
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 truncate text-sm">{song.title}</h4>
                        {song.isFixed && (
                          <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-black uppercase">Fixo</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                          {song.category}
                        </span>
                        {!song.isFixed && song.date && (
                          <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold">
                            {formatDateBr(new Date(song.date + 'T12:00:00'))}
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(song.id)}
                      className="text-gray-300 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
