import { IGame, IPLayer, Move } from '../';
export declare class RandomPlayer implements IPLayer {
    select(game: IGame): Move;
}
