import { AnyTile, IGrid, Rectangular8Tile, RectangularGrid, RectangularTile, Shape, link, toMap } from '@gridy/core';
import { IGame } from '../../IGame';
import { Theme } from '../../Theme';
import { other } from '../../utils';

function unlink(tile: any, remove = false) {
  for (const k of tile.links.keys()) {
    if (tile.links.has(-k) && !remove) {
      const source = tile.links.get(-k);
      const target = tile.links.get(k);
      target.links.set(-k, source);
      source.links.set(k, target);
    } else {
      tile.links.get(k).links.delete(-k);
    }
  }
}

export class MorrisGameBase implements IGame {
  public static theme = Theme.Mills;
  public static move: boolean = true;

  public moves: any[] = [];
  public player: number = 1;
  public score?: { [player: number]: number };
  // public scale: number = 0.33;
  public winner: number = 0;

  public hull: boolean = true;

  private grid: IGrid<AnyTile>;
  private men: number;
  private tileMap: Map<string, AnyTile>;

  constructor(squares: number = 3, center: boolean = false, diagonals: boolean = false, men: number = 9) {
    const base = squares * 2 + 1;
    const mid = squares;
    const valid = [0, mid, base - 1];
    this.grid = <any>new RectangularGrid(1, undefined, Shape.Even, base, base, diagonals
      ? Rectangular8Tile : RectangularTile);

    this.men = men;
    this.tileMap = toMap(this.grid.tiles);
    link(this.tileMap);

    this.grid.tiles = (<any>this.grid.tiles).filter((t: any) => {
      let v;
      let r;
      const x = Math.abs(t.x - mid);
      const y = Math.abs(t.y - mid);

      if (x === 0 && y === 0) {
        v = center;
        r = !center;
      } else {
        v = (x === y) || (center ? (((x === 0) || (y === 0))) : ((x === 0) ? !(y === 0) : (y === 0)));
      }

      if (!v) {
        unlink(t, r);
      } else if (x !== y) {
        for (const k of t.links.keys()) {
          if (Math.abs(k) > 2) {
            t.links.get(k).links.delete(-k);
            t.links.delete(k);
          }
        }
      }

      return v;
    });
  }

  public rulers() {
    const m = new Map();

    for (const t of this.grid.tiles) {
      for (const l of (<any>t).links) {
        const keys = [t.key, l[1].key];
        keys.sort();
        m.set(keys.toString(), [t, l[1]]);
      }
    }

    return Array.from(m.values());
  }

  public dots() {
    return this.grid.tiles;
  }

  public possible(): any[] {
    if (this.moves.length < (this.men * 2)) {
      return this.grid.tiles.filter((t: any) => !t.data);
    }

    return this.grid.tiles
      .filter((t: any) => t.data === this.player)
      .reduce((r: any[], t: any) => {
        for (const [n, m] of t.links) {
          if (!m.data) {
            r.push([t, m]);
          }
        }

        return r;
      }, []);
  }

  public move(m: any): void {
    if (!Array.isArray(m)) {
      m.data = this.player;
    } else {
      m[1].data = m[0].data;
      m[0].data = null;
    }

    this.player = other(this.player);
    this.moves.push(m);
  }

  public undo(): void {
    throw new Error('Method not implemented.');
  }
  public evaluate(): number {
    throw new Error('Method not implemented.');
  }
}
