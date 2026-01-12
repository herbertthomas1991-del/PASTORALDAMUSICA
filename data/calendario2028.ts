
export type CelebrationType = 'S' | 'F' | 'M' | 'm' | 'D'; // Solenidade, Festa, Memória, Memória Fac., Domingo

export interface Celebration2028 {
  label: string;
  type: CelebrationType;
  color: 'white' | 'green' | 'purple' | 'red';
}

export const CALENDARIO_2028: Record<string, Celebration2028> = {
  // Janeiro 2028
  '2028-01-01': { label: 'Santa Maria, Mãe de Deus', type: 'S', color: 'white' },
  '2028-01-02': { label: 'Epifania do Senhor', type: 'S', color: 'white' },
  '2028-01-09': { label: 'Batismo do Senhor', type: 'F', color: 'white' },
  '2028-01-16': { label: '2º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-01-23': { label: '3º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-01-25': { label: 'Conversão de São Paulo, apóstolo', type: 'F', color: 'white' },
  '2028-01-30': { label: '4º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Fevereiro 2028
  '2028-02-02': { label: 'Apresentação do Senhor', type: 'F', color: 'white' },
  '2028-02-06': { label: '5º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-02-13': { label: '6º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-02-20': { label: '7º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-02-22': { label: 'Cadeira de São Pedro, apóstolo', type: 'F', color: 'white' },
  '2028-02-27': { label: '8º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Março 2028
  '2028-03-01': { label: 'Quarta-feira de Cinzas', type: 'S', color: 'purple' },
  '2028-03-05': { label: '1º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2028-03-12': { label: '2º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2028-03-19': { label: '3º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2028-03-20': { label: 'São José, Esposo de Maria', type: 'S', color: 'white' },
  '2028-03-25': { label: 'Anunciação do Senhor', type: 'S', color: 'white' },
  '2028-03-26': { label: '4º Domingo da Quaresma', type: 'D', color: 'purple' },
  // Abril 2028
  '2028-04-02': { label: '5º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2028-04-09': { label: 'Domingo de Ramos', type: 'D', color: 'red' },
  '2028-04-13': { label: 'Quinta-feira da Ceia do Senhor', type: 'S', color: 'white' },
  '2028-04-14': { label: 'Sexta-feira da Paixão', type: 'S', color: 'red' },
  '2028-04-15': { label: 'Sábado Santo (Vigília)', type: 'S', color: 'white' },
  '2028-04-16': { label: 'Domingo de Páscoa', type: 'S', color: 'white' },
  '2028-04-23': { label: '2º Domingo da Páscoa (Divina Misericórdia)', type: 'D', color: 'white' },
  '2028-04-25': { label: 'São Marcos, evangelista', type: 'F', color: 'red' },
  '2028-04-30': { label: '3º Domingo da Páscoa', type: 'D', color: 'white' },
  // Maio 2028
  '2028-05-03': { label: 'Santos Filipe e Tiago, apóstolos', type: 'F', color: 'red' },
  '2028-05-07': { label: '4º Domingo da Páscoa', type: 'D', color: 'white' },
  '2028-05-14': { label: '5º Domingo da Páscoa', type: 'D', color: 'white' },
  '2028-05-21': { label: '6º Domingo da Páscoa', type: 'D', color: 'white' },
  '2028-05-25': { label: 'Ascensão do Senhor', type: 'S', color: 'white' },
  '2028-05-28': { label: '7º Domingo da Páscoa', type: 'D', color: 'white' },
  '2028-05-31': { label: 'Visitação de Nossa Senhora', type: 'F', color: 'white' },
  // Junho 2028
  '2028-06-04': { label: 'Domingo de Pentecostes', type: 'S', color: 'red' },
  '2028-06-11': { label: 'Santíssima Trindade', type: 'S', color: 'white' },
  '2028-06-15': { label: 'Corpus Christi', type: 'S', color: 'white' },
  '2028-06-18': { label: '11º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-06-23': { label: 'Sagrado Coração de Jesus', type: 'S', color: 'white' },
  '2028-06-24': { label: 'Nascimento de São João Batista', type: 'S', color: 'white' },
  '2028-06-25': { label: '12º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Julho 2028
  '2028-07-02': { label: 'Santos Pedro e Paulo, apóstolos', type: 'S', color: 'red' },
  '2028-07-03': { label: 'São Tomé, apóstolo', type: 'F', color: 'red' },
  '2028-07-09': { label: '14º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-07-16': { label: '15º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-07-22': { label: 'Santa Maria Madalena', type: 'F', color: 'white' },
  '2028-07-23': { label: '16º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-07-25': { label: 'São Tiago, apóstolo', type: 'F', color: 'red' },
  '2028-07-30': { label: '17º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Agosto 2028
  '2028-08-06': { label: 'Transfiguração do Senhor', type: 'F', color: 'white' },
  '2028-08-10': { label: 'São Lourenço, diácono e mártir', type: 'F', color: 'red' },
  '2028-08-13': { label: '19º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-08-20': { label: 'Assunção de Nossa Senhora', type: 'S', color: 'white' },
  '2028-08-23': { label: 'Santa Rosa de Lima, virgem', type: 'F', color: 'white' },
  '2028-08-24': { label: 'São Bartolomeu, apóstolo', type: 'F', color: 'red' },
  '2028-08-27': { label: '21º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Setembro 2028
  '2028-09-03': { label: '22º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-09-08': { label: 'Natividade da Virgem Maria', type: 'F', color: 'white' },
  '2028-09-10': { label: '23º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-09-14': { label: 'Exaltação da Santa Cruz', type: 'F', color: 'red' },
  '2028-09-17': { label: '24º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-09-21': { label: 'São Mateus, apóstolo e evangelista', type: 'F', color: 'red' },
  '2028-09-24': { label: '25º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-09-29': { label: 'Santos Arcanjos', type: 'F', color: 'white' },
  // Outubro 2028
  '2028-10-01': { label: '26º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-10-08': { label: '27º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-10-12': { label: 'Nossa Senhora Aparecida', type: 'S', color: 'white' },
  '2028-10-15': { label: '28º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-10-18': { label: 'São Lucas, evangelista', type: 'F', color: 'red' },
  '2028-10-22': { label: '29º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-10-28': { label: 'Santos Simão e Judas, apóstolos', type: 'F', color: 'red' },
  '2028-10-29': { label: '30º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Novembro 2028
  '2028-11-02': { label: 'Fiéis Defuntos', type: 'S', color: 'purple' },
  '2028-11-05': { label: 'Todos os Santos', type: 'S', color: 'white' },
  '2028-11-09': { label: 'Dedicação da Basílica de Latrão', type: 'F', color: 'white' },
  '2028-11-12': { label: '32º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-11-19': { label: '33º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2028-11-26': { label: 'Cristo Rei do Universo', type: 'S', color: 'white' },
  '2028-11-30': { label: 'Santo André, apóstolo', type: 'F', color: 'red' },
  // Dezembro 2028
  '2028-12-03': { label: '1º Domingo do Advento', type: 'D', color: 'purple' },
  '2028-12-08': { label: 'Imaculada Conceição', type: 'S', color: 'white' },
  '2028-12-10': { label: '2º Domingo do Advento', type: 'D', color: 'purple' },
  '2028-12-12': { label: 'Nossa Senhora de Guadalupe', type: 'F', color: 'white' },
  '2028-12-17': { label: '3º Domingo do Advento', type: 'D', color: 'purple' },
  '2028-12-24': { label: '4º Domingo do Advento', type: 'D', color: 'purple' },
  '2028-12-25': { label: 'Natal do Senhor', type: 'S', color: 'white' },
  '2028-12-26': { label: 'Santo Estêvão, primeiro mártir', type: 'F', color: 'red' },
  '2028-12-27': { label: 'São João, apóstolo e evangelista', type: 'F', color: 'white' },
  '2028-12-28': { label: 'Santos Inocentes, mártires', type: 'F', color: 'red' },
  '2028-12-31': { label: 'Sagrada Família', type: 'F', color: 'white' }
};
