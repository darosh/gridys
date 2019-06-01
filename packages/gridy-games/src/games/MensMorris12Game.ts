import { MorrisGameBase } from './base/MorrisGameBase'

export class MensMorris12Game extends MorrisGameBase {
  public static title = 'Twelve Men\'s Morris';
  public static group = 'Mills';
  public static aliases = ['Larger Merels', 'Morabaraba'];
  public static original = 'MensMorris9Game';

  constructor () {
    super(3, false, true, 12)
  }
}
