import { it, expect, describe } from "vitest";
import { UnionFind } from "../unionFind";
import { Cell } from "../graph";

describe("unionFind", () => {
  it("should only perform union once on the same two cells", () => {
    const unionFind = new UnionFind();
    const cellA = new Cell(0, 0);
    const cellB = new Cell(1, 0);

    expect(unionFind.union(cellA, cellB)).toBe(true);
    expect(unionFind.union(cellA, cellB)).toBe(false);
  });

  it("should chain unions correctly", () => {
    const unionFind = new UnionFind();
    const cellA = new Cell(0, 0);
    const cellB = new Cell(0, 1);
    const cellC = new Cell(0, 2);

    expect(unionFind.union(cellA, cellB)).toBe(true);
    expect(unionFind.union(cellB, cellC)).toBe(true);
    // Now A and C should have the same representative.
    expect(unionFind.union(cellA, cellC)).toBe(false);
  });

  it("should not union already connected trees", () => {
    const unionFind = new UnionFind();
    const cellA = new Cell(0, 0);
    const cellB = new Cell(1, 0);
    const cellC = new Cell(2, 0);
    const cellD = new Cell(3, 0);
    const cellE = new Cell(4, 0);
    const cellF = new Cell(5, 0);

    // Tree 1
    expect(unionFind.union(cellA, cellB)).toBe(true);
    expect(unionFind.union(cellB, cellC)).toBe(true);

    // Tree 2
    expect(unionFind.union(cellD, cellE)).toBe(true);
    expect(unionFind.union(cellE, cellF)).toBe(true);

    // Merge trees
    expect(unionFind.union(cellE, cellB)).toBe(true);
    // It should recognize trees are now merged
    expect(unionFind.union(cellB, cellF)).toBe(false);
  });
});
