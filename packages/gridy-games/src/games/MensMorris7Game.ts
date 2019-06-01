import { MorrisGameBase } from './base/MorrisGameBase'

export class MensMorris7Game extends MorrisGameBase {
  public static title = 'Seven Men\'s Morris';
  public static group = 'Mills';
  public static original = 'MensMorris9Game';

  constructor () {
    super(2, true, false, 7)
  }
}
