import { FETCH_METHODS, RESPONSE_RESULTS } from '../constants/';

export default async function requestLogin(email: string) {
  const urlRoot
    = process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_DEPLOYED_SERVER
      : process.env.REACT_APP_LOCALHOST;

  const res = await fetch(`${urlRoot}/auth/login`, {
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
