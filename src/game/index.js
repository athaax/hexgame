import {Game} from 'boardgame.io/core';
import {moves} from './moves';
import {setup} from './setup';
import {postProcess} from './postProcess';

export const index = Game({
  name: 'Hexapolis',
  setup,
  moves,
  flow: {
    phases: [
      {
        name: 'selectInsect',
        allowedMoves: ['selectNew', 'selectOld'],
        endPhaseIf: G => G.currentInsect !== null,
      },
      {
        name: 'moveInsect',
        allowedMoves: ['moveInsect', 'cancel'],
        endPhaseIf: G => G.currentInsect === null,
      },
    ],
    endTurnIf: (G, ctx) => G.moveCount > ctx.turn,
    endGameIf: (G, ctx) => G.gameover !== null ? G.gameover : undefined,
    onMove: (G, ctx) => postProcess(G),
  },
});
