import styled from 'styled-components';
import MapHeader from '../molecules/MapHeader';
import Map from '../molecules/Map';

const Main = () => {
  return (
    <MainWrapper>
      <MapWrapper>
        <MapHeader />
        <Map
          numberOfRows={30}
          numberOfColumns={40}
        />
      </MapWrapper>
      * Drag and drop to move nodes.<br />
      * Click and drag to set walls.
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 90vmin;
  min-width: 420px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -47%);
`;

const MapWrapper = styled.div`
  border: 1px solid black;
`;

export default Main;
