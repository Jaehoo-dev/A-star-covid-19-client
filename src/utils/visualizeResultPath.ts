import Cell from '../classes/Cell';
import timeGap from './timeGap';

export default async function visualizeResultPath(
  path: Cell[],
  setPathIndices: React.Dispatch<React.SetStateAction<number[]>>,
  setIsFindingPath: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  const pathByIndices = path.map(cell => cell.index);

  setIsFindingPath(true);

  for (let i = 1; i <= pathByIndices.length; i++) {
    await timeGap(3);
    setPathIndices(pathByIndices.slice(0, i));
  }

  setIsFindingPath(false);
}
