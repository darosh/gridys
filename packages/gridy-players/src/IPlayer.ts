import { IGame, Move } from '@gridy/games'

export interface IPLayer {
  select (game: IGame): Move
}
