import createDangerZone from './createDangerZone';
import { NUMBERS } from '../constants';

export default function aggregateDangerZones(dangerLocations: number[]) {
  let dangerZones: number[] = [];

  for (let i = 0; i < dangerLocations.length; i++) {
    dangerZones = dangerZones.concat(createDangerZone(dangerLocations[i], NUMBERS.ROWS, NUMBERS.COLUMNS));
  }

  return dangerZones;
}
