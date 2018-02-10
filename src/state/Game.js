import Board from 'state/Board';
import ScoreBoard from 'state/ScoreBoard';

export default class Game {
    static create(width, height, players) {
        const board = Board.create(width, height);
        return new Game(board, players, 0, new ScoreBoard(board, players));
    }

    constructor(board, players, activePlayerIndex, scoreBoard) {
        this._board = board;
        this._players = players;
        this._activePlayerIndex = activePlayerIndex;
        this._scoreBoard = scoreBoard;
    }

    width() {
        return this._board.width();
    }

    height() {
        return this._board.height();
    }

    activePlayer() {
        return this._players[this._activePlayerIndex];
    }

    dotAt(x, y) {
        return this._board.dotAt(x, y);
    }

    ownerAt(x, y) {
        return this._board.ownerAt(x, y);
    }

    drawTopLine(x, y) {
        if(!this.dotAt(x, y).topLineOwner()) {
            const board = this._board.drawTopLine(this.activePlayer(), x, y);
            return this._nextGameState(board);
        } else {
            return null;
        }
    }

    drawLeftLine(x, y) {
        if(!this.dotAt(x, y).leftLineOwner()) {
            const board = this._board.drawLeftLine(this.activePlayer(), x, y);
            return this._nextGameState(board);
        } else {
            return null;
        }
    }

    scores() {
        return this._scoreBoard.scores();
    }

    _nextGameState(board) {
        return new Game(
            board,
            this._players,
            this._nextActivePlayerIndex(),
            this._scoreBoard);
    }

    _nextActivePlayerIndex() {
        return (this._activePlayerIndex + 1) % this._players.length;
    }
}
