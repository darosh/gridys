import { MorrisGameBase } from './base/MorrisGameBase'

export class MensMorris5Game extends MorrisGameBase {
  public static title = 'Five Men\'s Morris';
  public static group = 'Mills';
  public static aliases = ['Smaller Merels'];
  public static original = 'MensMorris9Game';

  constructor () {
    super(2, false, false, 5)
  }
}
