export default async function requestLogin(email: string) {
  const res = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const response = await res.json();

  if (response.result !== 'ok') {
    alert('Login failed.');
    return;
  }

  return {
    user: response.user,
    token: response.token,
  };
}
