import styled, { ThemeProvider } from 'styled-components';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode | string;
  theme?: object;
  disabled?: boolean;
}

const Button = ({
  onClick,
  children,
  theme = baseTheme,
  disabled,
  ...attributes
}: ButtonProps): JSX.Element => {
  function clickHandler() {
    onClick();
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledButton
        onClick={clickHandler}
        disabled={disabled}
        {...attributes}
      >
        {children}
      </StyledButton>
    </ThemeProvider>
  );
};

const StyledButton = styled.button`
  text-decoration: none;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: ${({ theme }) => theme.padding};
  border: ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight};
  color: ${({ theme }) => theme.color};
  width: ${({ theme }) => theme.width};
  height: ${({ theme }) => theme.height};
  margin: ${({ theme }) => theme.margin};
  position: ${({ theme }) => theme.position};
  top: ${({ theme }) => theme.top};
  left: ${({ theme }) => theme.left};
  transform: ${({ theme }) => theme.transform};

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
  backgroundColor: '#f9fd00',
  padding: '7px 10px',
  fontSize: '18px',
  fontWeight: 'bold',
};

export const dangerTheme = {
  border: '1px solid',
  borderRadius: '5px',
  backgroundColor: 'red',
  padding: '7px 10px',
  fontSize: '16px',
};

export const textTheme = {
  backgroundColor: 'white',
  fontSize: '26px',
  fontWeight: 900,
  border: 'none',
};

export default Button;
