import styled from 'styled-components';
import Button, { specialTheme } from '../atoms/Button';

interface MapHeaderProps {
  onDangerButtonClick: () => void;
  onRandomButtonClick: () => void;
  onClearButtonClick: () => void;
  onFindPathClick: () => void;
  onVisualizeClick: () => void;
  isFindingPath: boolean;
}

const MapHeader = ({
  onDangerButtonClick,
  onRandomButtonClick,
  onClearButtonClick,
  onFindPathClick,
  onVisualizeClick,
  isFindingPath,
}: MapHeaderProps): JSX.Element => {
  function historyClickHandler() {

  }

  function dangerButtonClickHandler() {
    onDangerButtonClick();
  }

  function randomButtonClickHandler() {
    onRandomButtonClick();
  }

  function clearButtonClickHandler() {
    onClearButtonClick();
  }

  function findPathClickHandler() {
    onFindPathClick();
  }

  function visualizePathFinding() {
    onVisualizeClick();
  }

  return (
    <Header>
      <Button onClick={historyClickHandler} disabled={isFindingPath}>History</Button>
      <Button onClick={dangerButtonClickHandler} disabled={isFindingPath}>Danger</Button>
      <Button onClick={randomButtonClickHandler} disabled={isFindingPath}>Random</Button>
      <Button onClick={clearButtonClickHandler} disabled={isFindingPath}>Clear</Button>
      <Button
        onClick={findPathClickHandler}
        theme={specialTheme}
        disabled={isFindingPath}
      >Find Path</Button>
      <Button
        onClick={visualizePathFinding}
        theme={specialTheme}
        disabled={isFindingPath}
      >Visualize A*</Button>
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
