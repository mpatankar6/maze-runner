import { Cell, Edge } from "./graph";
import { minimumSpanningTree } from "./minimumSpanningTree";

export class Grid {
  readonly cells: Cell[][] = [];
  readonly edges: Edge[];
  readonly canvas: HTMLCanvasElement;
  wallsOverlay: HTMLCanvasElement | null = null;

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

  public drawCellsToCanvas() {
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("No 2D context found on canvas.");
    this.cells.forEach((row) => row.forEach((cell) => cell.draw(context)));
    this.cells.forEach((row) => row.forEach((cell) => cell.drawWalls(context)));
    if (!this.wallsOverlay) {
      this.cacheWallImage();
    }
    context.drawImage(this.wallsOverlay!, 0, 0);
  }

  public cacheWallImage() {
    const cacheCanvas = document.createElement("canvas");
    const context = cacheCanvas.getContext("2d")!;
    cacheCanvas.width = this.canvas.width;
    cacheCanvas.height = this.canvas.height;
    context.clearRect(0, 0, cacheCanvas.width, cacheCanvas.height);
    this.cells.forEach((row) => row.forEach((cell) => cell.drawWalls(context)));
    this.wallsOverlay = cacheCanvas;
  }
}
