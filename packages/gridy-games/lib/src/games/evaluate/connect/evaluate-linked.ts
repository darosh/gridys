import { AnyTile, Directions, TileMap, toMap } from "gridy";

export function evaluateLinked(tiles: AnyTile[], min: number, player: number): number {
  let c: number = 0;

  for (const t of tiles as any) {
    // const v = (t as any).data;

    const s = [];

    for (const u of t.links) {
      if (u[0] > 0) {
        const to: any = u[1];

        const from: any = t.links.get(t.opposite ? t.opposite(u[0]) : -u[0]);

        if ((!from || from.data !== player) && (to.data === player)) {
          s.push(u[0]);
        }
      }
    }
    // const s = Array.from(t.links.keys())
    //   .filter((k: any) => {
    //     if (k < 0) {
    //       return;
    //     }

    //     const to: any = t.links.get(k);
    //     const from: any = t.links.get(t.opposite ? t.opposite(k) : -k);

    //     return to && (to.data === player) && (!from || from.data !== player);
    //   });

    if (!s.length) {
      let mp = 0;
      for (const d of t.links.values()) {
        if (!d.data) {
          mp++;
        }
      }

      // c = Math.max(c, mp / 8);
      c += mp / 8;
      continue;
    }

    for (const k of s) {
      const l = [];
      let i: any | undefined = t;

      while (i) {
        l.push(i);
        i = (i as any).links.get(k);

        if (!i || ((i as any).data !== player)) {
          break;
        }
      }

      let f = 0;

      i = l[0].links.get(-k);

      if (i && !i.data) {
        f++;
      }

      i = l[l.length - 1].links.get(k);

      if (i && !i.data) {
        f++;
      }

      if (!f && (l.length < min)) {
        continue;
      }

      c += Math.pow(min, l.length + 1 + (l.length >= min ? 1 : 0)) - Math.pow(min, l.length) * (2 - f);
      // c = Math.max(Math.pow(min, l.length + 1 + (l.length >= min ? 1 : 0)) - Math.pow(min, l.length) * (2 - f));
    }
  }

  return c;
}