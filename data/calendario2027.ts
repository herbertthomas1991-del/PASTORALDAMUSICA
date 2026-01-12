
export type CelebrationType = 'S' | 'F' | 'M' | 'm' | 'D'; // Solenidade, Festa, Memória, Memória Fac., Domingo

export interface Celebration2027 {
  label: string;
  type: CelebrationType;
  color: 'white' | 'green' | 'purple' | 'red';
}

export const CALENDARIO_2027: Record<string, Celebration2027> = {
  // Janeiro 2027
  '2027-01-01': { label: 'Santa Maria, Mãe de Deus', type: 'S', color: 'white' },
  '2027-01-03': { label: 'Epifania do Senhor', type: 'S', color: 'white' },
  '2027-01-10': { label: 'Batismo do Senhor', type: 'F', color: 'white' },
  '2027-01-17': { label: '2º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-01-24': { label: '3º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-01-25': { label: 'Conversão de São Paulo, apóstolo', type: 'F', color: 'white' },
  '2027-01-31': { label: '4º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Fevereiro 2027
  '2027-02-02': { label: 'Apresentação do Senhor', type: 'F', color: 'white' },
  '2027-02-07': { label: '5º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-02-10': { label: 'Quarta-feira de Cinzas', type: 'S', color: 'purple' },
  '2027-02-14': { label: '1º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2027-02-21': { label: '2º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2027-02-22': { label: 'Cadeira de São Pedro, apóstolo', type: 'F', color: 'white' },
  '2027-02-28': { label: '3º Domingo da Quaresma', type: 'D', color: 'purple' },
  // Março 2027
  '2027-03-07': { label: '4º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2027-03-14': { label: '5º Domingo da Quaresma', type: 'D', color: 'purple' },
  '2027-03-19': { label: 'São José, Esposo de Maria', type: 'S', color: 'white' },
  '2027-03-21': { label: 'Domingo de Ramos', type: 'D', color: 'red' },
  '2027-03-25': { label: 'Quinta-feira da Ceia do Senhor', type: 'S', color: 'white' },
  '2027-03-26': { label: 'Sexta-feira da Paixão', type: 'S', color: 'red' },
  '2027-03-27': { label: 'Sábado Santo (Vigília)', type: 'S', color: 'white' },
  '2027-03-28': { label: 'Domingo de Páscoa', type: 'S', color: 'white' },
  // Abril 2027
  '2027-04-04': { label: '2º Domingo da Páscoa (Divina Misericórdia)', type: 'D', color: 'white' },
  '2027-04-05': { label: 'Anunciação do Senhor', type: 'S', color: 'white' },
  '2027-04-11': { label: '3º Domingo da Páscoa', type: 'D', color: 'white' },
  '2027-04-18': { label: '4º Domingo da Páscoa', type: 'D', color: 'white' },
  '2027-04-25': { label: '5º Domingo da Páscoa', type: 'D', color: 'white' },
  // Maio 2027
  '2027-05-02': { label: '6º Domingo da Páscoa', type: 'D', color: 'white' },
  '2027-05-03': { label: 'Santos Filipe e Tiago, apóstolos', type: 'F', color: 'red' },
  '2027-05-09': { label: 'Ascensão do Senhor', type: 'S', color: 'white' },
  '2027-05-14': { label: 'São Matias, apóstolo', type: 'F', color: 'red' },
  '2027-05-16': { label: 'Domingo de Pentecostes', type: 'S', color: 'red' },
  '2027-05-23': { label: 'Santíssima Trindade', type: 'S', color: 'white' },
  '2027-05-27': { label: 'Corpus Christi', type: 'S', color: 'white' },
  '2027-05-30': { label: '9º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-05-31': { label: 'Visitação de Nossa Senhora', type: 'F', color: 'white' },
  // Junho 2027
  '2027-06-04': { label: 'Sagrado Coração de Jesus', type: 'S', color: 'white' },
  '2027-06-06': { label: '10º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-06-13': { label: '11º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-06-20': { label: '12º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-06-24': { label: 'Nascimento de São João Batista', type: 'S', color: 'white' },
  '2027-06-27': { label: '13º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Julho 2027
  '2027-07-03': { label: 'São Tomé, apóstolo', type: 'F', color: 'red' },
  '2027-07-04': { label: 'Santos Pedro e Paulo, apóstolos', type: 'S', color: 'red' },
  '2027-07-11': { label: '15º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-07-16': { label: 'Nossa Senhora do Carmo', type: 'F', color: 'white' },
  '2027-07-18': { label: '16º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-07-22': { label: 'Santa Maria Madalena', type: 'F', color: 'white' },
  '2027-07-25': { label: '17º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Agosto 2027
  '2027-08-01': { label: '18º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-08-06': { label: 'Transfiguração do Senhor', type: 'F', color: 'white' },
  '2027-08-08': { label: '19º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-08-10': { label: 'São Lourenço, diácono e mártir', type: 'F', color: 'red' },
  '2027-08-15': { label: 'Assunção de Nossa Senhora', type: 'S', color: 'white' },
  '2027-08-22': { label: '21º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-08-23': { label: 'Santa Rosa de Lima, virgem', type: 'F', color: 'white' },
  '2027-08-24': { label: 'São Bartolomeu, apóstolo', type: 'F', color: 'red' },
  '2027-08-29': { label: '22º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Setembro 2027
  '2027-09-05': { label: '23º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-09-08': { label: 'Natividade da Virgem Maria', type: 'F', color: 'white' },
  '2027-09-12': { label: '24º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-09-14': { label: 'Exaltação da Santa Cruz', type: 'F', color: 'red' },
  '2027-09-19': { label: '25º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-09-21': { label: 'São Mateus, apóstolo e evangelista', type: 'F', color: 'red' },
  '2027-09-26': { label: '26º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-09-29': { label: 'Santos Arcanjos', type: 'F', color: 'white' },
  // Outubro 2027
  '2027-10-03': { label: '27º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-10-10': { label: '28º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-10-12': { label: 'Nossa Senhora Aparecida', type: 'S', color: 'white' },
  '2027-10-17': { label: '29º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-10-18': { label: 'São Lucas, evangelista', type: 'F', color: 'red' },
  '2027-10-24': { label: '30º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-10-28': { label: 'Santos Simão e Judas, apóstolos', type: 'F', color: 'red' },
  '2027-10-31': { label: '31º Domingo do Tempo Comum', type: 'D', color: 'green' },
  // Novembro 2027
  '2027-11-02': { label: 'Fiéis Defuntos', type: 'S', color: 'purple' },
  '2027-11-07': { label: 'Todos os Santos', type: 'S', color: 'white' },
  '2027-11-09': { label: 'Dedicação da Basílica de Latrão', type: 'F', color: 'white' },
  '2027-11-14': { label: '33º Domingo do Tempo Comum', type: 'D', color: 'green' },
  '2027-11-21': { label: 'Cristo Rei do Universo', type: 'S', color: 'white' },
  '2027-11-28': { label: '1º Domingo do Advento', type: 'D', color: 'purple' },
  '2027-11-30': { label: 'Santo André, apóstolo', type: 'F', color: 'red' },
  // Dezembro 2027
  '2027-12-05': { label: '2º Domingo do Advento', type: 'D', color: 'purple' },
  '2027-12-08': { label: 'Imaculada Conceição', type: 'S', color: 'white' },
  '2027-12-12': { label: '3º Domingo do Advento', type: 'D', color: 'purple' },
  '2027-12-19': { label: '4º Domingo do Advento', type: 'D', color: 'purple' },
  '2027-12-25': { label: 'Natal do Senhor', type: 'S', color: 'white' },
  '2027-12-26': { label: 'Sagrada Família', type: 'F', color: 'white' },
  '2027-12-27': { label: 'São João, apóstolo e evangelista', type: 'F', color: 'white' },
  '2027-12-28': { label: 'Santos Inocentes, mártires', type: 'F', color: 'red' }
};
