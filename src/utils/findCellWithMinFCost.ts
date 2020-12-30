import Cell from '../classes/Cell';

export default function findCellWithMinFCost(cells: Cell[]): Cell {
  let cellWithMinFCost = cells[0];

  for (let i = 1; i < cells.length; i++) {
    const currentCell = cells[i];

    if (currentCell.fCost < cellWithMinFCost.fCost) {
      cellWithMinFCost = currentCell;
    }
  }

  return cellWithMinFCost;
}
