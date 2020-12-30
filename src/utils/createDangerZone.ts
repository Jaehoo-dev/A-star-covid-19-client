import { calculateRowIndex, calculateColumnIndex, calculateCellIndex } from './calculateIndex';
import filterCoordinatesByBoundary from './filterCoordinatesByBoundary';

export default function createDangerZone(
  centerIndex: number,
  numberOfRows: number,
  numberOfColumns: number,
): number[] {
  let dangerZone = [];
  const centerRow = calculateRowIndex(centerIndex, numberOfColumns);
  const centerColumn = calculateColumnIndex(centerIndex, numberOfColumns);

  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      dangerZone.push([centerRow + i, centerColumn + j]);
    }
  }

  dangerZone = filterCoordinatesByBoundary(dangerZone, numberOfRows, numberOfColumns);

  return dangerZone.map(coordinates => calculateCellIndex(coordinates, numberOfColumns));
}
