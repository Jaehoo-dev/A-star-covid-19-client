import { History } from '../interfaces/';
import { FETCH_METHODS, RESPONSE_RESULTS } from '../constants/';

export default async function fetchHistories(): Promise<History[] | void> {
  const urlRoot
    = process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_DEPLOYED_SERVER
      : process.env.REACT_APP_LOCALHOST;

  const res = await fetch(`${urlRoot}/histories`, {
    method: FETCH_METHODS.GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('astar-covid19-auth-token')}`,
    },
  });

  const response = await res.json();

  if (response.result !== RESPONSE_RESULTS.OK) {
    alert('Failed to load histories');
    return;
  }

  return response.histories;
}
