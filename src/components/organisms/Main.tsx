import styled from 'styled-components';
import MapHeader from '../molecules/MapHeader';
import Map from '../molecules/Map';

interface MainProps {
  cells: JSX.Element[],
  onDangerButtonClick: () => void;
  onRandomButtonClick: () => void;
  onClearButtonClick: () => void;
  onFindPathClick: () => void;
  onVisualizeClick: () => void;
  isFindingPath: boolean;
}

const Main = ({
  cells,
  onDangerButtonClick,
  onRandomButtonClick,
  onClearButtonClick,
  onFindPathClick,
  onVisualizeClick,
  isFindingPath,
}: MainProps): JSX.Element => {
  return (
    <MainWrapper>
      <MapWrapper>
        <MapHeader
          onDangerButtonClick={onDangerButtonClick}
          onRandomButtonClick={onRandomButtonClick}
          onClearButtonClick={onClearButtonClick}
          onFindPathClick={onFindPathClick}
          onVisualizeClick={onVisualizeClick}
          isFindingPath={isFindingPath}
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
