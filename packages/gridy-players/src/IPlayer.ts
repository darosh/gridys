import { IGame, Move } from '@gridy/games'

export type MoveStat = { move?: Move, [key: string]: any }

export interface IPLayer {
  select (game: IGame): MoveStat
}
