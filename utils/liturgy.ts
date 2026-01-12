
import { LiturgicalYear, LiturgicalSeason } from '../types';
import { CALENDARIO_2025 } from '../data/calendario2025';
import { CALENDARIO_2026 } from '../data/calendario2026';
import { CALENDARIO_2027 } from '../data/calendario2027';
import { CALENDARIO_2028 } from '../data/calendario2028';

/**
 * Tabela oficial de transição dos ciclos litúrgicos (1º Domingo do Advento)
 */
const LITURGICAL_TRANSITIONS: { date: string; cycle: LiturgicalYear }[] = [
  { date: '2024-12-01', cycle: 'C' }, 
  { date: '2025-11-30', cycle: 'A' },
  { date: '2026-11-29', cycle: 'B' },
  { date: '2027-11-28', cycle: 'C' },
  { date: '2028-12-03', cycle: 'A' }
];

export const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getLiturgicalYear = (date: Date): LiturgicalYear => {
  const dateStr = toDateString(date);
  const transitions = [...LITURGICAL_TRANSITIONS].sort((a, b) => b.date.localeCompare(a.date));
  for (const transition of transitions) {
    if (dateStr >= transition.date) {
      return transition.cycle;
    }
  }
  return 'C';
};

export interface LiturgicalDayInfo {
  label: string;
  description?: string;
  celebrationType: string;
  dateFormatted: string;
  color: 'green' | 'white' | 'purple' | 'red';
  isHighCelebration?: boolean;
}

export const getLiturgicalDayInfo = (date: Date): LiturgicalDayInfo => {
  const dateStr = toDateString(date);
  const dStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
  
  const year = date.getFullYear();
  let calEntry: any = null;

  if (year === 2025) calEntry = CALENDARIO_2025[dateStr];
  else if (year === 2026) calEntry = CALENDARIO_2026[dateStr];
  else if (year === 2027) calEntry = CALENDARIO_2027[dateStr];
  else if (year === 2028) calEntry = CALENDARIO_2028[dateStr];

  if (calEntry) {
    const typeLabel = calEntry.type === 'S' ? 'Solenidade' : calEntry.type === 'F' ? 'Festa' : calEntry.type === 'D' ? 'Domingo' : 'Memória';
    return {
      label: calEntry.label,
      description: calEntry.description,
      celebrationType: typeLabel,
      dateFormatted: dStr,
      color: calEntry.color,
      isHighCelebration: ['S', 'F', 'D'].includes(calEntry.type)
    };
  }

  const isSunday = date.getDay() === 0;
  return {
    label: isSunday ? 'Domingo Litúrgico' : 'Ferial',
    celebrationType: isSunday ? 'Celebração Dominical' : 'Ferial',
    dateFormatted: dStr,
    color: isSunday ? 'green' : 'green'
  };
};

export const getLiturgicalSeason = (date: Date): LiturgicalSeason => {
  const info = getLiturgicalDayInfo(date);
  const labelUpper = info.label.toUpperCase();
  if (labelUpper.includes('ADVENTO')) return LiturgicalSeason.Advent;
  if (labelUpper.includes('NATAL') || labelUpper.includes('EPIFANIA') || labelUpper.includes('BATISMO')) return LiturgicalSeason.Christmas;
  if (labelUpper.includes('QUARESMA') || labelUpper.includes('CINZAS') || labelUpper.includes('RAMOS')) return LiturgicalSeason.Lent;
  if (labelUpper.includes('PÁSCOA') || labelUpper.includes('PENTECOSTES') || labelUpper.includes('ASCENSÃO')) return LiturgicalSeason.Easter;
  return LiturgicalSeason.Ordinary;
};

export const getSignificantLiturgicalDaysOfMonth = (year: number, month: number): Date[] => {
  const significantDays: Date[] = [];
  const date = new Date(year, month, 1);
  
  const calendarMap: Record<number, any> = { 2025: CALENDARIO_2025, 2026: CALENDARIO_2026, 2027: CALENDARIO_2027, 2028: CALENDARIO_2028 };
  const currentCal = calendarMap[year] || {};

  while (date.getMonth() === month) {
    const dStr = toDateString(date);
    const isSunday = date.getDay() === 0;
    const isSpecial = currentCal[dStr] && ['S', 'F'].includes(currentCal[dStr].type);
    
    if (isSunday || isSpecial) {
      significantDays.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return significantDays.sort((a, b) => a.getTime() - b.getTime());
};

export const getMostRecentSignificantDay = (date: Date): Date => {
  const check = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const calendarMap: Record<number, any> = { 2025: CALENDARIO_2025, 2026: CALENDARIO_2026, 2027: CALENDARIO_2027, 2028: CALENDARIO_2028 };
  
  for (let i = 0; i < 8; i++) {
    const dStr = toDateString(check);
    const year = check.getFullYear();
    const currentCal = calendarMap[year] || {};
    const isSunday = check.getDay() === 0;
    const isSpecial = currentCal[dStr] && ['S', 'F'].includes(currentCal[dStr].type);
    
    if (isSunday || isSpecial) return new Date(check);
    check.setDate(check.getDate() - 1);
  }
  return date;
};
