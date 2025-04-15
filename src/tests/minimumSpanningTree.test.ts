import { expect, describe, it } from "vitest";
import { minimumSpanningTree } from "../minimumSpanningTree";
import { Cell, Edge } from "../cell";

describe("minimumSpanningTree", () => {
  it("should handle an empty input", () => {
    const mst = minimumSpanningTree([], 0);
    expect(mst).toEqual([]);
  });

  it("should remove heavier direction given a bidirectional edge", () => {
    const cellA = new Cell(0, 0);
    const cellB = new Cell(0, 1);

    const edges: Edge[] = [
      { from: cellA, to: cellB, weight: 1 },
      { from: cellB, to: cellA, weight: 3 },
    ];
    const mst = minimumSpanningTree(edges, 2);
    expect(mst).toHaveLength(1);
    expect(mst[0]).toBe(edges[0]);
  });

  it("should remove the cycle given a triangle graph", () => {
    const cellA = new Cell(0, 0);
    const cellB = new Cell(0, 1);
    const cellC = new Cell(1, 0);

    const edges: Edge[] = [
      { from: cellA, to: cellB, weight: 1 },
      { from: cellB, to: cellC, weight: 3 },
      { from: cellA, to: cellC, weight: 2 },
    ];

    const mst = minimumSpanningTree(edges, 3);
    const totalWeight = mst.reduce((sum, edge) => sum + edge.weight, 0);
    expect(totalWeight).toBe(3);
    expect(mst).toHaveLength(2);
  });

  it("should utilize the diagonal in a square graph", () => {
    const cellA = new Cell(0, 0);
    const cellB = new Cell(0, 1);
    const cellC = new Cell(1, 0);
    const cellD = new Cell(1, 1);

    const edges: Edge[] = [
      { from: cellA, to: cellB, weight: 1 },
      { from: cellB, to: cellD, weight: 2 },
      { from: cellC, to: cellD, weight: 4 },
      { from: cellA, to: cellC, weight: 1 },
      { from: cellA, to: cellD, weight: 0.5 },
    ];
    const mst = minimumSpanningTree(edges, 4);
    const totalWeight = mst.reduce((sum, edge) => sum + edge.weight, 0);
    // The best solution uses the diagonal, then the two lowest remaining edges.
    expect(mst).toHaveLength(3);
    expect(totalWeight).toBe(1 + 1 + 0.5);
  });

  it("should reorder edges to be of ascending weights", () => {
    const cellA = new Cell(0, 0);
    const cellB = new Cell(0, 1);
    const cellC = new Cell(1, 0);
    const cellD = new Cell(1, 1);

    const edges: Edge[] = [
      { from: cellA, to: cellB, weight: 0.99 },
      { from: cellB, to: cellD, weight: 0.1 },
      { from: cellA, to: cellC, weight: 0.02 },
    ];

    const mst = minimumSpanningTree(edges, 4);
    const weights = mst.map((edge) => edge.weight);
    expect(weights).toEqual([
      edges[2].weight,
      edges[1].weight,
      edges[0].weight,
    ]);
  });
});
