export class ColorInterpolator {
  private readonly min;
  private readonly max;

  constructor(min: number, max: number) {
    if (min === max) {
      throw new Error("Min and max cannot be the same");
    }
    this.min = min;
    this.max = max;
  }

  public interpolateRedToPurple(value: number): string {
    const clamped = Math.max(this.min, Math.min(this.max, value));
    const t = (clamped - this.min) / (this.max - this.min);
    const r = Math.round(255 + t * (128 - 255));
    const g = 0;
    const b = Math.round(0 + t * (128 - 0));

    return `rgb(${r}, ${g}, ${b})`;
  }
}
