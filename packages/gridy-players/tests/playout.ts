import { IGame } from '@gridy/games';
import { IPLayer } from '../src';

export function playout(game: IGame, players: IPLayer[]) {
  while (!game.winner && game.possible().length) {
    game.move(players[game.moves.length % players.length].select(game).move);
  }
}
