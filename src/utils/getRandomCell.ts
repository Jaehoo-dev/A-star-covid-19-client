export default function getRandomCell(
  max: number,
  cellsToExclude?: number[],
): number {
  const randomNumber = Math.floor(Math.random() * max);

  if (
    cellsToExclude
    && cellsToExclude.includes(randomNumber)
  ) {
    return getRandomCell(max, cellsToExclude);
  }

  return randomNumber;
}
