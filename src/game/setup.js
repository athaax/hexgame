let insectId = 0;

const createInsect = type => ({
  type,
  id: insectId++,
  isClickable: true,
});

const createInsects = () => [
  createInsect('ant'),
  createInsect('ant'),
  createInsect('ant'),
  createInsect('spider'),
  createInsect('spider'),
  createInsect('spider'),
  createInsect('queen'),
  createInsect('grasshopper'),
  createInsect('grasshopper'),
  createInsect('grasshopper'),
];

const createPlayer = id => ({
  id,
  insects: createInsects(),
  moveCount: 0,
});

const mapSize = {
  height: 99,
  width: 134
};

const generateManTiles = () => {};

// const createArena = () => {
//   const myth = generateManTiles();
//   return {
//     // myth,
//     man,
//     // legend
//   }
// };

export const setup = () => ({
  currentInsect: null,
  players: [
    createPlayer('0'),
    createPlayer('1')
  ],
  currentPlayer: null,
  qubitz: {},
  arena: {},
  grid: {
    levels: 2,
    colorMap: {},
  },
  availablePoints: [],
  insects: [],
  moveCount: 0,
  gameover: null,
});
