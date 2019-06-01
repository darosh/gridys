import { MorrisGameBase } from './base/MorrisGameBase'

export class NineHolesGame extends MorrisGameBase {
  public static title = 'Nine Holes';
  public static group = 'Mills';
  public static original = 'MensMorris9Game';
  public static wiki = 'https://en.wikipedia.org/wiki/Three_Men%27s_Morris';

  constructor () {
    super(1, true, true, 3)
  }
}
