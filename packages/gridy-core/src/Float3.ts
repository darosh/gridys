import { Float } from './Float';
import { Integer } from './Integer';
import { Integer3 } from './Integer3';
import { IVector } from './IVector';

export class Float3 implements IVector<Float> {
  public x: Float;
  public y: Float;
  public z: Float;

  constructor(x: Float, y: Float, z: Float) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public static ROUND(h: Float3): Integer3 {
    let rx: Integer = Math.round(h.x);
    let ry: Integer = Math.round(h.y);
    let rz: Integer = Math.round(h.z);

    const xDiff: Float = Math.abs(rx - h.x);
    const yDiff: Float = Math.abs(ry - h.y);
    const zDiff: Float = Math.abs(rz - h.z);

    if (xDiff > yDiff && xDiff > zDiff) {
      rx = -ry - rz;
    } else if (yDiff > zDiff) {
      ry = -rx - rz;
    } else {
      rz = -rx - ry;
    }

    return new Integer3(rx, ry, rz);
  }

  public static LERP(a: Integer3, b: Integer3, t: Float): Float3 {
    return new Float3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
  }

  public static LINE(a: Integer3, b: Integer3): Integer3[] {
    const N: Integer = a.distance(b);
    const results: Integer3[] = [];

    for (let i: Integer = 0; i < (N + 1); i++) {
      results.push(Float3.ROUND(Float3.LERP(a, b, 1 / Math.max(1, N) * i)));
    }

    return results;
  }

  public equals(other: Float3): boolean {
    return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
  }

  public get value(): Float[] {
    return [this.x, this.y, this.z];
  }

  public toString(): string {
    return this.value.toString();
  }

  public round(): Integer3 {
    return Float3.ROUND(this);
  }
}
