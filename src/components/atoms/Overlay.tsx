import styled from 'styled-components';

interface OverlayProps {
  onClick: () => void;
}

const Overlay = ({
  onClick,
}: OverlayProps): JSX.Element => {
  function clickHandler(): void {
    onClick();
  }

  return (
    <StyledOverlay onClick={clickHandler} />
  );
};

const StyledOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  opacity: .5;
  background-color: black;
`;

export default Overlay;
