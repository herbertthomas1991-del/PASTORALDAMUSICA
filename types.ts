
export type LiturgicalYear = 'A' | 'B' | 'C';

export enum LiturgicalSeason {
  Ordinary = 'Tempo Comum',
  Advent = 'Advento',
  Christmas = 'Natal',
  Lent = 'Quaresma',
  Easter = 'Páscoa'
}

export enum SongCategory {
  Entrance = 'CANTO DE ENTRADA',
  Penitential = 'ATO PENITENCIAL',
  Gloria = 'GLÓRIA',
  Acclamation = 'CANTO DE ACLAMAÇÃO AO EVANGELHO',
  Offertory = 'CANTO DE APRESENTAÇÃO DAS OFERTAS',
  Holy = 'SANTO',
  LambOfGod = 'CORDEIRO',
  Communion = 'CANTO DE COMUNHÃO',
  Dismissal = 'CANTO DE DISPERSÃO'
}

export interface Song {
  id: string;
  title: string;
  lyrics: string;
  link?: string;
  category: SongCategory;
  date?: string;
  isFixed?: boolean;
}

export interface LiturgicalInfo {
  year: LiturgicalYear;
  season: LiturgicalSeason;
  dayName: string;
}
