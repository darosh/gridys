import { MorrisGameBase } from './base/MorrisGameBase';

export class MensMorris11Game extends MorrisGameBase {
  public static title = 'Eleven Men\'s Morris';
  public static group = 'Mills';
  public static original = 'MensMorris9Game';

  constructor() {
    super(3, false, true, 11);
  }
}
