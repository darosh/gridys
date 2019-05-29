import { Rectangular8Tile, RectangularGrid, Shape } from '@gridy/core';
import { ReversiGameBase } from './base/ReversiGameBase';
export class OthelloGame extends ReversiGameBase {
    constructor() {
        super(new RectangularGrid(1, undefined, Shape.Even, 8, 8, Rectangular8Tile), true);
    }
}
OthelloGame.title = 'Othello';
OthelloGame.group = 'Reversi';
OthelloGame.created = 1971;
OthelloGame.authors = [' Goro Hasegawa'];
OthelloGame.wiki = 'https://en.wikipedia.org/wiki/Reversi';
OthelloGame.location = 'Japan';
OthelloGame.rules = ['Capture more pieces'];
// public static original = 'ReversiGame';
// tslint:disable-next-line:max-line-length
OthelloGame.sample = 'f4, d3, c3, f5, e3, g3, e6, c2, d6, c7, f3, b3, f6, g6, d2, e1, f7, e8, h3, c4, c1, e2, h6, h5, h4, g2, c6, g7, h1, f2, b4, b5, c5, d1, f1, d7, a5, b6, a6, g5, g1, b7, a8, a7, d8, e7, b8, b2, g4, c8, b1, a3, a4, h2, f8, h8, h7, g8, a2, a1';
//# sourceMappingURL=OthelloGame.js.map