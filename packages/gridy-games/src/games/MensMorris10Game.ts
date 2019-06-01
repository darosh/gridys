import { MorrisGameBase } from './base/MorrisGameBase'

export class MensMorris10Game extends MorrisGameBase {
  public static title = 'Ten Men\'s Morris';
  public static group = 'Mills';
  public static original = 'MensMorris9Game';
  public static aliases = ['Lasker Morris'];

  constructor () {
    super(3)
  }
}
