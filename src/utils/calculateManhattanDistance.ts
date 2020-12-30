import Cell from '../classes/Cell';

export default function calculateManhattanDistance(
  baseCell: Cell,
  destinationCell: Cell,
): number {
  const horizontalDistance = Math.abs(baseCell.columnIndex - destinationCell.columnIndex);
  const verticalDistance = Math.abs(baseCell.rowIndex - destinationCell.rowIndex);

  return horizontalDistance + verticalDistance;
}
