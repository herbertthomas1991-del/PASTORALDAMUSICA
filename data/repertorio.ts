
import { Song, LiturgicalYear } from '../types';
import { REPERTORIO_COMUM } from './RepertorioComum';
import { REPERTORIO_ANO_A } from './RepertorioAnoA';
import { REPERTORIO_ANO_B } from './RepertorioAnoB';
import { REPERTORIO_ANO_C } from './RepertorioAnoC';

/**
 * Retorna o repertório estático completo para um ano litúrgico específico,
 * incluindo as partes fixas comuns.
 */
export const getRepertorioByYear = (year: LiturgicalYear): Song[] => {
  let specificRepertoire: Song[] = [];
  
  switch (year) {
    case 'A':
      specificRepertoire = REPERTORIO_ANO_A;
      break;
    case 'B':
      specificRepertoire = REPERTORIO_ANO_B;
      break;
    case 'C':
      specificRepertoire = REPERTORIO_ANO_C;
      break;
  }

  return [...REPERTORIO_COMUM, ...specificRepertoire];
};

/**
 * Função utilitária para obter todas as músicas de todos os ciclos (usada no Admin).
 */
export const getAllStaticSongs = (): Song[] => {
  return [
    ...REPERTORIO_COMUM,
    ...REPERTORIO_ANO_A,
    ...REPERTORIO_ANO_B,
    ...REPERTORIO_ANO_C
  ];
};
