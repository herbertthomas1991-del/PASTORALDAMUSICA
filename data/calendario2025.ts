
export type CelebrationType = 'S' | 'F' | 'M' | 'm' | 'D'; // Solenidade, Festa, Memória, Memória Fac., Domingo

export interface Celebration2025 {
  label: string;
  type: CelebrationType;
  color: 'white' | 'green' | 'purple' | 'red';
}

export const CALENDARIO_2025: Record<string, Celebration2025> = {
  // Janeiro
  '2025-01-01': { label: 'Santa Maria, Mãe de Deus', type: 'S', color: 'white' },
  '2025-01-05': { label: 'Epifania do Senhor', type: 'S', color: 'white' },
  '2025-01-12': { label: 'Batismo do Senhor', type: 'F', color: 'white' },
  '2025-01-19': { label: '2º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-01-26': { label: '3º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Fevereiro
  '2025-02-01': { label: '4º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-02-02': { label: 'Apresentação do Senhor', type: 'F', color: 'white' },
  '2025-02-08': { label: '5º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-02-15': { label: '6º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-02-18': { label: 'Quarta-feira de Cinzas', type: 'S', color: 'purple' },
  '2025-02-22': { label: '1º Domingo da Quaresma', type: 'D', color: 'purple' },
  // Março
  '2025-03-01': { label: '2º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2025-03-08': { label: '3º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2025-03-15': { label: '4º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2025-03-19': { label: 'São José, Esposo de Maria', type: 'S', color: 'white' },
  '2025-03-22': { label: '5º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2025-03-25': { label: 'Anunciação do Senhor', type: 'S', color: 'white' },
  '2025-03-29': { label: 'Domingo de Ramos', type: 'D', color: 'red' },
  // Abril
  '2025-04-02': { label: 'Quinta-feira Santa', type: 'S', color: 'white' },
  '2025-04-03': { label: 'Sexta-feira da Paixão', type: 'S', color: 'red' },
  '2025-04-04': { label: 'Sábado Santo (Vigília)', type: 'S', color: 'white' },
  '2025-04-05': { label: 'Domingo de Páscoa', type: 'S', color: 'white' },
  '2025-04-12': { label: '2º Domingo da Páscoa', type: 'D', color: 'white' },
  '2025-04-19': { label: '3º Domingo da Páscoa', type: 'D', color: 'white' },
  '2025-04-25': { label: 'São Marcos, Evangelista', type: 'F', color: 'red' },
  '2025-04-26': { label: '4º Domingo da Páscoa', type: 'D', color: 'white' },
  // Maio
  '2025-05-03': { label: '5º Domingo da Páscoa', type: 'D', color: 'white' },
  '2025-05-10': { label: '6º Domingo da Páscoa', type: 'D', color: 'white' },
  '2025-05-14': { label: 'São Matias, Apóstolo', type: 'F', color: 'red' },
  '2025-05-17': { label: 'Ascensão do Senhor', type: 'S', color: 'white' },
  '2025-05-24': { label: 'Domingo de Pentecostes', type: 'S', color: 'red' },
  '2025-05-31': { label: 'Santíssima Trindade', type: 'S', color: 'white' },
  // Junho
  '2025-06-04': { label: 'Corpo e Sangue de Cristo (Corpus Christi)', type: 'S', color: 'white' },
  '2025-06-07': { label: '10º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-06-12': { label: 'Sagrado Coração de Jesus', type: 'S', color: 'white' },
  '2025-06-14': { label: '11º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-06-21': { label: '12º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-06-24': { label: 'Nascimento de São João Batista', type: 'S', color: 'white' },
  '2025-06-28': { label: '13º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Julho
  '2025-07-03': { label: 'São Tomé, Apóstolo', type: 'F', color: 'red' },
  '2025-07-05': { label: 'São Pedro e São Paulo, Apóstolos', type: 'S', color: 'red' },
  '2025-07-12': { label: '15º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-07-16': { label: 'Nossa Senhora do Carmo', type: 'F', color: 'white' },
  '2025-07-19': { label: '16º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-07-22': { label: 'Santa Maria Madalena', type: 'F', color: 'white' },
  '2025-07-25': { label: 'São Tiago, Apóstolo', type: 'F', color: 'red' },
  '2025-07-26': { label: '17º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Agosto
  '2025-08-02': { label: '18º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-08-06': { label: 'Transfiguração do Senhor', type: 'F', color: 'white' },
  '2025-08-09': { label: '19º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-08-10': { label: 'São Lourenço, Diácono', type: 'F', color: 'red' },
  '2025-08-16': { label: 'Assunção de Nossa Senhora', type: 'S', color: 'white' },
  '2025-08-23': { label: '21º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-08-24': { label: 'São Bartolomeu, Apóstolo', type: 'F', color: 'red' },
  '2025-08-30': { label: '22º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Setembro
  '2025-09-06': { label: '23º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-09-08': { label: 'Natividade da Virgem Maria', type: 'F', color: 'white' },
  '2025-09-13': { label: '24º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-09-14': { label: 'Exaltação da Santa Cruz', type: 'F', color: 'red' },
  '2025-09-20': { label: '25º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-09-21': { label: 'São Mateus, Apóstolo', type: 'F', color: 'red' },
  '2025-09-27': { label: '26º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-09-29': { label: 'Santos Arcanjos', type: 'F', color: 'white' },
  // Outubro
  '2025-10-04': { label: '27º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-10-11': { label: '28º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-10-12': { label: 'Nossa Senhora Aparecida', type: 'S', color: 'white' },
  '2025-10-18': { label: '29º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-10-25': { label: '30º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-10-28': { label: 'São Simão e Judas, Apóstolos', type: 'F', color: 'red' },
  // Novembro
  '2025-11-01': { label: 'Todos os Santos', type: 'S', color: 'white' },
  '2025-11-08': { label: '32º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-11-09': { label: 'Dedicação da Basílica de Latrão', type: 'F', color: 'white' },
  '2025-11-15': { label: '33º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2025-11-22': { label: 'Cristo Rei do Universo', type: 'S', color: 'white' },
  '2025-11-29': { label: '1º Domingo do Advento', type: 'D', color: 'purple' },
  '2025-11-30': { label: 'Santo André, Apóstolo', type: 'F', color: 'red' },
  // Dezembro
  '2025-12-06': { label: '2º Domingo do Advento', type: 'D', color: 'purple' },
  '2025-12-08': { label: 'Imaculada Conceição', type: 'S', color: 'white' },
  '2025-12-12': { label: 'Nossa Senhora de Guadalupe', type: 'F', color: 'white' },
  '2025-12-13': { label: '3º Domingo do Advento', type: 'D', color: 'purple' },
  '2025-12-20': { label: '4º Domingo do Advento', type: 'D', color: 'purple' },
  '2025-12-25': { label: 'Natal do Senhor', type: 'S', color: 'white' },
  '2025-12-26': { label: 'Santo Estêvão, Mártir', type: 'F', color: 'red' },
  '2025-12-27': { label: 'Sagrada Família', type: 'F', color: 'white' },
  '2025-12-28': { label: 'Santos Inocentes', type: 'F', color: 'red' }
};
