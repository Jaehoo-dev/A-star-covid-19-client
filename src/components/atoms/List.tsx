import styled, { ThemeProvider } from 'styled-components';

interface ListProps {
  theme: object,
  title?: string,
  children: React.ReactNode,
}

const List = ({
  theme,
  title,
  children,
}: ListProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ListWrapper>
        {
          title
          && <ListTitle>{title}</ListTitle>
        }
        <ListItemsWrapper>
          {children}
        </ListItemsWrapper>
      </ListWrapper>
    </ThemeProvider>
  );
};

const ListWrapper = styled.div`
  width: 100%;
`;

const ListTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: ${({ theme }) => theme.titleFontSize};
  margin: ${({ theme }) => theme.titleMargin};
`;

const ListItemsWrapper = styled.div`
  text-align: ${({ theme }) => theme.itemsTextAlign};
  font-size: ${({ theme }) => theme.itemsFontSize};
`;

export const historyListTheme = {
  titleFontSize: '22px',
  titleMargin: '0 0 20px 0',
  itemsTextAlign: 'center',
  itemsFontSize: '18px',
};

export default List;
