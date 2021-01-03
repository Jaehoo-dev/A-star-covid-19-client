import calculateManhattanDistance from '../../utils/calculateManhattanDistance';
import Cell from '../../classes/Cell';

it('should calculate manhattan distance between two cells', () => {
  expect(calculateManhattanDistance(new Cell(0, 24), new Cell(1, 24))).toBe(1);
  expect(calculateManhattanDistance(new Cell(360, 24), new Cell(12, 24))).toBe(27);
  expect(calculateManhattanDistance(new Cell(10, 5), new Cell(7, 5))).toBe(3);
});
