import { Cell } from "./graph";

export function breadthFirstSearch(from: Cell, to: Cell) {
  return search(from, to, (worklist, cell) => worklist.unshift(cell));
}

export function depthFirstSearch(from: Cell, to: Cell) {
  return search(from, to, (worklist, cell) => worklist.push(cell));
}

function search(
  from: Cell,
  to: Cell,
  addFunction: (worklist: Cell[], cell: Cell) => void
): SearchResult {
  const worklist: Cell[] = [from];
  const alreadySeen: Set<Cell> = new Set<Cell>();
  const cameFrom: Map<Cell, Cell> = new Map();
  const allVisitedCells: Cell[] = [];

  while (worklist.length > 0) {
    const next = worklist.pop()!;
    allVisitedCells.push(next);
    if (next === to) {
      const path = [];
      let lastCell = next;
      while (cameFrom.has(lastCell)) {
        path.push(lastCell);
        lastCell = cameFrom.get(lastCell)!;
      }
      path.push(lastCell);
      return { path: path.reverse(), allVisitedCells };
    } else if (alreadySeen.has(next)) {
      continue;
    } else {
      next.accessibleNeighbors
        .filter((cell) => !alreadySeen.has(cell))
        .forEach((cell) => {
          addFunction(worklist, cell);
          cameFrom.set(cell, next);
        });
      alreadySeen.add(next);
    }
  }
  return { path: null, allVisitedCells };
}

type SearchResult = {
  path: Cell[] | null;
  allVisitedCells: Cell[];
};
