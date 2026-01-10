
import { Song, SongCategory } from '../types';

export const REPERTORIO_ESTATICO: Song[] = [
  // ATO PENITENCIAL (3 OPÇÕES DISPONÍVEIS EM TODOS OS DOMINGOS)
  {
    id: 'penitencial-1',
    title: 'Ato penitencial 1 (Confesso a Deus)',
    category: SongCategory.Penitential,
    isFixed: true,
    lyrics: `Confesso a Deus Todo-Poderoso e a vós, irmãos e irmãs, que pequei muitas vezes por pensamentos e palavras, atos e omissões, por minha culpa, minha tão grande culpa.

E peço à Virgem Maria, aos Anjos e Santos, e a vós, irmãos e irmãs, que rogueis por mim a Deus, Nosso Senhor.`
  },
  {
    id: 'penitencial-2',
    title: 'Ato penitencial 2 (Tende compaixão)',
    category: SongCategory.Penitential,
    isFixed: true,
    lyrics: `Tende compaixão de nós, Senhor.
Todos: Porque somos pecadores.

Manifestai, Senhor, a vossa misericórdia.
Todos: E dai-nos a vossa salvação.

Segue-se a absolvição sacerdotal:
Presbítero: Deus Todo-Poderoso tenha compaixão de nós, perdoe os nossos pecados e nos conduza à vida eterna.
Todos: Amém.

Senhor, tende piedade de nós.
Todos: Senhor, tende piedade de nós.
Cristo, tende piedade de nós.
Todos: Cristo, tende piedade de nós.
Senhor, tende piedade de nós.
Todos: Senhor, tende piedade de nós.`
  },
  {
    id: 'penitencial-3',
    title: 'Ato penitencial 3 (Senhor, que viestes salvar)',
    category: SongCategory.Penitential,
    isFixed: true,
    lyrics: `Senhor, que viestes salvar os corações arrependidos, tende piedade de nós.
Todos: Senhor, tende piedade de nós.

Cristo, que viestes chamar os pecadores, tende piedade de nós.
Todos: Cristo, tende piedade de nós.

Senhor, que intercedeis por nós junto ao Pai, tende piedade de nós.
Todos: Senhor, tende piedade de nós.`
  },

  // GLÓRIA (TEXTO FIXO ÚNICO)
  {
    id: 'gloria-oficial',
    title: 'Hino de Louvor',
    category: SongCategory.Gloria,
    isFixed: true,
    lyrics: `Glória a Deus nas alturas e paz na terra aos homens por ele amados.
Nós vos louvamos, nós vos bendizemos, nós vos adoramos, nós vos glorificamos, nós vos damos graças por vossa imensa glória.

Senhor Deus, rei dos céus, Deus Pai todo-poderoso.
Senhor Jesus Cristo, Filho unigênito, Senhor Deus, cordeiro de Deus, Filho de Deus Pai.

Vós que tirais o pecado do mundo, tende piedade de nós.
Vós que tirais o pecado do mundo, acolhei a nossa súplica.
Vós que estais à direita do Pai, tende piedade de nós.
Tende piedade de nós. Tende piedade de nós!

Só vós sois o Santo, só vós o Senhor, só vós o Altíssimo, Jesus Cristo, com o Espírito Santo, na glória de Deus Pai. Amém!`
  },

  // SANTO (TEXTO FIXO ÚNICO)
  {
    id: 'santo-oficial',
    title: 'Santo oficial',
    category: SongCategory.Holy,
    isFixed: true,
    lyrics: `Santo, santo, santo, Senhor Deus do Universo.
O céu e a terra proclamam a vossa glória.
Hosana nas alturas.

Bendito o que vem em nome do Senhor.
Hosana nas alturas.`
  },

  // CORDEIRO (TEXTO FIXO ÚNICO)
  {
    id: 'cordeiro-oficial',
    title: 'Cordeiro de Deus',
    category: SongCategory.LambOfGod,
    isFixed: true,
    lyrics: `Cordeiro de Deus que tirais o pecado do mundo, tende piedade de nós. 

Cordeiro de Deus que tirais o pecado do mundo, tende piedade de nós. 

Cordeiro de Deus que tirais o pecado do mundo, dai-nos a vossa paz.`
  },

  // CANTOS PRÓPRIOS (POR DATA)
  {
    id: 'batismo-do-senhor-11-jan',
    title: 'Pois abriram-se os céus (Batismo do Senhor)',
    category: SongCategory.Acclamation,
    date: '2026-01-11',
    lyrics: `Pois abriram-se os céus
E a voz do Pai se ouviu:
Eis meu Filho muito amado
Profecia se abriu.

Aleluia, aleluia,
Aleluia, aleluia,
Aleluia, aleluia! (Bis)`
  }
];
