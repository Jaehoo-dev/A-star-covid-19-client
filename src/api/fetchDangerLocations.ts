import { FETCH_METHODS, RESPONSE_RESULTS } from '../constants/';

export default async function fetchDangerLocations(): Promise<number[] | undefined> {
  const urlRoot
    = process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_DEPLOYED_SERVER
      : process.env.REACT_APP_LOCALHOST;

  const res = await fetch(`${urlRoot}/dangers`, {
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
