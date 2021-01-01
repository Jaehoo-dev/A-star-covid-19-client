import { FETCH_METHODS, RESPONSE_RESULTS } from '../constants/';

export default async function fetchCurrentUser(token: string) {
  const res = await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/users/by_token`, {
    method: FETCH_METHODS.GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await res.json();

  if (response.result !== RESPONSE_RESULTS.OK) {
    alert('Login failed.');
    return;
  }

  return response.user;
}
