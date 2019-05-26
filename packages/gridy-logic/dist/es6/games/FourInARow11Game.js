import { Rectangular8Tile, RectangularGrid, Shape } from '@gridy/core';
import { MinimaxPlayer } from '../players/MinimaxPlayer';
import { ConnectGameBase } from './base/ConnectGameBase';
export class FourInARow11Game extends ConnectGameBase {
    constructor() {
        super(new RectangularGrid(1, undefined, Shape.Even, 11, 11, Rectangular8Tile), 4);
    }
}
FourInARow11Game.title = 'Four-in-a-row';
FourInARow11Game.group = 'Connect';
FourInARow11Game.rules = ['Connect four pieces'];
FourInARow11Game.wiki = 'https://en.wikipedia.org/wiki/M,n,k-game';
FourInARow11Game.sample = 'f6, f5, e6, g6, d6, c6, e7, e5, c5, b4, f8';
FourInARow11Game.player = () => new MinimaxPlayer(2);
//# sourceMappingURL=FourInARow11Game.js.map
