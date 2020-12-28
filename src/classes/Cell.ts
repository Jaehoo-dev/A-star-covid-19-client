import { calculateRowIndex, calculateColumnIndex } from '../utils/calculateIndex';

export default class Cell {
  index: number;
  rowIndex: number;
  columnIndex: number;
  gCost: number;
  hCost: number;
  fCost: number;
  isDangerous: boolean;
  cameFrom: Cell | null;

  constructor(
    index: number,
    numberOfColumns: number,
  ) {
    this.index = index;
    this.rowIndex = calculateRowIndex(index, numberOfColumns);
    this.columnIndex = calculateColumnIndex(index, numberOfColumns);
    this.gCost = Infinity;
    this.hCost = Infinity;
    this.fCost = Infinity;
    this.isDangerous = false;
    this.cameFrom = null;
  }
}
