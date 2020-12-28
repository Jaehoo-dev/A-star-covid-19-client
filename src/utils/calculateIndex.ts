export function calculateRowIndex(index: number, numberOfColumns: number) {
  return Math.floor(index / numberOfColumns);
}

export function calculateColumnIndex(index: number, numberOfColumns: number) {
  return index % numberOfColumns;
}
