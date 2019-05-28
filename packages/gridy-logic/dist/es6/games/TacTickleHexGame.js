import { HexagonalGrid, HexagonalTile, Shape } from '@gridy/core';
import { TacTickleGameBase } from './base/TacTickleGameBase';
export class TacTickleHexGame extends TacTickleGameBase {
    constructor() {
        super(new HexagonalGrid(1, true, Shape.Even, 4, 5), 3, HexagonalTile.directions);
    }
}
TacTickleHexGame.title = 'Tac-tickle Hex';
TacTickleHexGame.group = 'Move to Connect';
TacTickleHexGame.original = 'TacTickleGame';
TacTickleHexGame.sample = 'b1-c2, d5-d4, c5-c4, c1-d2, a5-b4, b5-a5, c4-b3';
//# sourceMappingURL=TacTickleHexGame.js.map