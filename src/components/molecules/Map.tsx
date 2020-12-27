import styled from 'styled-components';
import Cell from '../atoms/Cell';

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

const Grid = styled.div`
  height: 60vmin;
  min-height: 480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(40, 1fr);
  grid-template-rows: repeat(30, 1fr);
`;

export default Map;
