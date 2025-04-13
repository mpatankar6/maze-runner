const GRAY = "rgb(192, 192, 192)";
const DARK_GRAY = "rgb(102, 102, 102)";

export class Cell {
  private readonly row: number;
  private readonly col: number;
  private readonly widthPixels: number;
  private readonly heightPixels: number;
  readonly accessibleNeighbors: Cell[] = [];

  constructor(
    row: number,
    col: number,
    widthPixels?: number,
    heightPixels?: number
  ) {
    this.row = row;
    this.col = col;
    this.widthPixels = widthPixels ?? 0;
    this.heightPixels = heightPixels ?? 0;
  }

  public drawWalls(context: CanvasRenderingContext2D) {
    context.fillStyle = DARK_GRAY;
    const x = this.col * this.widthPixels - 1;
    const y = this.row * this.heightPixels - 1;
    const lineWeight = 2;
    let drawTopWall = true;
    let drawBottomWall = true;
    let drawLeftWall = true;
    let drawRightWall = true;
    for (const neighbor of this.accessibleNeighbors) {
      if (neighbor.row === this.row - 1) drawTopWall = false;
      else if (neighbor.row === this.row + 1) drawBottomWall = false;
      else if (neighbor.col === this.col - 1) drawLeftWall = false;
      else if (neighbor.col === this.col + 1) drawRightWall = false;
    }
    if (drawTopWall) {
      context.fillRect(x, y, this.widthPixels + lineWeight, lineWeight);
    }
    if (drawBottomWall) {
      context.fillRect(x, y + this.heightPixels, this.widthPixels, lineWeight);
    }
    if (drawLeftWall) {
      context.fillRect(x, y, lineWeight, this.heightPixels);
    }
    if (drawRightWall) {
      context.fillRect(x + this.widthPixels, y, lineWeight, this.heightPixels);
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    if (this.row === 0 && this.col === 0) context.fillStyle = "rgb(63 126 76)";
    else context.fillStyle = GRAY;
    const x = this.col * this.widthPixels;
    const y = this.row * this.heightPixels;
    context.fillRect(x, y, this.widthPixels, this.heightPixels);
  }

  public fill(context: CanvasRenderingContext2D) {
    console.log("Hello");

    context.fillStyle = "rgb(255 0 0)";
    const x = this.col * this.widthPixels + 1;
    const y = this.row * this.heightPixels + 1;
    context.fillRect(x, y, this.widthPixels - 1, this.heightPixels - 1);
  }

  public addNeighbor(to: Cell) {
    this.accessibleNeighbors.push(to);
  }
}

export type Edge = {
  readonly from: Cell;
  readonly to: Cell;
  readonly weight: number;
};
