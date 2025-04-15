import { describe, expect, it } from "vitest";
import { ColorInterpolator } from "../colorInterpolator";

describe("ColorInterpolator", () => {
  describe("interpolateRedToPurple", () => {
    const colorInterpolator = new ColorInterpolator(0, 100);

    it("should throw if the min and max values are the same", () => {
      expect(() => new ColorInterpolator(0, 0)).toThrow(
        "Min and max cannot be the same"
      );
    });

    it("should correctly interpolate a min value", () => {
      expect(colorInterpolator.interpolateRedToPurple(0)).toBe(
        "rgb(255, 0, 0)"
      );
    });

    it("should correctly interpolate a median value", () => {
      expect(colorInterpolator.interpolateRedToPurple(50)).toBe(
        "rgb(192, 0, 64)"
      );
    });

    it("should correctly interpolate a max value", () => {
      expect(colorInterpolator.interpolateRedToPurple(100)).toBe(
        "rgb(128, 0, 128)"
      );
    });
  });
});
