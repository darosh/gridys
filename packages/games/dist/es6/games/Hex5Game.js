import { HexagonalGrid, Shape } from '@gridy/core';
import { landscapeHex } from '../utils';
import { HexGameBase } from './base/HexGameBase';
export class Hex5Game extends HexGameBase {
    constructor() {
        super(landscapeHex(new HexagonalGrid(1, undefined, Shape.Rhombus, 5)));
    }
}
Hex5Game.title = 'Hex 5x5';
Hex5Game.group = 'Hex';
Hex5Game.original = 'HexGame';
Hex5Game.sample = 'e1, b2, b3, a4, a3, c2, c3, d2, d3, e3, e2';
//# sourceMappingURL=Hex5Game.js.map