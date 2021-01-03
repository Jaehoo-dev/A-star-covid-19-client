import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, queryByAttribute, waitFor, act } from '@testing-library/react';
import MainPage from '../../../components/pages/MainPage';
import { NUMBERS } from '../../../constants';

afterEach(cleanup);

describe('<MainPage />', () => {
  const mockedFunction = jest.fn();
  const getById = queryByAttribute.bind(null, 'id');
  const getByClassname = queryByAttribute.bind(null, 'class');

  test('renders full page properly', () => {
    const { getByText, container } = render(
      <MainPage
        onAuthButtonClick={mockedFunction}
        currentUser={null}
      />
    );
    expect(getByText('A* COVID-19')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('History')).toBeInTheDocument();
    expect(getByText('On')).toBeInTheDocument();
    expect(getByText('Random')).toBeInTheDocument();
    expect(getByText('Clear')).toBeInTheDocument();
    expect(getByText('Find Path')).toBeInTheDocument();
    expect(getByText('Visualize A*')).toBeInTheDocument();
    expect(getById(container as HTMLElement, '0')).toBeInTheDocument();
    expect(getById(container as HTMLElement, `${NUMBERS.ROWS * NUMBERS.COLUMNS - 1}`)).toBeInTheDocument();
    expect(getByText('* Click on cell to set destinantion.')).toBeInTheDocument();
  });

  test('HistoryModal opens when history button is clicked', async () => {
    const { getByText } = render(
      <MainPage
        onAuthButtonClick={mockedFunction}
        currentUser={{ email: 'foo@bar.com' }}
      />
    );
    fireEvent.click(getByText('History'));
    await waitFor(() => getByText('Histories'));
    expect(getByText('Histories')).toBeInTheDocument();
  });

  test('fetches danger locations on mount', async () => {
    const mockedResponse = {
      result: 'ok',
      dangerLocations: [100, 200, 300],
    };
    const mockedRes = { json: jest.fn().mockResolvedValueOnce(mockedResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mockedRes);
    (global as any).fetch = mockedFetch;

    render(
      <MainPage
        onAuthButtonClick={mockedFunction}
        currentUser={{ email: 'foo@bar.com' }}
      />
    );
    expect(mockedFetch).toBeCalledTimes(1);
    await act(() => Promise.resolve());
  });

  test('mark cell as destination on click', () => {
    const { container } = render(
      <MainPage
        onAuthButtonClick={mockedFunction}
        currentUser={{ email: 'foo@bar.com' }}
      />
    );
    const cell = getById(container as HTMLElement, '0');
    expect(getByClassname(container as HTMLElement, 'MuiSvgIcon-root')).not.toBeInTheDocument();
    fireEvent.click(cell as Element);
    expect(getByClassname(container as HTMLElement, 'MuiSvgIcon-root')).toBeInTheDocument();
  });

  test('logout button and history button are enabled when currentUser is given', () => {
    const { getByText } = render(
      <MainPage
        onAuthButtonClick={mockedFunction}
        currentUser={{ email: 'foo@bar.com' }}
      />
    );
    expect(getByText('Logout')).toBeInTheDocument();
    expect(getByText('History')).not.toBeDisabled();
  });
});
