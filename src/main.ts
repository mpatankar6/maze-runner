import { Grid } from "./grid";
import "./styles/style.css";

const canvasElement = document.getElementById("maze-window");
if (!canvasElement) throw new Error("No #maze-window canvas element found.");

const rows = 10;
const cols = 10;

const grid = new Grid(rows, cols, canvasElement as HTMLCanvasElement);
grid.drawCellsToCanvas();
grid.drawPathToEnd();
