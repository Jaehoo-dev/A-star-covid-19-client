import { calculateRowIndex, calculateColumnIndex, calculateCellIndex } from '../../utils/calculateIndex';

describe('calculateRowIndex', () => {
  it('should calculate row index from given array index', () => {
    expect(calculateRowIndex(0, 24)).toBe(0);
    expect(calculateRowIndex(30, 24)).toBe(1);
    expect(calculateRowIndex(12, 5)).toBe(2);
  });

  it('should calculate column index from given array index', () => {
    expect(calculateColumnIndex(0, 24)).toBe(0);
    expect(calculateColumnIndex(30, 24)).toBe(6);
    expect(calculateColumnIndex(12, 5)).toBe(2);
  });

  it('should calculate array index from given coordinates', () => {
    expect(calculateCellIndex([0, 0], 24)).toBe(0);
    expect(calculateCellIndex([15, 20], 24)).toBe(380);
    expect(calculateCellIndex([8, 11], 5)).toBe(51);
  });
});
