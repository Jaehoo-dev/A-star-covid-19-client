import Cell from '../classes/Cell';
import timeGap from './timeGap';

export default async function visualizeResultPath(
  path: Cell[],
  setPathIndices: React.Dispatch<React.SetStateAction<number[]>>,
) {
  const pathByIndices = path.map(cell => cell.index);

  for (let i = 1; i <= pathByIndices.length; i++) {
    await timeGap(5);

    setPathIndices(pathByIndices.slice(0, i));
  }
}
