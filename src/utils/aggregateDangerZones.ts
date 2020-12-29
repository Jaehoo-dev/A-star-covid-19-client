import createDangerZone from './createDangerZone';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../constants/numbers';

export default function aggregateDangerZones(dangerLocations: number[]) {
  let dangerZones: number[] = [];

  for (let i = 0; i < dangerLocations.length; i++) {
    dangerZones = dangerZones.concat(createDangerZone(dangerLocations[i], NUMBER_OF_ROWS, NUMBER_OF_COLUMNS));
  }

  return dangerZones;
}
