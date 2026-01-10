
export type LiturgicalYear = 'A' | 'B' | 'C';

export enum LiturgicalSeason {
  Ordinary = 'Tempo Comum',
  Advent = 'Advento',
  Christmas = 'Natal',
  Lent = 'Quaresma',
  Easter = 'Páscoa'
}

export enum SongCategory {
  // Variáveis do Domingo
  Entrance = 'Canto de Entrada',
  Acclamation = 'Aclamação ao Evangelho',
  Offertory = 'Canto de Ofertas',
  Communion = 'Canto de Comunhão',
  Dismissal = 'Canto de Dispersão',
  // Partes Fixas (Ordinário)
  Penitential = 'Ato Penitencial',
  Gloria = 'Glória',
  Holy = 'Santo',
  LambOfGod = 'Cordeiro de Deus'
}

export interface Song {
  id: string;
  title: string;
  lyrics: string;
  link?: string;
  category: SongCategory;
  date?: string; // Opcional para cantos fixos
  isFixed?: boolean;
}

export interface LiturgicalInfo {
  year: LiturgicalYear;
  season: LiturgicalSeason;
  dayName: string;
}
