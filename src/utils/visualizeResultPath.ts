import Cell from '../classes/Cell';
import timeGap from './timeGap';
import { NUMBERS } from '../constants';

export default async function visualizeResultPath(
  path: Cell[],
  setPathIndices: React.Dispatch<React.SetStateAction<number[]>>,
): Promise<void> {
  const pathByIndices = path.map(cell => cell.index);

  for (let i = 1; i <= pathByIndices.length; i++) {
    await timeGap(NUMBERS.RESULT_SHOWING_TIME_GAP);
    setPathIndices(pathByIndices.slice(0, i));
  }
}
