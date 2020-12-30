import Button from '../atoms/Button';
import { User } from '../../interfaces';

interface AuthButtonProps {
  onClick: () => void;
  currentUser: User | null;
}

const AuthButton = ({
  onClick,
  currentUser,
}: AuthButtonProps): JSX.Element => {
  function clickHandler() {
    onClick();
  }

  return (
    <Button onClick={clickHandler}>
      <img
        className='icon'
        src='/images/github.png'
        alt='github'
      />
      <span>{currentUser ? 'Logout' : 'Login'}</span>
    </Button>
  );
};

export default AuthButton;
