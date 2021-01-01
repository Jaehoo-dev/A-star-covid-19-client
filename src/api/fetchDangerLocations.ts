export default async function fetchDangerLocations(): Promise<number[] | undefined> {
  const res = await fetch('http://localhost:8080/dangers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();

  if (response.result !== 'ok') {
    alert('Failed to fetch danger zone.');
    return;
  }

  return response.dangerLocations;
}
