import { HexagonalGrid, Shape } from '@gridy/core';
import { MinimaxPlayer } from '../players/MinimaxPlayer';
import { ConnectGameBase } from './base/ConnectGameBase';
export class GomokuHexGame extends ConnectGameBase {
    constructor() {
        super(new HexagonalGrid(1, true, Shape.Even, 15), 5);
    }
}
GomokuHexGame.title = 'Gomoku Hex';
GomokuHexGame.group = 'Connect';
GomokuHexGame.original = 'GomokuGame';
GomokuHexGame.sample = 'h8, i8, h7, i7, i6, i5, g9, g10, h10, j6, h9, j7, g8, k8, i4, k9';
GomokuHexGame.player = () => new MinimaxPlayer(2);
//# sourceMappingURL=GomokuHexGame.js.map