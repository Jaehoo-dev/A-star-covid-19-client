import Button from '../atoms/Button';

const LoginButton = (): JSX.Element => {
  function clickHandler() {

  }

  return (
    <Button onClick={clickHandler}>
      <img
        className='icon'
        src='/images/github.png'
        alt='github'
      />
      <span>Login</span>
    </Button>
  );
};

export default LoginButton;
