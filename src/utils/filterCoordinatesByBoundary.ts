export default function filterCoordinatesByBoundary(
  coordinatesArray: number[][],
  numberOfRows: number,
  numberOfColumns: number,
): number[][] {
  return coordinatesArray.filter(coordinates => (
    coordinates[0] > -1
    && coordinates[0] < numberOfRows
    && coordinates[1] > -1
    && coordinates[1] < numberOfColumns
  ));
}
