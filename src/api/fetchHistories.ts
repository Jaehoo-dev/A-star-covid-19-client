import { History } from '../interfaces/';

export default async function fetchHistories(): Promise<History[] | undefined> {
  const res = await fetch('http://localhost:8080/histories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('astar-covid19-auth-token')}`,
    },
  });

  const response = await res.json();

  if (response.result !== 'ok') {
    alert('Failed to load histories');
    return;
  }

  return response.histories;
}
