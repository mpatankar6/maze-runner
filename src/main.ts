import { GridAnimator } from "./gridAnimator";
import { Grid } from "./grid";
import { breadthFirstSearch, depthFirstSearch } from "./search";
import "./styles/style.css";

const canvasElement = document.getElementById(
  "maze-window"
) as HTMLCanvasElement | null;
if (!canvasElement) throw new Error("Canvas element not found.");

const heightInput = document.getElementById(
  "maze-height-field"
) as HTMLInputElement;
if (!heightInput) throw new Error("Height field not found.");

const widthInput = document.getElementById(
  "maze-width-field"
) as HTMLInputElement;
if (!widthInput) throw new Error("Width field not found.");

[heightInput, widthInput].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    const key = (event as KeyboardEvent).key;
    if (!/^[0-9]$/.test(key) && key !== "Backspace" && key !== "Tab") {
      event.preventDefault();
    }
  });

  input.addEventListener("blur", (event: Event) => {
    const minDimensionSizeCells = 2;
    const maxDimensionSizeCells = 200;
    const target = event.currentTarget as HTMLInputElement;
    // Clamps value between min and max sizes.
    target.value = Math.min(
      Math.max(Number(target.value), minDimensionSizeCells),
      maxDimensionSizeCells
    ).toString();
  });
});

const mazeHeight = () => Number(heightInput.value);
const mazeWidth = () => Number(widthInput.value);

let grid = new Grid(mazeHeight(), mazeWidth(), canvasElement);
grid.drawCellsToCanvas();

let mazeCompleted = false;

const gridAnimator = new GridAnimator(canvasElement);

function finalizeMaze() {
  grid.showSolution();
  mazeCompleted = true;
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (!mazeCompleted && gridAnimator.isInactive())
        grid.movePlayerIfPossible(0, -1);
      break;
    case "ArrowLeft":
      if (!mazeCompleted && gridAnimator.isInactive())
        grid.movePlayerIfPossible(-1, 0);
      break;
    case "ArrowDown":
      if (!mazeCompleted && gridAnimator.isInactive())
        grid.movePlayerIfPossible(0, 1);
      break;
    case "ArrowRight":
      if (!mazeCompleted && gridAnimator.isInactive())
        grid.movePlayerIfPossible(1, 0);
      break;
    default:
      break;
  }
  if (grid.playerWon()) {
    finalizeMaze();
  }
});

const resetButton = document.getElementById("reset-button");
if (!resetButton) throw new Error("Reset button not found.");
resetButton.addEventListener("click", () => {
  mazeCompleted = false;
  gridAnimator.cancelCurrentAnimation();
  grid = new Grid(
    mazeHeight(),
    mazeWidth(),
    canvasElement as HTMLCanvasElement
  );
  grid.drawCellsToCanvas();
});

const bfsButton = document.getElementById("bfs-button");
if (!bfsButton) throw new Error("BFS button not found.");
bfsButton.addEventListener("click", () => {
  grid.drawCellsToCanvas();
  gridAnimator.animateSearch(grid.searchGrid(breadthFirstSearch), finalizeMaze);
});

const dfsButton = document.getElementById("dfs-button");
if (!dfsButton) throw new Error("DFS button not found.");
dfsButton.addEventListener("click", () => {
  grid.drawCellsToCanvas();
  gridAnimator.animateSearch(grid.searchGrid(depthFirstSearch), finalizeMaze);
});

const heatmapRelativeToStartButton = document.getElementById(
  "heatmap-relative-to-start-button"
);
if (!heatmapRelativeToStartButton)
  throw new Error("Heatmap relative to start button not found.");
heatmapRelativeToStartButton.addEventListener("click", () => {
  if (gridAnimator.isInactive())
    grid.colorCellsByDistanceRelativeToStartingCell();
});

const heatmapRelativeToEndButton = document.getElementById(
  "heatmap-relative-to-end-button"
);
if (!heatmapRelativeToEndButton)
  throw new Error("Heatmap relative to end button not found.");
heatmapRelativeToEndButton.addEventListener("click", () => {
  if (gridAnimator.isInactive())
    grid.colorCellsByDistanceRelativeToEndingCell();
});

const clearHeatmapButton = document.getElementById("clear-heatmap-button");
if (!clearHeatmapButton) throw new Error("Clear heatmap button not found.");
clearHeatmapButton.addEventListener("click", () => {
  if (gridAnimator.isInactive()) grid.drawCellsToCanvas();
});
