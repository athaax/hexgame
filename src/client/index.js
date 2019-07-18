import { Client } from 'boardgame.io/react';
import { index } from '../game';
import Board from './Board';

export default Client({
  game: index,
  board: Board,
  // ai,
  // multiplayer: { server: 'localhost:8000' },
  // debug: false,
});
