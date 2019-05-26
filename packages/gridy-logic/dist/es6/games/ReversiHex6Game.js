import { HexagonalGrid, Shape } from '@gridy/core';
import { landscapeHex } from '../utils';
import { ReversiGameBase } from './base/ReversiGameBase';
export class ReversiHex6Game extends ReversiGameBase {
    constructor() {
        super(landscapeHex(new HexagonalGrid(1, undefined, Shape.Rhombus, 6)));
    }
}
ReversiHex6Game.title = 'Reversi Hex 6x6';
ReversiHex6Game.group = 'Reversi';
ReversiHex6Game.original = 'ReversiGame';
// tslint:disable-next-line:max-line-length
ReversiHex6Game.sample = 'd3, c4, d4, c3, b3, e4, d5, c2, f4, e3, f3, e2, d2, e5, f1, f2, e1, a3, e6, c5, b4, d6, c6, b5, b2, c1, a6, b6, a5, f6, b1, a1, d1, f5, pass, a4, a2';
//# sourceMappingURL=ReversiHex6Game.js.map
