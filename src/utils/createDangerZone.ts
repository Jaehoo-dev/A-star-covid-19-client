export default function createDangerZone(
  centerIndex: number,
  numberOfRows: number,
  numberOfColumns: number,
) {
  let dangerZone = [];
  const centerRow = Math.floor(centerIndex / numberOfColumns);
  const centerColumn = centerIndex % numberOfColumns;

  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      dangerZone.push([centerRow + i, centerColumn + j]);
    }
  }

  dangerZone = dangerZone.filter(coordinate => (
    coordinate[0] > -1
    && coordinate[0] < numberOfRows
    && coordinate[1] > -1
    && coordinate[1] < numberOfColumns
  ));

  return dangerZone.map(coordinate => coordinate[0] * numberOfColumns + coordinate[1]);
}
