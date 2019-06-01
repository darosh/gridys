import * as games from './games'

export { Move } from './Move'
export { TimedProxy } from './TimedProxy'
export { IGame } from './IGame'

export * from './games'
// tslint:disable-next-line:variable-name
export const Games = games

export { FIELDS, other, reset, stringify, table, undoFor, update } from './utils'
export * from './utils/actions'

export { Info } from './Info'
export { Theme, ThemeStones, Stones, StoneNames } from './Theme'
