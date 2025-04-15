import { Cell } from "./cell";

export type Edge = {
  readonly from: Cell;
  readonly to: Cell;
  readonly weight: number;
};
