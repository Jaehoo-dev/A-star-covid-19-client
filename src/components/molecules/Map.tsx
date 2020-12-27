import styled from 'styled-components';
import Cell from '../atoms/Cell';

const Grid = styled.div`
  height: 60vmin;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(30, 1fr);
  grid-template-rows: repeat(30, 1fr);
  border: 1px solid black;
`;

interface MapProps {
  numberOfRows: number;
  numberOfColumns: number;
}

const Map = ({
  numberOfRows,
  numberOfColumns,
}: MapProps) => {
  const cells = [];

  for (let i = 0; i < numberOfRows; i++) {
    const row = [];

    for (let j = 0; j < numberOfColumns; j++) {
      row.push(<Cell key={j} />);
    }

    cells.push(row);
  }

  return (
    <Grid>
      {cells}
    </Grid>
  );
};

export default Map;
