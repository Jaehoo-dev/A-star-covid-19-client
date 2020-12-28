import styled from 'styled-components';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../../constants/numbers';

interface MapProps {
  cells: JSX.Element[];
}

const Map = ({ cells }: MapProps) => {
  return (
    <Grid>
      {cells}
    </Grid>
  );
};

const Grid = styled.div`
  height: 580px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(${NUMBER_OF_ROWS}, 1fr);
  grid-template-columns: repeat(${NUMBER_OF_COLUMNS}, 1fr);
  grid-gap: 3px;
  padding: 3px;
`;

export default Map;
