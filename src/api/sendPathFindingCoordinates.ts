import { FETCH_METHODS, RESPONSE_RESULTS } from '../constants/';

export default async function sendPathFindingCoordinates(
  startingPoint: number,
  destination: number,
): Promise<void> {
  const res = await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/histories/new`, {
    method: FETCH_METHODS.POST,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('astar-covid19-auth-token')}`,
    },
    body: JSON.stringify({
      startingPoint,
      destination,
    }),
  });

  const response = await res.json();

  if (response.result !== RESPONSE_RESULTS.OK) {
    alert('Failed pathfinding history update');
  }
}
