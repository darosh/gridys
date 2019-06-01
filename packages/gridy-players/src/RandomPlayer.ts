import { IPLayer, MoveStat } from './IPlayer'
import { IGame, Move } from '@gridy/games'

export class RandomPlayer implements IPLayer {
  public select (game: IGame): MoveStat {
    const possible = game.possible()

    return { move: possible[Math.floor(Math.random() * possible.length)] }
  }
}
