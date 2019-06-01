import { IPLayer } from './IPlayer'
import { IGame, Move } from '@gridy/games'

export class RandomPlayer implements IPLayer {
  public select (game: IGame): Move {
    const possible = game.possible()

    return { move: possible[Math.floor(Math.random() * possible.length)] }
  }
}
