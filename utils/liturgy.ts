
import { LiturgicalYear, LiturgicalSeason } from '../types';

/**
 * Calcula a data da Páscoa para um determinado ano (Algoritmo de Meeus/Jones/Butcher)
 */
export const getEaster = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
};

export const getLiturgicalYear = (date: Date): LiturgicalYear => {
  const year = date.getFullYear();
  const adventStart = getAdventStart(year);
  const targetYear = date >= adventStart ? year + 1 : year;
  const remainder = (targetYear - 2011) % 3;
  if (remainder === 0) return 'A';
  if (remainder === 1) return 'B';
  return 'C';
};

const getAdventStart = (year: number): Date => {
  const christmas = new Date(year, 11, 25);
  const dayOfWeek = christmas.getDay();
  const diff = dayOfWeek === 0 ? 28 : 21 + dayOfWeek;
  const start = new Date(year, 11, 25 - diff);
  return start;
};

const getEpiphany = (year: number): Date => {
  const date = new Date(year, 0, 2);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  return date;
};

export interface LiturgicalSundayInfo {
  label: string;
  celebration: string;
  dateFormatted: string;
  color: 'green' | 'white' | 'purple' | 'red';
}

export const getLiturgicalSundayInfo = (date: Date): LiturgicalSundayInfo => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dStr = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}`;
  
  const easter = getEaster(year);
  const adventStart = getAdventStart(year);
  const christmas = new Date(year, 11, 25);
  const epiphany = getEpiphany(year);
  const baptism = new Date(epiphany);
  baptism.setDate(epiphany.getDate() + 7);

  // Advento (Roxo)
  if (date >= adventStart && date < christmas) {
    const weeks = Math.ceil((date.getTime() - adventStart.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
    return { label: `${weeks}º DOMINGO DO ADVENTO`, celebration: `Advento`, dateFormatted: dStr, color: 'purple' };
  }

  // Natal e Oitava (Branco)
  if (date >= christmas || (month === 0 && date < baptism)) {
    if (month === 11 && day === 25) return { label: 'NATAL DO SENHOR', celebration: 'Nascimento de Jesus', dateFormatted: dStr, color: 'white' };
    if (month === 11 && date > christmas) return { label: 'SAGRADA FAMÍLIA', celebration: '8ª de Natal', dateFormatted: dStr, color: 'white' };
    if (month === 0 && date.getTime() === epiphany.getTime()) return { label: 'EPIFANIA DO SENHOR', celebration: 'Manifestação', dateFormatted: dStr, color: 'white' };
    if (month === 0 && date.getTime() === baptism.getTime()) return { label: 'BATISMO DO SENHOR', celebration: 'Início da Vida Pública', dateFormatted: dStr, color: 'white' };
    return { label: 'OITAVA DE NATAL', celebration: 'Tempo do Natal', dateFormatted: dStr, color: 'white' };
  }

  // Quaresma e Páscoa
  const ashWednesday = new Date(easter);
  ashWednesday.setDate(easter.getDate() - 46);
  const pentecost = new Date(easter);
  pentecost.setDate(easter.getDate() + 49);

  // Quaresma (Roxo)
  if (date >= ashWednesday && date < easter) {
    const weeks = Math.ceil((date.getTime() - ashWednesday.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const labels = ["1º DOMINGO DA QUARESMA", "2º DOMINGO DA QUARESMA", "3º DOMINGO DA QUARESMA", "4º DOMINGO DA QUARESMA", "5º DOMINGO DA QUARESMA", "DOMINGO DE RAMOS"];
    const isRamos = weeks === 6;
    return { 
      label: labels[weeks-1] || 'QUARESMA', 
      celebration: isRamos ? 'Paixão do Senhor' : 'Tempo de Conversão', 
      dateFormatted: dStr, 
      color: isRamos ? 'red' : 'purple' 
    };
  }

  // Páscoa e Pentecostes (Branco/Vermelho)
  if (date >= easter && date <= pentecost) {
    if (date.getTime() === easter.getTime()) return { label: 'DOMINGO DA RESSURREIÇÃO', celebration: 'Páscoa do Senhor', dateFormatted: dStr, color: 'white' };
    const weeks = Math.ceil((date.getTime() - easter.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
    if (date.getTime() === pentecost.getTime()) return { label: 'DOMINGO DE PENTECOSTES', celebration: 'Vinda do Espírito Santo', dateFormatted: dStr, color: 'red' };
    return { label: `${weeks}º DOMINGO DA PÁSCOA`, celebration: 'Tempo Pascal', dateFormatted: dStr, color: 'white' };
  }

  // Tempo Comum (Verde)
  const startOfOrdinary = new Date(baptism);
  startOfOrdinary.setDate(baptism.getDate() + 1);
  
  let weekDTC = 0;
  if (date > pentecost) {
    const weeksFromAdvent = 34;
    const diffToAdvent = Math.ceil((adventStart.getTime() - date.getTime()) / (7 * 24 * 60 * 60 * 1000));
    weekDTC = weeksFromAdvent - diffToAdvent + 1;
  } else {
    weekDTC = Math.ceil((date.getTime() - startOfOrdinary.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
  }

  const sundayBeforeAdvent = new Date(adventStart);
  sundayBeforeAdvent.setDate(adventStart.getDate() - 7);
  if (date.getTime() === sundayBeforeAdvent.getTime()) return { label: '34º DOMINGO DO TEMPO COMUM', celebration: 'Cristo Rei do Universo', dateFormatted: dStr, color: 'white' };

  return { label: `${weekDTC}º DOMINGO DO TEMPO COMUM`, celebration: 'Domingo do Tempo Comum', dateFormatted: dStr, color: 'green' };
};

export const getLiturgicalSeason = (date: Date): LiturgicalSeason => {
  const info = getLiturgicalSundayInfo(date);
  if (info.label.includes('ADVENTO')) return LiturgicalSeason.Advent;
  if (info.label.includes('NATAL') || info.label.includes('EPIFANIA') || info.label.includes('BATISMO') || info.label.includes('OITAVA')) return LiturgicalSeason.Christmas;
  if (info.label.includes('QUARESMA') || info.label.includes('RAMOS')) return LiturgicalSeason.Lent;
  if (info.label.includes('PÁSCOA') || info.label.includes('PENTECOSTES')) return LiturgicalSeason.Easter;
  return LiturgicalSeason.Ordinary;
};

export const getSundaysOfMonth = (year: number, month: number): Date[] => {
  const sundays: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    if (date.getDay() === 0) {
      sundays.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return sundays;
};

export const formatDateBr = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
};
