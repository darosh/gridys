import { HexagonalGrid, Shape } from '@gridy/core';
import { landscapeHex } from '../utils';
import { HexGameBase } from './base/HexGameBase';
export class Hex7Game extends HexGameBase {
    constructor() {
        super(landscapeHex(new HexagonalGrid(1, undefined, Shape.Rhombus, 7)));
    }
}
Hex7Game.title = 'Hex 7x7';
Hex7Game.group = 'Hex';
Hex7Game.original = 'HexGame';
Hex7Game.sample = 'c7, c6, c5, a4, f1, e7, c3, g4, g3, g2, a6, e2, d5, f5, f4, d3, e4, g7, b5';
//# sourceMappingURL=Hex7Game.js.map