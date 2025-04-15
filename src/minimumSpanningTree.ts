import { Edge } from "./edge";
import { UnionFind } from "./unionFind";

/**
 * Computes the minimum spanning tree of a graph using Kruskal's algorithm.
 * @param edges - The array of edges that define the graph.
 * @param numCells - The total number of cells in the graph.
 * @returns An array of edges representing the minimum spanning tree.
 */
export function minimumSpanningTree(edges: Edge[], numCells: number) {
  const mstEdges: Edge[] = [];
  // Descending order so Array.pop() returns the smallest edge
  const worklist = edges.sort((a, b) => b.weight - a.weight);
  const unionFind = new UnionFind();

  while (mstEdges.length < numCells - 1 && worklist.length > 0) {
    const edge = worklist.pop()!;
    if (unionFind.union(edge.from, edge.to)) {
      mstEdges.push(edge);
    }
  }

  return mstEdges;
}
