import { HexagonalGrid, Shape } from 'gridy';
import { landscapeHex } from '../utils';
import { HexGameBase } from './base/HexGameBase';
export class HexGame extends HexGameBase {
    constructor() {
        super(landscapeHex(new HexagonalGrid(1, undefined, Shape.Rhombus, 11)));
    }
}
HexGame.title = 'Hex';
HexGame.group = 'Hex';
HexGame.created = 1942;
HexGame.location = 'Denmark';
HexGame.authors = ['Piet Hein', 'John Nash'];
HexGame.aliases = ['Con-tac-tix'];
HexGame.wiki = 'https://en.wikipedia.org/wiki/Hex_(board_game)';
HexGame.rules = ['Connect edges'];
// tslint:disable-next-line:max-line-length
HexGame.sample = 'f6, g6, f7, g5, e5, f5, e6, d4, d5, c5, b6, c6, g8, c8, i8, e2, k8, c10, j8, c9, h8, e3, f8, c11, c7, b7, d6, b8, a6, e1';
//# sourceMappingURL=HexGame.js.map