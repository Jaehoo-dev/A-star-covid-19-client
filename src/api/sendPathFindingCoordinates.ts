export default async function sendPathFindingCoordinates(
  startingPoint: number,
  destination: number,
): Promise<void> {
  const res = await fetch('http://localhost:8080/histories/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('astar-covid19-auth-token')}`,
    },
    body: JSON.stringify({
      startingPoint,
      destination,
    }),
  });

  const response = await res.json();

  if (response.result !== 'ok') {
    alert('Failed pathfinding history update');
  }
}
