import { calculateRowIndex, calculateColumnIndex } from '../utils/calculateIndex';

export default class Cell {
  readonly index: number;
  readonly rowIndex: number;
  readonly columnIndex: number;
  public gCost: number;
  public hCost: number;
  public fCost: number;
  public isDangerous: boolean;
  public cameFrom: Cell | null;

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
