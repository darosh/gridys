import { MorrisGameBase } from './base/MorrisGameBase'

export class MensMorris9Game extends MorrisGameBase {
  public static title = 'Nine Men\'s Morris';
  public static group = 'Mills';
  public static created = -1400;
  public static location = 'Egypt';
  public static aliases = ['Mills', 'Merels'];
  public static wiki = 'https://en.wikipedia.org/wiki/Nine_Men%27s_Morris';

  constructor () {
    super(3)
  }
}
