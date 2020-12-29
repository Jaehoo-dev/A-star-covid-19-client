import Button, { textTheme } from '../atoms/Button';

const HomeButton = (): JSX.Element => {
  function clickHandler() {
    window.location.reload();
  }

  return (
    <Button
      onClick={clickHandler}
      theme={textTheme}
    >
      A* COVID-19
    </Button>
  );
};

export default HomeButton;
