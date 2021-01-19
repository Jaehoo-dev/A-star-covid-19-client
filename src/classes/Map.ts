import Cell from './Cell';

export default class Map {
  cells: Cell[];

  constructor(
    readonly numberOfRows: number,
    readonly numberOfColumns: number,
  ) {
    this.cells = Array.from({
      length: numberOfRows * numberOfColumns,
    }, (_, i) => (new Cell(i, numberOfColumns)));
  }

  getCell(index: number) {
    return this.cells[index];
  }
}
