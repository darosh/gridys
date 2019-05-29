import { IGame, IPLayer, Move } from '../';
export declare class MinimaxPlayer implements IPLayer {
    count: number;
    depth: number;
    constructor(depth?: number);
    select(game: IGame): Move;
    private move;
    private minimax;
}
