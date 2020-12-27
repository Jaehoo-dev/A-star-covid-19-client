import styled, { ThemeProvider } from 'styled-components';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  theme?: object;
}

const Button = ({
  onClick,
  children,
  theme = baseTheme,
}: ButtonProps) => {
  function clickHandler() {
    onClick();
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledButton onClick={clickHandler}>
        {children}
      </StyledButton>
    </ThemeProvider>
  );
};

const StyledButton = styled.button`
  text-decoration: none;
  background-color: ${props => props.theme.backgroundColor};
  padding: ${props => props.theme.padding};
  border: ${props => props.theme.border};
  display: flex;
  align-items: center;
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.fontSize};
  font-weight: ${props => props.theme.fontWeight};
  color: ${props => props.theme.color};
  width: ${props => props.theme.width};
  height: ${props => props.theme.height};
  margin: ${props => props.theme.margin};
  position: ${props => props.theme.position};
  top: ${props => props.theme.top};
  left: ${props => props.theme.left};
  transform: ${props => props.theme.transform};

  &:hover {
    cursor: pointer;
  }

  .icon {
    display: flex;
    vertical-align: middle;
    width: 30px;
    height: 30px;
  }
`;

export const baseTheme = {
  border: '1px solid',
  borderRadius: '5px',
  backgroundColor: 'white',
  padding: '7px 10px',
  fontSize: '16px',
};

export const specialTheme = {
  border: '1px solid',
  borderRadius: '5px',
  backgroundColor: '#FFA620',
  padding: '7px 10px',
  fontSize: '18px',
  fontWeight: 'bold',
};

export const textTheme = {
  backgroundColor: 'white',
  fontSize: '26px',
  fontWeight: 900,
  border: 'none',
};

export default Button;
