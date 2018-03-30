import { HexagonalGrid, Shape } from 'gridy';
import { landscapeHex } from '../utils';
import { ReversiGameBase } from './base/ReversiGameBase';
export class ReversiHex4Game extends ReversiGameBase {
    constructor() {
        super(landscapeHex(new HexagonalGrid(1, undefined, Shape.Rhombus, 4)));
    }
}
ReversiHex4Game.title = 'Reversi Hex 4x4';
ReversiHex4Game.group = 'Reversi';
ReversiHex4Game.original = 'ReversiGame';
ReversiHex4Game.sample = 'b3, c3, c2, b2, c4, b4, a4, d2, d1, pass, a2, pass, d3';
//# sourceMappingURL=ReversiHex4Game.js.map