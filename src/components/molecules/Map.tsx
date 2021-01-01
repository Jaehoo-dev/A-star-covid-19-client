import styled from 'styled-components';
import { NUMBERS } from '../../constants';

interface MapProps {
  cells: JSX.Element[];
}

const Map = ({ cells }: MapProps): JSX.Element => {
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
  grid-template-rows: repeat(${NUMBERS.ROWS}, 1fr);
  grid-template-columns: repeat(${NUMBERS.COLUMNS}, 1fr);
  grid-gap: 3px;
  padding: 3px;
`;

export default Map;
