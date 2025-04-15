import { GridAnimator } from "./gridAnimator";
import { Game } from "./game";
import { Grid } from "./grid";
import { breadthFirstSearch, depthFirstSearch } from "./search";
import "./styles/style.css";

const canvasElement = document.getElementById(
  "maze-window"
) as HTMLCanvasElement | null;
if (!canvasElement) throw new Error("No #maze-window canvas element found.");

const rows = 10;
const cols = 10;

let grid = new Grid(rows, cols, canvasElement);
grid.drawCellsToCanvas();
const game = new Game(grid);

const animationController = new GridAnimator(canvasElement);

document.addEventListener("keydown", (event) => {
  console.log(event.key);

  switch (event.key) {
    case "s":
      break;
    case "r":
      animationController.cancelCurrentAnimation();
      grid = new Grid(rows, cols, canvasElement as HTMLCanvasElement);
      grid.drawCellsToCanvas();
      break;
    case "w":
      game.movePlayer(0, -1);
      break;
    case "a":
      game.movePlayer(-1, 0);
      break;
    case "s":
      game.movePlayer(0, 1);
      break;
    case "ArrowRight":
      game.movePlayer(1, 0);
      break;
    case "b":
      grid.drawCellsToCanvas();
      animationController.animateSearch(
        grid.searchGrid(breadthFirstSearch),
        () => grid.showSolution()
      );
      break;
    case "d":
      grid.drawCellsToCanvas();
      animationController.animateSearch(grid.searchGrid(depthFirstSearch), () =>
        grid.showSolution()
      );
      break;
    default:
      break;
  }
});
