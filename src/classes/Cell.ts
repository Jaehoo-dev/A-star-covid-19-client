import { calculateRowIndex, calculateColumnIndex } from '../utils/calculateIndex';

export default class Cell {
  index: number;
  rowIndex: number;
  columnIndex: number;
  gCost: number;
  hCost: number;
  state: 'unvisited' | 'open' | 'closed' | 'path' | 'startingPoint' | 'destination' | 'danger';

  constructor(
    index: number,
    numberOfRows: number,
    numberOfColumns: number,
  ) {
    this.index = index;
    this.rowIndex = calculateRowIndex(index, numberOfColumns);
    this.columnIndex = calculateColumnIndex(index, numberOfColumns);
    this.gCost = Infinity;
    this.hCost = Infinity;
    this.state = 'unvisited';
  }
}
