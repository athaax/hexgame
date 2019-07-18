import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HexGrid} from 'boardgame.io/ui';
import {createPoint, isSame} from '../utils';
import {Token} from 'boardgame.io/dist/ui';
import Unit from './Unit';

const style = {
  display: 'flex',
  flexDirection: 'column'
};

const hexStyle = {
  display: 'flex',
  flexGrow: 1,
  width: 500,
}

const styles = {
  moves: {
    display: 'flex',
    flexDirection: 'row',
  },
  move: {
    padding: 5,
    border: '1px solid black',
    backgroundColor: 'grey',
  },
  clickableMove: {
    cursor: 'pointer',
    backgroundColor: 'white',
  }
};

const getCellColor_old = HexGrid.prototype._getCellColor;

HexGrid.prototype._getCellColor = function (...coords) {
  const color = getCellColor_old.bind(this)(...coords);
  return color !== 'white' ? color : '#ccccd0';
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.render = this.render.bind(this);
    this.cellClicked = this.cellClicked.bind(this);
  }

  cellClicked({x, y, z}) {
    // what unit was selected
    // what options are now available in the toolbar
    // possible paths? Pathfinding
    const phase = this.props.ctx.phase;
    const point = createPoint(x, y, z);
    if (phase === 'selectInsect') {
      const found = this.props.G.insects.find((insect) => isSame(point)(insect.point));
      if (found && found.player === this.props.ctx.currentPlayer && found.isMovable === true) {
        this.props.moves.selectOld(found);
      }
    } else if (phase === 'moveInsect') {
      const found = this.props.G.availablePoints.find(isSame(point));
      if (found !== undefined) {
        this.props.moves.moveInsect(found);
      }
    }
  }

  render() {
    const player = this.props.G.players[this.props.ctx.currentPlayer];
    return (
      <div style={style}>
        <HexGrid
          levels={this.props.G.grid.levels}
          style={hexStyle}
          colorMap={this.props.G.grid.colorMap}
          onClick={this.cellClicked}>
          {
            this.props.G.insects.map((insect, i) => {
              const { x, y, z } = insect.point;
              return <Token x={x} y={y} z={z} key={i}>
                <Unit insect={insect} />
              </Token>
            })
          }
        </HexGrid>
        <div>
          <div>Player: {player.id}</div>
          <div style={styles.moves}>
            {player.insects.map((insect, i) => {
              return insect.isClickable ?
                <div style={{ ...styles.move, ...styles.clickableMove }} onClick={() => this.props.moves.selectNew(insect)} key={i}>{insect.type}</div> :
                <div style={styles.move} key={i}>{insect.type}</div>;
            })}
          </div>
        </div>
        <div>phase: {this.props.ctx.phase}</div>
        <button onClick={this.props.moves.cancel}>Cancel</button>
      </div>
    );
  }
}

Board.propTypes = {
  G: PropTypes.instanceOf(Object), // Game object
  ctx: PropTypes.instanceOf(Object), // game metadata
  moves: PropTypes.instanceOf(Object), // dict of reducer functions defined in moves.js
  events: PropTypes.instanceOf(Object), // An object containing functions to dispatch various game events like endTurn and endPhase.
  reset: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired,
  gameID: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired, // true if the client is able to currently make a move or interact with the game.
  isMultiplayer: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired // true if connection to the server is active
};

export default Board
