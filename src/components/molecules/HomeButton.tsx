import Button, { textTheme } from '../atoms/Button';

const HomeButton = () => {
  function clickHandler() {
    window.location.reload();
  }

  return (
    <Button
      onClick={clickHandler}
      theme={textTheme}
    >
      A* Map
    </Button>
  );
};

export default HomeButton;
