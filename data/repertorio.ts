
import { Song, SongCategory } from '../types';

/**
 * Este é o banco de dados oficial do seu site.
 * Para adicionar novos cantos, basta seguir o padrão abaixo.
 * As datas devem estar no formato YYYY-MM-DD (ex: 2025-05-11 para 11 de Maio de 2025).
 */
export const REPERTORIO_ESTATICO: Song[] = [
  {
    id: 'intro-1',
    title: 'Alegres Vamos',
    category: SongCategory.Entrance,
    date: '2025-05-11', // Exemplo: 4º Domingo da Páscoa
    lyrics: `Alegres vamos à casa do Pai;
E na alegria cantar seu louvor!
Em sua casa, somos felizes:
Participamos da ceia do amor.

1. A alegria nos vem do Senhor,
Seu amor nos conduz pela mão.
Ele é o caminho, a vida e a luz,
Jesus Cristo, nosso irmão!`,
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'gloria-fixo-1',
    title: 'Glória a Deus nas Alturas',
    category: SongCategory.Gloria,
    isFixed: true,
    lyrics: `Glória a Deus nas alturas,
e paz na terra aos homens por Ele amados.
Senhor Deus, Rei dos céus, Deus Pai todo-poderoso:
nós Vos louvamos, nós Vos bendizemos,
nós Vos adoramos, nós Vos glorificamos...`,
    link: ''
  }
  // Adicione mais cantos aqui...
];
