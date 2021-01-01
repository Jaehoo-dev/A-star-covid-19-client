export default async function fetchCurrentUser(token: string) {
  const res = await fetch('http://localhost:8080/users/by_token', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await res.json();

  if (response.result !== 'ok') {
    alert('Login failed.');
    return;
  }

  return response.user;
}
