import { FETCH_METHODS, RESPONSE_RESULTS } from '../constants/';

export default async function requestLogin(email: string) {
  const res = await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/auth/login`, {
    method: FETCH_METHODS.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const response = await res.json();

  if (response.result !== RESPONSE_RESULTS.OK) {
    alert('Login failed.');
    return;
  }

  return {
    user: response.user,
    token: response.token,
  };
}
