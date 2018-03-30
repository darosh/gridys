import { Radial8Tile, RadialGrid, Shape } from 'gridy';
import { ConnectGameBase } from './base/ConnectGameBase';
export class FourInARowRoundGame extends ConnectGameBase {
    constructor() {
        const grid = new RadialGrid(1, false, Shape.Even, 12, 8, Radial8Tile, 2);
        super(grid, 4);
    }
}
FourInARowRoundGame.title = 'Four-in-a-row Round';
FourInARowRoundGame.group = 'Connect';
FourInARowRoundGame.rules = ['Connect four pieces'];
FourInARowRoundGame.original = 'FourInARow11Game';
FourInARowRoundGame.sample = 'f5, g4, g5, h5, f3, i6, f6, f4, h4, i3, e7';
//# sourceMappingURL=FourInARowRoundGame.js.map