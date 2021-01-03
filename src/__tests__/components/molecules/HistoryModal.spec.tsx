import '@testing-library/jest-dom';
import { render, cleanup, screen, act, waitFor } from '@testing-library/react';
import HistoryModal from '../../../components/molecules/HistoryModal';

afterEach(cleanup);

describe('<HistoryModal />', () => {
  const mockedFunction = jest.fn();

  it('renders with title Histories', () => {
    render(
      <HistoryModal
        onOverlayClick={mockedFunction}
        numberOfColumns={24}
        setStartingPointIndex={mockedFunction}
        setDestinationIndex={mockedFunction}
        clearMap={mockedFunction}
      />
    );
    expect(screen.getByText('Histories')).toBeInTheDocument();
  });

  it('runs useEffect and loads Histories when mounted', async () => {
    const mockedResponse = {
      result: 'ok',
      histories: [
        { id: 1, userEmail: 'foo@bar.com', coordinates: [0, 100] },
      ],
    };
    const mockedRes = { json: jest.fn().mockResolvedValueOnce(mockedResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mockedRes);
    (global as any).fetch = mockedFetch;

    render(
      <HistoryModal
        onOverlayClick={mockedFunction}
        numberOfColumns={24}
        setStartingPointIndex={mockedFunction}
        setDestinationIndex={mockedFunction}
        clearMap={mockedFunction}
      />
    );
    expect(mockedFetch).toBeCalledTimes(1);
    await act(() => Promise.resolve());
  });

  it('shows history data by coordinates after loading history', async () => {
    const mockedResponse = {
      result: 'ok',
      histories: [
        { id: 1, userEmail: 'foo@bar.com', coordinates: [0, 100] },
        { id: 1, userEmail: 'foo@bar.com', coordinates: [1, 101] },
      ],
    };
    const mockedRes = { json: jest.fn().mockResolvedValueOnce(mockedResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mockedRes);
    (global as any).fetch = mockedFetch;

    render(
      <HistoryModal
        onOverlayClick={mockedFunction}
        numberOfColumns={24}
        setStartingPointIndex={mockedFunction}
        setDestinationIndex={mockedFunction}
        clearMap={mockedFunction}
      />
    );
    await waitFor(() => screen.getByText('[0, 0]'));
    expect(screen.getByText('[0, 1]')).toBeInTheDocument();
    await act(() => Promise.resolve());
  });
});
