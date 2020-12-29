import Cell from '../classes/Cell';
import timeGap from './timeGap';

export default async function visualizePathFinding(
  openCells: Cell[],
  closedCells: Cell[],
  setOpenIndices: React.Dispatch<React.SetStateAction<number[]>>,
  setClosedIndices: React.Dispatch<React.SetStateAction<number[]>>,
): Promise<void> {
  await timeGap(0);
  setOpenIndices(openCells.map(cell => cell.index));
  setClosedIndices(closedCells.map(cell => cell.index));
}
