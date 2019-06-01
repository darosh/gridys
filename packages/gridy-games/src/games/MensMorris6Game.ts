import { MorrisGameBase } from './base/MorrisGameBase'

export class MensMorris6Game extends MorrisGameBase {
  public static title = 'Six Men\'s Morris';
  public static group = 'Mills';
  public static original = 'MensMorris9Game';

  constructor () {
    super(2, false, false, 6)
  }
}
