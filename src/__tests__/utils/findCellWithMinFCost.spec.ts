import findCellWithMinFCost from '../../utils/findCellWithMinFCost';
import Cell from '../../classes/Cell';

it('should find cell with minimum fCost', () => {
  const cellOne = new Cell(5, 24);
  const cellTwo = new Cell(10, 24);
  const cellThree = new Cell(15, 24);
  cellOne.fCost = 11;
  cellTwo.fCost = 22;
  cellThree.fCost = 33;

  expect(findCellWithMinFCost([cellOne, cellTwo, cellThree])).toBe(cellOne);
  cellOne.fCost = 44;
  expect(findCellWithMinFCost([cellOne, cellTwo, cellThree])).toBe(cellTwo);
  cellTwo.fCost = 55;
  expect(findCellWithMinFCost([cellOne, cellTwo, cellThree])).toBe(cellThree);
});
