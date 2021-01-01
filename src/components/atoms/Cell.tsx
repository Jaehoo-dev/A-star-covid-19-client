import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StarIcon from '@material-ui/icons/Star';
import { COLORS } from '../../constants';

export interface CellProps {
  state: 'unvisited' | 'open' | 'closed' | 'path' | 'startingPoint' | 'destination' | 'danger';
  index: number;
  numberOfRows: number;
  numberOfColumns: number;
  onClick: (event: React.MouseEvent) => void;
}

const Cell = ({
  state,
  index,
  onClick,
}: CellProps): JSX.Element => {
  function clickHandler(event: React.MouseEvent) {
    onClick(event);
  }

  return (
    <StyledCell
      state={state}
      id={index.toString()}
      onClick={clickHandler}
    >
      {state === 'startingPoint' && <FiberManualRecordIcon />}
      {state === 'destination' && <StarIcon />}
    </StyledCell>
  );
};

const StyledCell = styled.div<{
  state: string;
  id: string;
}>`
  background-color: ${({ state }) => {
    switch (state) {
      case 'unvisited':
        return COLORS.WHITE;
      case 'open':
        return COLORS.BLUE;
      case 'closed':
        return COLORS.LIGHT_GRAY;
      case 'path':
        return COLORS.YELLOW;
      case 'danger':
        return COLORS.RED;
      default:
        return;
    }
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
`;

export default Cell;
