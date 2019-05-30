import { IGame } from '@gridy/games';
import { IPLayer } from '../index';

export function playout(game: IGame, players: IPLayer[]) {
  while (!game.winner && game.possible().length) {
    game.move(players[game.moves.length % players.length].select(game).move);
  }
}
