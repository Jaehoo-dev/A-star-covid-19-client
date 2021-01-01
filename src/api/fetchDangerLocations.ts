import { FETCH_METHODS, RESPONSE_RESULTS } from '../constants/';

export default async function fetchDangerLocations(): Promise<number[] | undefined> {
  const res = await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/dangers`, {
    method: FETCH_METHODS.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();

  if (response.result !== RESPONSE_RESULTS.OK) {
    alert('Failed to fetch danger zone.');
    return;
  }

  return response.dangerLocations;
}
