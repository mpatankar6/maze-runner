import { Cell } from "./cell";
import { ColorInterpolator } from "./colorInterpolator";
import { Edge } from "./edge";
import { minimumSpanningTree } from "./minimumSpanningTree";
import { depthFirstSearch, SearchResult } from "./search";

export class Grid {
  private readonly cells: Cell[][] = [];
  private readonly edges: Edge[];
  private readonly canvas: HTMLCanvasElement;
  private playerPosition = { x: 0, y: 0 };

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

  private get context() {
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("No 2D context found on canvas.");
    return context;
  }

  private get startingCell() {
    return this.cells[0][0];
  }

  private get endingCell() {
    return this.cells[this.cells.length - 1][this.cells[0].length - 1];
  }

  private get playerCell() {
    return this.cells[this.playerPosition.y][this.playerPosition.x];
  }

  public drawCellsToCanvas() {
    this.cells.flat().forEach((cell) => cell.draw(this.context));
    this.playerCell.draw(this.context, "rgb(50, 205, 50)");
    this.startingCell.draw(this.context, "rgb(63, 126, 76)");
    this.endingCell.draw(this.context, "rgb(99, 37, 124)");
  }

  public showSolution() {
    const path = depthFirstSearch(this.startingCell, this.endingCell).path;
    if (!path) throw new Error("Maze cannot be solved");
    path.forEach((cell) => cell.draw(this.context, "rgb(75, 116, 198)"));
  }

  public searchGrid(searchFunction: (from: Cell, to: Cell) => SearchResult) {
    return searchFunction(this.startingCell, this.endingCell);
  }

  public movePlayerIfPossible(dx: number, dy: number) {
    const newPosition = {
      x: this.playerPosition.x + dx,
      y: this.playerPosition.y + dy,
    };
    if (
      this.playerCell.hasConnectionWithCoordinates(newPosition.x, newPosition.y)
    ) {
      this.playerPosition.x = newPosition.x;
      this.playerPosition.y = newPosition.y;
      this.drawCellsToCanvas();
      // if (this.playerCell !== this.startingCell)
      //   this.playerCell.draw(this.context, "rgb(50, 205, 50)");
    }
  }

  public playerWon() {
    return this.playerCell === this.endingCell;
  }

  private generateDistanceMap(relativeTo: Cell) {
    const distanceMap = new Map<Cell, number>();
    const visited = new Set<Cell>();
    const queue: Cell[] = [relativeTo];
    distanceMap.set(relativeTo, 0);
    visited.add(relativeTo);

    while (queue.length > 0) {
      const currentCell = queue.pop()!;
      const currentDistance = distanceMap.get(currentCell)!;
      currentCell
        .neighbors()
        .filter((neighbor) => !visited.has(neighbor))
        .forEach((neighbor) => {
          distanceMap.set(neighbor, currentDistance + 1);
          visited.add(neighbor);
          queue.push(neighbor);
        });
    }
    return distanceMap;
  }

  private colorCellsByDistance(relativeTo: Cell) {
    const map = this.generateDistanceMap(relativeTo);
    const values = Array.from(map.values());
    const colorInterpolator = new ColorInterpolator(
      Math.min(...values),
      Math.max(...values)
    );
    map.forEach((value, key) => {
      if (key !== this.startingCell && key !== this.endingCell)
        key.draw(this.context, colorInterpolator.interpolateRedToPurple(value));
    });
  }

  public colorCellsByDistanceRelativeToStartingCell() {
    this.colorCellsByDistance(this.startingCell);
  }

  public colorCellsByDistanceRelativeToEndingCell() {
    this.colorCellsByDistance(this.endingCell);
  }
}
