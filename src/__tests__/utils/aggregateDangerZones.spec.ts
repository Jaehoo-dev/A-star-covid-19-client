import aggregateDangerZones from '../../utils/aggregateDangerZones';

it('should return boundery properly', () => {
  expect(aggregateDangerZones([50]).sort())
    .toEqual([
      0, 1, 2, 3, 4,
      24, 25, 26, 27, 28,
      48, 49, 50, 51, 52,
      72, 73, 74, 75, 76,
      96, 97, 98, 99, 100,
    ].sort());
});

it('should set overlapping bounder properly', () => {
  expect(aggregateDangerZones([50, 51]).sort())
    .toEqual([
      0, 1, 2, 3, 4, 5,
      24, 25, 26, 27, 28, 29,
      48, 49, 50, 51, 52, 53,
      72, 73, 74, 75, 76, 77,
      96, 97, 98, 99, 100, 101,
    ].sort());
});

it('should cut out cells that fall out of map', () => {
  expect(aggregateDangerZones([0]).sort())
    .toEqual([
      0, 1, 2,
      24, 25, 26,
      48, 49, 50,
    ].sort());
});
