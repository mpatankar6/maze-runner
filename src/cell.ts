export class Cell {
  private readonly row: number;
  private readonly col: number;
  private readonly widthPixels: number;
  private readonly heightPixels: number;
  private readonly accessibleNeighbors: Cell[] = [];

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

  private fill(context: CanvasRenderingContext2D, color: string) {
    context.fillStyle = color;
    const x = this.col * this.widthPixels;
    const y = this.row * this.heightPixels;
    context.fillRect(x, y, this.widthPixels, this.heightPixels);
  }

  private drawWalls(context: CanvasRenderingContext2D) {
    context.fillStyle = "rgb(102, 102, 102)";
    const x = this.col * this.widthPixels;
    const y = this.row * this.heightPixels;
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
      context.fillRect(x, y, this.widthPixels, 1);
    }
    if (drawBottomWall) {
      context.fillRect(x, y + this.heightPixels - 1, this.widthPixels, 1);
    }
    if (drawLeftWall) {
      context.fillRect(x, y, 1, this.heightPixels);
    }
    if (drawRightWall) {
      context.fillRect(x + this.widthPixels - 1, y, 1, this.heightPixels);
    }
  }

  public draw(context: CanvasRenderingContext2D, fillColor?: string) {
    this.fill(context, fillColor ?? "rgb(192, 192, 192)");
    this.drawWalls(context);
  }

  public addNeighbor(to: Cell) {
    this.accessibleNeighbors.push(to);
  }

  /**
   * Retrieves the accessible neighbors of the current node.
   * @returns The list of neighboring nodes.
   */
  public neighbors(): Cell[] {
    return this.accessibleNeighbors;
  }

  public hasConnectionWithCoordinates(x: number, y: number) {
    return this.accessibleNeighbors.some(
      (neighbor) => neighbor.row === y && neighbor.col === x
    );
  }
}
