import { Cell, Edge } from "./graph";
import { minimumSpanningTree } from "./minimumSpanningTree";
import { breadthFirstSearch, depthFirstSearch } from "./search";

export class Grid {
  private readonly cells: Cell[][] = [];
  private readonly edges: Edge[];
  private readonly canvas: HTMLCanvasElement;

  constructor(rows: number, cols: number, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.populateCells(rows, cols);
    this.edges = this.getMinimumEdges(rows, cols, this.cells);
    this.informCellsOfTheirNeighbors();
    console.log(this.cells);
  }

  private populateCells(rows: number, cols: number) {
    for (let row = 0; row < rows; row++) {
      this.cells[row] = [];
      for (let col = 0; col < cols; col++) {
        this.cells[row][col] = new Cell(
          row,
          col,
          this.canvas.width / cols,
          this.canvas.height / rows
        );
      }
    }
  }

  private getMinimumEdges(rows: number, cols: number, cells: Cell[][]) {
    const allPossibleEdges = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const randomWeight = Math.random();
        if (row < rows - 1)
          allPossibleEdges.push({
            from: cells[row][col],
            to: cells[row + 1][col],
            weight: randomWeight,
          });
        if (col < cols - 1)
          allPossibleEdges.push({
            from: cells[row][col],
            to: cells[row][col + 1],
            weight: randomWeight,
          });
      }
    }
    return minimumSpanningTree(allPossibleEdges, rows * cols);
  }

  private informCellsOfTheirNeighbors() {
    for (const edge of this.edges) {
      edge.from.addNeighbor(edge.to);
      edge.to.addNeighbor(edge.from);
    }
  }

  private get context(): CanvasRenderingContext2D {
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("No 2D context found on canvas.");
    return context;
  }

  public drawCellsToCanvas() {
    this.cells.forEach((row) => row.forEach((cell) => cell.draw(this.context)));
    this.cells.forEach((row) =>
      row.forEach((cell) => cell.drawWalls(this.context))
    );
  }

  public drawPathToEnd() {
    depthFirstSearch(
      this.cells[0][0],
      this.cells[this.cells.length - 1][this.cells[0].length - 1]
    ).forEach((cell) => cell.fill(this.context));
  }
}
