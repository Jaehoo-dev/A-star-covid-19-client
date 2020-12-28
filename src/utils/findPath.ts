import Map from '../classes/Map';
import calculateManhattanDistance from './calculateManhattanDistance';

export default function findPath(
  numberOfRows: number,
  numberOfColumns: number,
  startingPointIndex: number,
  destinationIndex: number,
  dangerZone: number[],
  setOpenIndices: React.Dispatch<React.SetStateAction<number[]>>,
  setClosedIndices: React.Dispatch<React.SetStateAction<number[]>>,
  setPathIndices: React.Dispatch<React.SetStateAction<number[]>>,
  isShowingDangerZone: boolean,
) {
  const map = new Map(numberOfRows, numberOfColumns);
  const startingPoint = map.getCell(startingPointIndex);
  const destination = map.getCell(destinationIndex);

  startingPoint.gCost = 0;
  startingPoint.hCost = calculateManhattanDistance(startingPoint, destination);
  startingPoint.state = 'startingPoint';

  destination.state = 'destination';

  for (let i = 0; i < dangerZone.length; i++) {
    map.getCell(dangerZone[i]).state = 'danger';
  }

  const openCells = [startingPoint];
  const closedCells = [];
}
