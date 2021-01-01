import styled from 'styled-components';
import Button, { specialTheme, dangerTheme } from '../atoms/Button';
import { User } from '../../interfaces';

interface MapHeaderProps {
  onHistoryButtonClick: () => void;
  onDangerButtonClick: () => void;
  onRandomButtonClick: () => void;
  onClearButtonClick: () => void;
  onRunPathfindingClick: (isProcessVisualizationEnabled: boolean) => void;
  isVisualizing: boolean;
  currentUser: User | null;
  isShowingDangerZones: boolean;
}

const MapHeader = ({
  onHistoryButtonClick,
  onDangerButtonClick,
  onRandomButtonClick,
  onClearButtonClick,
  onRunPathfindingClick,
  isVisualizing,
  currentUser,
  isShowingDangerZones,
}: MapHeaderProps): JSX.Element => {
  function historyClickHandler() {
    onHistoryButtonClick();
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
    onRunPathfindingClick(false);
  }

  function visualizePathFinding() {
    onRunPathfindingClick(true);
  }

  return (
    <Header>
      <Button
        onClick={historyClickHandler}
        disabled={!currentUser || isVisualizing}
      >History</Button>
      <Button
        onClick={dangerButtonClickHandler}
        disabled={isVisualizing}
        theme={dangerTheme}
      >{isShowingDangerZones ? 'On' : 'Off'}</Button>
      <Button
        onClick={randomButtonClickHandler}
        disabled={isVisualizing}
      >Random</Button>
      <Button
        onClick={clearButtonClickHandler}
        disabled={isVisualizing}
      >Clear</Button>
      <Button
        onClick={findPathClickHandler}
        disabled={isVisualizing}
        theme={specialTheme}
      >Find Path</Button>
      <Button
        onClick={visualizePathFinding}
        disabled={isVisualizing}
        theme={specialTheme}
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
