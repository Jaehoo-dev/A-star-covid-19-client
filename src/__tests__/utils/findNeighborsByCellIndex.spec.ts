import findNeighborsByCellIndex from '../../utils/findNeighborsByCellIndex';
import Cell from '../../classes/Cell';

it('should find the four cells adjacent in four directions', () => {
  expect(findNeighborsByCellIndex(new Cell(25, 24), 16, 24).sort()).toEqual([1, 24, 26, 49]);
});

it('should cut out cells falling out of map', () => {
  expect(findNeighborsByCellIndex(new Cell(0, 24), 16, 24).sort()).toEqual([1, 24]);
  expect(findNeighborsByCellIndex(new Cell(23, 24), 16, 24).sort()).toEqual([22, 47]);
});
