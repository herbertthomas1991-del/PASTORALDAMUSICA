
import { Song } from '../types';
import { REPERTORIO_ESTATICO } from '../data/repertorio';

const STORAGE_KEY = 'pastoral_musica_songs_v1';

/**
 * Retorna todos os cantos, mesclando o repertório fixo no código
 * com o que foi adicionado localmente pelo usuário.
 */
export const getAllSongs = (): Song[] => {
  const localData = localStorage.getItem(STORAGE_KEY);
  const localSongs: Song[] = localData ? JSON.parse(localData) : [];
  
  // Mescla os dados do código com os dados do LocalStorage
  // Filtramos por ID para evitar duplicatas caso o usuário salve localmente algo que já existe no código
  const staticIds = new Set(REPERTORIO_ESTATICO.map(s => s.id));
  const uniqueLocalSongs = localSongs.filter(s => !staticIds.has(s.id));

  return [...REPERTORIO_ESTATICO, ...uniqueLocalSongs];
};

export const saveSong = (song: Song) => {
  const localData = localStorage.getItem(STORAGE_KEY);
  const localSongs: Song[] = localData ? JSON.parse(localData) : [];
  localSongs.push(song);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localSongs));
};

export const getSongsByDate = (dateStr: string): Song[] => {
  return getAllSongs().filter(s => s.date === dateStr);
};

export const deleteSong = (id: string) => {
  // Nota: Isso só deletará cantos salvos no LocalStorage.
  // Cantos no REPERTORIO_ESTATICO devem ser removidos diretamente no arquivo .ts
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    const localSongs: Song[] = JSON.parse(localData);
    const updatedSongs = localSongs.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSongs));
  }
};
