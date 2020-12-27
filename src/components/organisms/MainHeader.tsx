import styled from 'styled-components';
import HomeButton from '../molecules/HomeButton';
import LoginButton from '../molecules/LoginButton';

const MainHeader = () => {
  return (
    <StyledHeader>
      <HomeButton />
      <LoginButton />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  width: 97%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 70px;
  border-bottom: 2.5px solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default MainHeader;
