import { describe, it, expect, beforeAll } from "vitest";
import { breadthFirstSearch, depthFirstSearch } from "../search";
import { Cell } from "../graph";

describe("search", () => {
  const a = new Cell(0, 0);
  const b = new Cell(1, 0);
  const c = new Cell(2, 0);
  const d = new Cell(3, 0);

  beforeAll(() => {
    a.addNeighbor(d);
    a.addNeighbor(b);
    b.addNeighbor(c);
    c.addNeighbor(d);
  });

  describe("breadthFirstSearch", () => {
    it("should find the reflexive path", () => {
      const a = new Cell(0, 0);
      expect(breadthFirstSearch(a, a).path).toEqual([a]);
    });

    it("should return an efficient path when the target is near the root", () => {
      const efficientPath = breadthFirstSearch(a, d).path ?? [];
      expect(efficientPath.length).toBeLessThanOrEqual(2);
      expect(efficientPath).toEqual([a, d]);
    });

    it("should return null if no path is found", () => {
      const a = new Cell(0, 0);
      const b = new Cell(1, 0);
      const path = breadthFirstSearch(a, b).path;
      expect(path).toBeNull();
    });
  });

  describe("depthFirstSearch", () => {
    it("should find the reflexive path", () => {
      const a = new Cell(0, 0);
      expect(depthFirstSearch(a, a).path).toEqual([a]);
    });

    it("should return an inefficient path when the target is near the root", () => {
      const inefficientPath = depthFirstSearch(a, d).path ?? [];
      expect(inefficientPath.length).toBeGreaterThan(2);
      expect(inefficientPath).toEqual([a, b, c, d]);
    });

    it("should return an empty array if no path is found", () => {
      const a = new Cell(0, 0);
      const b = new Cell(1, 0);
      const path = breadthFirstSearch(a, b).path;
      expect(path).toBeNull();
    });
  });
});
