import { GridAnimator } from "./gridAnimator";
import { Grid } from "./grid";
import { breadthFirstSearch, depthFirstSearch } from "./search";
import "./styles/style.css";

const canvasElement = document.getElementById(
  "maze-window"
) as HTMLCanvasElement | null;
if (!canvasElement) throw new Error("No #maze-window canvas element found.");

const rows = 6;
const cols = 6;

let grid = new Grid(rows, cols, canvasElement);
grid.drawCellsToCanvas();

let mazeCompleted = false;

const animationController = new GridAnimator(canvasElement);

function finalizeMaze() {
  grid.showSolution();
  mazeCompleted = true;
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (!mazeCompleted) grid.movePlayerIfPossible(0, -1);
      break;
    case "ArrowLeft":
      if (!mazeCompleted) grid.movePlayerIfPossible(-1, 0);
      break;
    case "ArrowDown":
      if (!mazeCompleted) grid.movePlayerIfPossible(0, 1);
      break;
    case "ArrowRight":
      if (!mazeCompleted) grid.movePlayerIfPossible(1, 0);
      break;
    case "r":
      mazeCompleted = false;
      animationController.cancelCurrentAnimation();
      grid = new Grid(rows, cols, canvasElement as HTMLCanvasElement);
      grid.drawCellsToCanvas();
      break;
    case "b":
      grid.drawCellsToCanvas();
      animationController.animateSearch(
        grid.searchGrid(breadthFirstSearch),
        finalizeMaze
      );
      break;
    case "d":
      grid.drawCellsToCanvas();
      animationController.animateSearch(
        grid.searchGrid(depthFirstSearch),
        finalizeMaze
      );
      break;
    default:
      console.log("Unrecognized keystroke: ", event.key);
      break;
  }
  if (grid.playerWon()) {
    finalizeMaze();
  }
});
