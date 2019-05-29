import { Rectangular8Tile, RectangularGrid, Shape } from '@gridy/core';
import { ReversiGameBase } from './base/ReversiGameBase';
export class Othello4Game extends ReversiGameBase {
    constructor() {
        super(new RectangularGrid(1, undefined, Shape.Even, 4, 4, Rectangular8Tile), true);
    }
}
Othello4Game.title = 'Othello 4x4';
Othello4Game.group = 'Reversi';
Othello4Game.original = 'OthelloGame';
Othello4Game.sample = 'd2, d3, d4, b1, a4, b4, c4, d1, a3, pass, a2';
//# sourceMappingURL=Othello4Game.js.map