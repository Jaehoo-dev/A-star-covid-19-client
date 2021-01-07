import { FETCH_METHODS, RESPONSE_RESULTS } from '../constants/';

export default async function fetchCurrentUser(token: string) {
  const urlRoot
    = process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_DEPLOYED_SERVER
      : process.env.REACT_APP_LOCALHOST;

  const res = await fetch(`${urlRoot}/users/by_token`, {
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
