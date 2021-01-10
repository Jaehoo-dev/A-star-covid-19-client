import Map from '../classes/Map';
import Cell from '../classes/Cell';
import calculateManhattanDistance from './calculateManhattanDistance';
import findCellWithMinFCost from './findCellWithMinFCost';
import findNeighborsByCellIndex from './findNeighborsByCellIndex';
import visualizePathFinding from './visualizePathFinding';
import visualizeResultPath from './visualizeResultPath';

export default async function findPath(
  numberOfRows: number,
  numberOfColumns: number,
  startingPointIndex: number,
  destinationIndex: number,
  dangerZone: number[],
  setOpenIndices: React.Dispatch<React.SetStateAction<number[]>>,
  setClosedIndices: React.Dispatch<React.SetStateAction<number[]>>,
  setPathIndices: React.Dispatch<React.SetStateAction<number[]>>,
  setCurrentCellIndex: React.Dispatch<React.SetStateAction<number>>,
  isShowingDangerZone: boolean,
  isVisualizationEnabled: boolean,
  setIsVisualizing: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  const map = new Map(numberOfRows, numberOfColumns);
  const startingPoint = map.getCell(startingPointIndex);
  const destination = map.getCell(destinationIndex);

  startingPoint.gCost = 0;
  startingPoint.hCost = calculateManhattanDistance(startingPoint, destination);
  startingPoint.fCost = startingPoint.gCost + startingPoint.hCost;

  for (let i = 0; i < dangerZone.length; i++) {
    map.getCell(dangerZone[i]).isDangerous = true;
  }

  const openCells = [startingPoint];
  const closedCells: Cell[] = [];
  let currentCell = startingPoint;
  let hasFoundPath = false;

  setIsVisualizing(true);

  while (openCells.length) {
    currentCell = findCellWithMinFCost(openCells);
    openCells.splice(openCells.indexOf(currentCell), 1);
    closedCells.push(currentCell);

    if (isVisualizationEnabled) {
      await visualizePathFinding(
        openCells,
        closedCells,
        currentCell,
        setOpenIndices,
        setClosedIndices,
        setCurrentCellIndex,
      );
    }

    if (currentCell.index === destinationIndex) {
      hasFoundPath = true;
      break;
    }

    const neighbors
      = findNeighborsByCellIndex(currentCell, numberOfRows, numberOfColumns)
        .map(cellIndex => map.getCell(cellIndex));

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (
        (isShowingDangerZone && neighbor.isDangerous)
        || closedCells.includes(neighbor)
      ) {
        continue;
      }

      if (currentCell.gCost + 1 < neighbor.gCost) {
        neighbor.gCost = currentCell.gCost + 1;
        neighbor.hCost = calculateManhattanDistance(neighbor, destination);
        neighbor.fCost = neighbor.gCost + neighbor.hCost;
        neighbor.cameFrom = currentCell;
      }

      if (!openCells.includes(neighbor)) {
        openCells.push(neighbor);

        if (isVisualizationEnabled) {
          await visualizePathFinding(
            openCells,
            closedCells,
            currentCell,
            setOpenIndices,
            setClosedIndices,
            setCurrentCellIndex,
          );
        }
      }
    }
  }

  if (!hasFoundPath) {
    setIsVisualizing(false);
    alert('No path found');
    return;
  }

  const path = [];
  let currentBackTrackingCell = currentCell;

  while (currentBackTrackingCell.cameFrom) {
    path.push(currentBackTrackingCell);
    currentBackTrackingCell = currentBackTrackingCell.cameFrom;
  }

  await visualizeResultPath(path.reverse(), setPathIndices);
  setIsVisualizing(false);
}
