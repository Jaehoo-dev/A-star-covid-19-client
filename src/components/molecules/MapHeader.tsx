import styled from 'styled-components';
import Button, { specialTheme } from '../atoms/Button';

interface MapHeaderProps {
  onDangerButtonClick: () => void;
  onRandomButtonClick: () => void;
  onFindPathClick: () => void;
  onClearButtonClick: () => void;
}

const MapHeader = ({
  onDangerButtonClick,
  onRandomButtonClick,
  onFindPathClick,
  onClearButtonClick,
}: MapHeaderProps) => {
  function historyClickHandler() {

  }

  function dangerButtonClickHandler() {
    onDangerButtonClick();
  }

  function randomButtonClickHandler() {
    onRandomButtonClick();
  }

  function findPathClickHandler() {
    onFindPathClick();
  }

  function clearButtonClickHandler() {
    onClearButtonClick();
  }

  return (
    <Header>
      <Button onClick={historyClickHandler}>History</Button>
      <Button onClick={dangerButtonClickHandler}>Danger</Button>
      <Button onClick={randomButtonClickHandler}>Random</Button>
      <Button onClick={clearButtonClickHandler}>Clear</Button>
      <Button
        onClick={findPathClickHandler}
        theme={specialTheme}
      >Find Path</Button>
    </Header>
  );
};

const Header = styled.div`
  height: 70px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export default MapHeader;
