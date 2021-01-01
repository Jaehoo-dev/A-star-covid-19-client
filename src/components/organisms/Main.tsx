import styled from 'styled-components';
import MapHeader from '../molecules/MapHeader';
import Map from '../molecules/Map';
import { User } from '../../interfaces';

interface MainProps {
  cells: JSX.Element[],
  onHistoryButtonClick: () => void;
  onDangerButtonClick: () => void;
  onRandomButtonClick: () => void;
  onClearButtonClick: () => void;
  onFindPathClick: () => void;
  onVisualizeClick: () => void;
  isVisualizing: boolean;
  currentUser: User | null;
  isShowingDangerZones: boolean;
}

const Main = ({
  cells,
  onHistoryButtonClick,
  onDangerButtonClick,
  onRandomButtonClick,
  onClearButtonClick,
  onFindPathClick,
  onVisualizeClick,
  isVisualizing,
  currentUser,
  isShowingDangerZones,
}: MainProps): JSX.Element => {
  return (
    <MainWrapper>
      <MapWrapper>
        <MapHeader
          onHistoryButtonClick={onHistoryButtonClick}
          onDangerButtonClick={onDangerButtonClick}
          onRandomButtonClick={onRandomButtonClick}
          onClearButtonClick={onClearButtonClick}
          onFindPathClick={onFindPathClick}
          onVisualizeClick={onVisualizeClick}
          isVisualizing={isVisualizing}
          currentUser={currentUser}
          isShowingDangerZones={isShowingDangerZones}
        />
        <Map cells={cells} />
      </MapWrapper>
      * Click on cell to set destinantion.
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 900px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -47%);
`;

const MapWrapper = styled.div`
  border: 1px solid black;
`;

export default Main;
