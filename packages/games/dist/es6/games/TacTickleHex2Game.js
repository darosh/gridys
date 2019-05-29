import { HexagonalGrid, HexagonalTile, Shape, normalize } from '@gridy/core';
import { TacTickleGameBase } from './base/TacTickleGameBase';
export class TacTickleHex2Game extends TacTickleGameBase {
    constructor() {
        const grid = new HexagonalGrid(1, true, Shape.Hexagonal, 4);
        normalize(grid);
        super(grid, 3, HexagonalTile.directions, [[3, 0, 0], [0, 6, 0]]);
    }
}
TacTickleHex2Game.title = 'Tac-tickle Hex2';
TacTickleHex2Game.group = 'Move to Connect';
TacTickleHex2Game.original = 'TacTickleGame';
// tslint:disable-next-line:max-line-length
TacTickleHex2Game.sample = 'g1-f2, f1-e2, f2-f3, d7-d6, f3-e4, b7-b6, e4-d5, d6-c6, d5-c5, d1-d2, a7-b7, e2-d3, e1-f1, d3-c4, f1-e2, d2-d3, c5-b5, b6-c5';
//# sourceMappingURL=TacTickleHex2Game.js.map