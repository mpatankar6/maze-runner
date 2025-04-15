import { SearchResult } from "./search";

export class GridAnimator {
  private readonly context: CanvasRenderingContext2D;
  private readonly timeoutIds: number[] = [];

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("No 2D context found on canvas.");
    this.context = context;
  }

  public animateSearch(
    searchResult: SearchResult,
    runWhenFinished: () => void
  ) {
    this.cancelCurrentAnimation();
    const visitedCells = searchResult.allVisitedCells;
    for (let index = 1; index < visitedCells.length - 1; index++) {
      const timeoutId = setTimeout(() => {
        visitedCells[index].draw(this.context, "rgb(153, 183, 237)");
        // Run the callback as part of the last animation step
        if (index === visitedCells.length - 2) runWhenFinished();
      }, index * 5);

      this.timeoutIds.push(timeoutId);
    }
  }

  public cancelCurrentAnimation() {
    this.timeoutIds.forEach(clearTimeout);
    this.timeoutIds.length = 0;
  }
}
