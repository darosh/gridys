import { Shape, TriangularGrid } from 'gridy';
import { Theme } from '../Theme';
import { ConnectGameBase } from './base/ConnectGameBase';
export class TicTacToeTriGame extends ConnectGameBase {
    constructor() {
        super(new TriangularGrid(1, false, Shape.Triangular, 3, 3), 3);
        this.landscape = true;
    }
}
TicTacToeTriGame.title = 'Tic Tac Toe Tri';
TicTacToeTriGame.theme = Theme.Hex;
TicTacToeTriGame.group = 'Connect';
TicTacToeTriGame.original = 'TicTacToeGame';
TicTacToeTriGame.sample = 'a2, b2, b1, a1, c1';
//# sourceMappingURL=TicTacToeTriGame.js.map