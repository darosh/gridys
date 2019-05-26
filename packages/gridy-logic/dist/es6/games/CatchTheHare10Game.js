import { Rectangular8Tile, RectangularGrid, Shape } from '@gridy/core';
import { CatchTheHareGameBase } from './base/CatchTheHareGameBase';
export class CatchTheHare10Game extends CatchTheHareGameBase {
    constructor() {
        super(new RectangularGrid(1, false, Shape.Even, 5, 5, Rectangular8Tile), 5 * 5 * 3);
        for (let i = 0; i < 10; i++) {
            this.grid.tiles[i].data = 1;
        }
        this.grid.tiles[12].data = 2;
        this.score = { 1: 10, 2: 1 };
    }
}
CatchTheHare10Game.title = 'Catch the Hare 10';
CatchTheHare10Game.group = 'Qirkat';
CatchTheHare10Game.original = 'CatchTheHareGame';
// tslint:disable-next-line:max-line-length
CatchTheHare10Game.sample = 'b4-c4, c3-c4-c5, a5-b4, c5-b5-a5-b4-c3, a3-b4, c3-b3-a3-a4-a5, b2-c2, a5-b4-c3-c2-c1, a1-b2, c1-b1-a1-a2-a3, b2-b3, a3-b3-c3';
//# sourceMappingURL=CatchTheHare10Game.js.map
