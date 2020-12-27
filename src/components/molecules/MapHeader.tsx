import styled from 'styled-components';
import Button, { specialTheme } from '../atoms/Button';

const MapHeader: React.FC = () => {
  function historyClickHandler() {

  }

  return (
    <Header>
      <Button onClick={historyClickHandler}>History</Button>
      <Button onClick={historyClickHandler}>Stopover</Button>
      <Button onClick={historyClickHandler}>Clear</Button>
      <Button
        onClick={historyClickHandler}
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
