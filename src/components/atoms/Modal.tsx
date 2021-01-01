import styled, { ThemeProvider } from 'styled-components';
import Overlay from './Overlay';

interface ModalProps {
  onOverlayClick: () => void;
  theme: object;
  children: React.ReactNode | string;
}

const Modal = ({
  onOverlayClick,
  theme,
  children,
  ...attributes
}: ModalProps): JSX.Element => {
  function overlayClickHandler(): void {
    onOverlayClick();
  }

  return (
    <>
      <Overlay onClick={overlayClickHandler} />
      <ThemeProvider theme={theme}>
        <StyledModal {...attributes}>
          {children}
        </StyledModal>
      </ThemeProvider>
    </>
  );
};

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  overflow: auto;
  width: ${({ theme }) => theme.width};
  height: ${({ theme }) => theme.height};
  padding: ${({ theme }) => theme.padding};
  position: ${({ theme }) => theme.position};
  top: ${({ theme }) => theme.top};
  left: ${({ theme }) => theme.left};
  transform: ${({ theme }) => theme.transform};
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const historyModalTheme = {
  width: '200px',
  height: '400px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  backgroundColor: 'white',
  boxShadow: '3px 3px 3px 2px rgba(0, 0, 0, 0.2)',
};

export default Modal;
