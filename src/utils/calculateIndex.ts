export function calculateRowIndex(index: number, numberOfColumns: number): number {
  return Math.floor(index / numberOfColumns);
}

export function calculateColumnIndex(index: number, numberOfColumns: number): number {
  return index % numberOfColumns;
}

export function calculateCellIndex(
  coordinates: number[],
  numberOfColumns: number,
): number {
  return coordinates[0] * numberOfColumns + coordinates[1];
}
