
export type CelebrationType = 'S' | 'F' | 'M' | 'm' | 'D';

export interface Celebration2026 {
  label: string;
  description?: string;
  type: CelebrationType;
  color: 'white' | 'green' | 'purple' | 'red';
}

export const CALENDARIO_2026: Record<string, Celebration2026> = {
  // Janeiro 2026
  '2026-01-01': { label: 'Santa Maria, Mãe de Deus', type: 'S', color: 'white' },
  '2026-01-04': { label: 'Epifania do Senhor', type: 'S', color: 'white' },
  '2026-01-11': { label: 'Batismo do Senhor', type: 'F', color: 'white' },
  '2026-01-18': { label: '2º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-01-25': { label: '4º DOMINGO DO TEMPO COMUM', description: 'Conversão de São Paulo, Apóstolo', type: 'D', color: 'green' },
  // Fevereiro 2026
  '2026-02-01': { label: '5º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-02-02': { label: 'Apresentação do Senhor', type: 'F', color: 'white' },
  '2026-02-08': { label: '6º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-02-15': { label: '7º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-02-18': { label: 'Quarta-feira de Cinzas', type: 'S', color: 'purple' },
  '2026-02-22': { label: '1º Domingo da Quaresma', type: 'D', color: 'purple' },
  // Março 2026
  '2026-03-01': { label: '2º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2026-03-08': { label: '3º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2026-03-15': { label: '4º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2026-03-19': { label: 'São José, Esposo de Maria', type: 'S', color: 'white' },
  '2026-03-22': { label: '5º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2026-03-25': { label: 'Anunciação do Senhor', type: 'S', color: 'white' },
  '2026-03-29': { label: 'Domingo de Ramos', type: 'D', color: 'red' },
  // Abril 2026
  '2026-04-02': { label: 'Quinta-feira Santa', type: 'S', color: 'white' },
  '2026-04-03': { label: 'Sexta-feira da Paixão', type: 'S', color: 'red' },
  '2026-04-04': { label: 'Sábado Santo (Vigília)', type: 'S', color: 'white' },
  '2026-04-05': { label: 'Domingo de Páscoa', type: 'S', color: 'white' },
  '2026-04-12': { label: '2º Domingo da Páscoa', type: 'D', color: 'white' },
  '2026-04-19': { label: '3º Domingo da Páscoa', type: 'D', color: 'white' },
  '2026-04-26': { label: '4º Domingo da Páscoa', type: 'D', color: 'white' },
  // Maio 2026
  '2026-05-03': { label: '5º Domingo da Páscoa', type: 'D', color: 'white' },
  '2026-05-10': { label: '6º Domingo da Páscoa', type: 'D', color: 'white' },
  '2026-05-14': { label: 'São Matias, Apóstolo', type: 'F', color: 'red' },
  '2026-05-17': { label: 'Ascensão do Senhor', type: 'S', color: 'white' },
  '2026-05-24': { label: 'Domingo de Pentecostes', type: 'S', color: 'red' },
  '2026-05-31': { label: 'Santíssima Trindade', type: 'S', color: 'white' },
  // Junho 2026
  '2026-06-04': { label: 'Corpo e Sangue de Cristo (Corpus Christi)', type: 'S', color: 'white' },
  '2026-06-07': { label: '10º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-06-12': { label: 'Sagrado Coração de Jesus', type: 'S', color: 'white' },
  '2026-06-14': { label: '11º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-06-21': { label: '12º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-06-24': { label: 'Nascimento de São João Batista', type: 'S', color: 'white' },
  '2026-06-28': { label: '13º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Julho 2026
  '2026-07-05': { label: 'São Pedro e São Paulo, Apóstolos', type: 'S', color: 'red' },
  '2026-07-12': { label: '15º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-07-19': { label: '16º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-07-26': { label: '17º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Agosto 2026
  '2026-08-02': { label: '18º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-08-09': { label: '19º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-08-16': { label: 'Assunção de Nossa Senhora', type: 'S', color: 'white' },
  '2026-08-23': { label: '21º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-08-30': { label: '22º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Setembro 2026
  '2026-09-06': { label: '23º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-09-13': { label: '24º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-09-20': { label: '25º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-09-27': { label: '26º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Outubro 2026
  '2026-10-04': { label: '27º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-10-11': { label: '28º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-10-12': { label: 'Nossa Senhora Aparecida', type: 'S', color: 'white' },
  '2026-10-18': { label: '29º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-10-25': { label: '30º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Novembro 2026
  '2026-11-01': { label: 'Todos os Santos', type: 'S', color: 'white' },
  '2026-11-08': { label: '32º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-11-15': { label: '33º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2026-11-22': { label: 'Cristo Rei do Universo', type: 'S', color: 'white' },
  '2026-11-29': { label: '1º Domingo do Advento', type: 'D', color: 'purple' },
  // Dezembro 2026
  '2026-12-06': { label: '2º Domingo do Advento', type: 'D', color: 'purple' },
  '2026-12-08': { label: 'Imaculada Conceição', type: 'S', color: 'white' },
  '2026-12-13': { label: '3º Domingo do Advento', type: 'D', color: 'purple' },
  '2026-12-20': { label: '4º Domingo do Advento', type: 'D', color: 'purple' },
  '2026-12-25': { label: 'Natal do Senhor', type: 'S', color: 'white' }
};
