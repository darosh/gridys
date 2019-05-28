import { Rectangular8Tile, RectangularGrid, Shape } from '@gridy/core';
import { QirkatGameBase } from './base/QirkatGameBase';
const SIZE = 3;
export class Qirkat3Game extends QirkatGameBase {
    constructor() {
        super(new RectangularGrid(1, false, Shape.Even, SIZE, SIZE, Rectangular8Tile), SIZE * SIZE * 3);
    }
}
Qirkat3Game.title = 'Qirkat 3x3';
Qirkat3Game.group = 'Qirkat';
Qirkat3Game.original = 'QirkatGame';
// tslint:disable-next-line:max-line-length
Qirkat3Game.sample = 'b1-b2, b3-b2-b1, a2-b2, b1-b2-b3, a3-a2, c1-b2, a2-a3, b2-b1, a1-b1-c1, b3-b2, c1-b1, b2-c1, b1-a1, c1-b1, a1-b1-c1, c2-b2, c1-b1, b2-a2, a3-a2-a1, c3-b3, b1-c1, b3-c3, a1-a2, c3-b3, a2-b2, b3-b2-b1, c1-b1-a1';
//# sourceMappingURL=Qirkat3Game.js.map