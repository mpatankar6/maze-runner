import { Grid } from "./grid";
import "./style.css";

const canvasElement = document.getElementById("maze-window");
if (!canvasElement) throw new Error("No #maze-window canvas element found.");

const rows = 30;
const cols = 30;

const grid = new Grid(rows, cols, canvasElement as HTMLCanvasElement);
grid.drawCellsToCanvas();
