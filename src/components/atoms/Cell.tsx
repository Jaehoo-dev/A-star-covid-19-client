import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StarIcon from '@material-ui/icons/Star';

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
        return 'white';
      case 'open':
        return '#0010e9';
      case 'closed':
        return '#e3e3e3';
      case 'path':
        return '#fbff00';
      case 'danger':
        return 'red';
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
