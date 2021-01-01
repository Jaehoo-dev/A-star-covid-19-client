import Cell from '../classes/Cell';
import timeGap from './timeGap';

export default async function visualizeResultPath(
  path: Cell[],
  setPathIndices: React.Dispatch<React.SetStateAction<number[]>>,
  setIsVisualizing: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  const pathByIndices = path.map(cell => cell.index);

  setIsVisualizing(true);

  for (let i = 1; i <= pathByIndices.length; i++) {
    await timeGap(5);
    setPathIndices(pathByIndices.slice(0, i));
  }

  setIsVisualizing(false);
}
