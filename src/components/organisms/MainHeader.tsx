import styled from 'styled-components';
import HomeButton from '../molecules/HomeButton';
import AuthButton from '../molecules/AuthButton';
import { User } from '../../interfaces';

interface MainHeaderProps {
  onAuthButtonClick: () => void;
  currentUser: User | null;
}

const MainHeader = ({
  onAuthButtonClick,
  currentUser,
}: MainHeaderProps): JSX.Element => {
  return (
    <StyledHeader>
      <HomeButton />
      <AuthButton
        onClick={onAuthButtonClick}
        currentUser={currentUser}
      />
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
