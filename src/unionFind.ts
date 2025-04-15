import { Cell } from "./cell";

export class UnionFind {
  private readonly cellToParent: Map<Cell, Cell> = new Map();

  private initializeIfNecessary(cell: Cell) {
    if (!this.cellToParent.has(cell)) {
      this.cellToParent.set(cell, cell);
    }
  }

  private find(cell: Cell): Cell {
    this.initializeIfNecessary(cell);
    const parent = this.cellToParent.get(cell)!;
    if (parent === cell) {
      return cell;
    }
    const root = this.find(parent);
    // For each node from here to the root, set it's representative to its root
    // for path compression.
    this.cellToParent.set(cell, root);
    return root;
  }

  // Returns true if the union operation merged the two trees, false otherwise
  public union(fromCell: Cell, toCell: Cell) {
    const fromCellRepresentative = this.find(fromCell);
    const toCellRepresentative = this.find(toCell);
    if (fromCellRepresentative === toCellRepresentative) return false;
    this.cellToParent.set(toCellRepresentative, fromCellRepresentative);
    return true;
  }
}
