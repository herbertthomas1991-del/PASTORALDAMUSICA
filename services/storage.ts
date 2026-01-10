
import { Song } from '../types';

const STORAGE_KEY = 'pastoral_musica_songs';

export const saveSong = (song: Song) => {
  const songs = getAllSongs();
  songs.push(song);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
};

export const getAllSongs = (): Song[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getSongsByDate = (dateStr: string): Song[] => {
  const songs = getAllSongs();
  return songs.filter(s => s.date && s.date.split('T')[0] === dateStr.split('T')[0]);
};

export const deleteSong = (id: string) => {
  const songs = getAllSongs();
  const filtered = songs.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
