import Cell from './Cell';

export default class Map {
  cells: Cell[];

  constructor(
    numberOfRows: number,
    numberOfColumns: number,
  ) {
    this.cells = Array.from({
      length: numberOfRows * numberOfColumns,
    }, (x, i) => (new Cell(i, numberOfRows, numberOfColumns)));
  }

  getCell(index: number) {
    return this.cells[index];
  }
}
