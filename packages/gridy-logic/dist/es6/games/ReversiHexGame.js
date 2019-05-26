import { HexagonalGrid, Shape } from '@gridy/core';
import { landscapeHex } from '../utils';
import { ReversiGameBase } from './base/ReversiGameBase';
export class ReversiHexGame extends ReversiGameBase {
    constructor() {
        super(landscapeHex(new HexagonalGrid(1, false, Shape.Rhombus, 8)));
    }
}
ReversiHexGame.title = 'Reversi Hex';
ReversiHexGame.group = 'Reversi';
ReversiHexGame.original = 'ReversiGame';
// tslint:disable-next-line:max-line-length
ReversiHexGame.sample = 'e4, d4, e5, d5, c6, d6, c7, f3, c5, b6, a6, c8, b5, c4, d3, a5, a4, e2, f4, f5, e6, e3, g5, e7, f2, g4, f6, g2, f1, g3, h1, d2, h4, g1, c2, g6, h2, d1, h3, b2, f7, c3, h6, g7, f8, e8, h5, h7, h8, g8, d7, a7, a8, b4, e1, d8, c1, b1, a2, a3, b7, b8, a1, b3';
//# sourceMappingURL=ReversiHexGame.js.map
