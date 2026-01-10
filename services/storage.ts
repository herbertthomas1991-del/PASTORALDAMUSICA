
import { Song } from '../types';
import { getRepertorioByYear, getAllStaticSongs } from '../data/repertorio';
import { getLiturgicalYear } from '../utils/liturgy';

const STORAGE_KEY = 'pastoral_musica_songs_v1';

/**
 * Retorna todos os cantos mesclados, respeitando o ciclo litúrgico da data fornecida.
 */
export const getAllSongs = (dateContext?: Date): Song[] => {
  const localData = localStorage.getItem(STORAGE_KEY);
  const localSongs: Song[] = localData ? JSON.parse(localData) : [];
  
  // Identifica o ano litúrgico baseado no contexto da data (ou data atual)
  const targetDate = dateContext || new Date();
  const year = getLiturgicalYear(targetDate);
  const staticSongs = getRepertorioByYear(year);

  // Filtra músicas locais para evitar duplicatas de IDs se houver sobreposição
  const staticIds = new Set(staticSongs.map(s => s.id));
  const uniqueLocalSongs = localSongs.filter(s => !staticIds.has(s.id));

  return [...staticSongs, ...uniqueLocalSongs];
};

export const saveSong = (song: Song) => {
  const localData = localStorage.getItem(STORAGE_KEY);
  const localSongs: Song[] = localData ? JSON.parse(localData) : [];
  localSongs.push(song);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localSongs));
};

export const getSongsByDate = (dateStr: string): Song[] => {
  const date = new Date(dateStr + 'T12:00:00');
  // Carrega o repertório específico do ciclo daquela data
  return getAllSongs(date).filter(s => s.date === dateStr);
};

export const deleteSong = (id: string) => {
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    const localSongs: Song[] = JSON.parse(localData);
    const updatedSongs = localSongs.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSongs));
  }
};

/**
 * Lista completa para o Admin (todos os ciclos estáticos + cadastros locais)
 */
export const getAdminSongsList = (): Song[] => {
  const localData = localStorage.getItem(STORAGE_KEY);
  const localSongs: Song[] = localData ? JSON.parse(localData) : [];
  const staticAll = getAllStaticSongs();
  
  const staticIds = new Set(staticAll.map(s => s.id));
  const uniqueLocalSongs = localSongs.filter(s => !staticIds.has(s.id));

  return [...staticAll, ...uniqueLocalSongs];
};
