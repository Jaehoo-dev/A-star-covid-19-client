import styled from 'styled-components';
import MapHeader from '../molecules/MapHeader';
import Map from '../molecules/Map';

const Wrapper = styled.div`
  width: 60vmin;
  max-width: 960px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Main = () => {
  return (
    <Wrapper>
      <MapHeader />
      <Map
        numberOfRows={30}
        numberOfColumns={30}
      />
    </Wrapper>
  );
};

export default Main;
