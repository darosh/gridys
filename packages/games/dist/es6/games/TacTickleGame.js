import { Rectangular8Tile, RectangularGrid, RectangularTile, Shape } from '@gridy/core';
import { TacTickleGameBase } from './base/TacTickleGameBase';
export class TacTickleGame extends TacTickleGameBase {
    constructor() {
        super(new RectangularGrid(1, undefined, Shape.Even, 4, 5, Rectangular8Tile), 3, RectangularTile.directions);
    }
}
TacTickleGame.title = 'Tac-tickle';
TacTickleGame.group = 'Move to Connect';
TacTickleGame.authors = ['NRICH'];
TacTickleGame.source = 'https://nrich.maths.org/1240';
TacTickleGame.created = '2000';
TacTickleGame.rules = ['Move to connect three pieces'];
TacTickleGame.sample = 'c5-c4, b5-b4, d1-d2, a1-a2, a5-b5, b4-a4, d2-d3';
//# sourceMappingURL=TacTickleGame.js.map