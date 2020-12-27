import Button, { baseTheme } from '../atoms/Button';

const LoginButton = () => {
  function clickHandler() {

  }

  return (
    <Button
      onClick={clickHandler}
      theme={baseTheme}
    >
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
