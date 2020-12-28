import Cell from '../classes/Cell';
import Map from '../classes/Map';
import { calculateCellIndex } from './calculateIndex';
import filterCoordinatesByBoundary from './filterCoordinatesByBoundary';

export default function findNeighborsByCellIndex(
  cell: Cell,
  numberOfRows: number,
  numberOfColumns: number,
) {
  let neighborsByCoordinates = [
    [cell.rowIndex - 1, cell.columnIndex],
    [cell.rowIndex, cell.columnIndex + 1],
    [cell.rowIndex + 1, cell.columnIndex],
    [cell.rowIndex, cell.columnIndex - 1],
  ];

  neighborsByCoordinates = filterCoordinatesByBoundary(neighborsByCoordinates, numberOfRows, numberOfColumns);

  return neighborsByCoordinates.map(coordinates => calculateCellIndex(coordinates, numberOfColumns));
}
