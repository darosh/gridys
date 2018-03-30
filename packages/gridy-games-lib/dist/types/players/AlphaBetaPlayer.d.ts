import { IGame, IPLayer, Move } from '../';
export declare class AlphaBetaPlayer implements IPLayer {
    count: number;
    hit: number;
    depth: number;
    constructor(depth?: number);
    select(game: IGame): Move;
    private move(game, depth, isMaximisingPlayer?);
    private minimax(depth, game, inputAlpha, inputBeta, isMaximisingPlayer);
}
