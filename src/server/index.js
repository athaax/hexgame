const Index = require('boardgame.io/server').Server;
const game = require('../game').index;

const port = 8000;

const server = Index({
  games: [game]
});

server.run(port);

console.log('Server running on port: ' + port);
