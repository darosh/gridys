import { IGame, Move } from '@gridy/games'

export interface MoveStat { move?: Move, [key: string]: any }

export interface IPLayer {
  select (game: IGame): MoveStat
}
