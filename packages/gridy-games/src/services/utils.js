import { Games } from '../../plugins/lib'

export function scaleToFit (iw, ih, fw, fh) {
  return Math.min(fw / iw, fh / ih)
}

export function gameData (game, data, original = true) {
  if ((game[data] === undefined) && original && game.original) {
    if (Games[game.original][data] === undefined) {
      return gameData(Games[game.original], data, original)
    }

    return Games[game.original][data]
  } else {
    return game[data]
  }
}
