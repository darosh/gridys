import { Rectangular8Tile, RectangularGrid, RectangularTile, Shape } from 'gridy';
import { TacTickleGameBase } from './base/TacTickleGameBase';
export class TacTickle4Game extends TacTickleGameBase {
    constructor() {
        super(new RectangularGrid(1, undefined, Shape.Even, 4, 4, Rectangular8Tile), 3, RectangularTile.directions);
    }
}
TacTickle4Game.title = 'Tac-tickle 4x4';
TacTickle4Game.group = 'Move to Connect';
TacTickle4Game.aliases = 'Tic-tackle';
TacTickle4Game.original = 'TacTickleGame';
TacTickle4Game.sample = 'c4-c3, a1-a2, d1-d2, d4-c4, c3-b3, c1-c2, d2-d1, c4-c3, b3-a3, c2-d2';
//# sourceMappingURL=TacTickle4Game.js.map