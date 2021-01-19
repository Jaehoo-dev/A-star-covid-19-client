import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, queryByAttribute } from '@testing-library/react';
import Main from '../../../components/organisms/Main';
import Cell from '../../../components/atoms/Cell';

afterEach(cleanup);

describe('<Main />', () => {
  const mockedFunction = jest.fn();
  const getById = queryByAttribute.bind(null, 'id');

  test('renders main section properly', () => {
    const { getByText, container } = render(
      <Main
        cells={Array.from({
          length: 2 * 2,
        }, (_, i) => (
          <Cell
            key={i}
            state={'unvisited'}
            index={i}
            numberOfRows={2}
            numberOfColumns={2}
            onClick={mockedFunction}
          />
        ))}
        onHistoryButtonClick={mockedFunction}
        onDangerButtonClick={mockedFunction}
        onRandomButtonClick={mockedFunction}
        onClearButtonClick={mockedFunction}
        onRunPathfindingClick={mockedFunction}
        isVisualizing={false}
        currentUser={null}
        isShowingDangerZones={true}
      />
    );
    expect(getByText('History')).toBeInTheDocument();
    expect(getByText('On')).toBeInTheDocument();
    expect(getByText('Random')).toBeInTheDocument();
    expect(getByText('Clear')).toBeInTheDocument();
    expect(getByText('Find Path')).toBeInTheDocument();
    expect(getByText('Visualize A*')).toBeInTheDocument();
    expect(getById(container as HTMLElement, '0')).toBeInTheDocument();
    expect(getById(container as HTMLElement, '3')).toBeInTheDocument();
    expect(getByText('* Click on cell to set destinantion.')).toBeInTheDocument();
  });

  test('given function is invoked when cell is clicked on', () => {
    const { container } = render(
      <Main
        cells={Array.from({
          length: 2 * 2,
        }, (_, i) => (
          <Cell
            key={i}
            state={'unvisited'}
            index={i}
            numberOfRows={2}
            numberOfColumns={2}
            onClick={mockedFunction}
          />
        ))}
        onHistoryButtonClick={mockedFunction}
        onDangerButtonClick={mockedFunction}
        onRandomButtonClick={mockedFunction}
        onClearButtonClick={mockedFunction}
        onRunPathfindingClick={mockedFunction}
        isVisualizing={false}
        currentUser={null}
        isShowingDangerZones={true}
      />
    );
    const cell = getById(container as HTMLElement, '1');
    fireEvent.click(cell as Element);
    expect(mockedFunction).toBeCalledTimes(1);
  });

  test('danger button text should be Off when isShowingDangerZones is given as false', () => {
    const { getByText } = render(
      <Main
        cells={Array.from({
          length: 2 * 2,
        }, (_, i) => (
          <Cell
            key={i}
            state={'unvisited'}
            index={i}
            numberOfRows={2}
            numberOfColumns={2}
            onClick={mockedFunction}
          />
        ))}
        onHistoryButtonClick={mockedFunction}
        onDangerButtonClick={mockedFunction}
        onRandomButtonClick={mockedFunction}
        onClearButtonClick={mockedFunction}
        onRunPathfindingClick={mockedFunction}
        isVisualizing={false}
        currentUser={null}
        isShowingDangerZones={false}
      />
    );
    expect(getByText('Off')).toBeInTheDocument();
  });

  test('all buttons should function correctly when clicked', () => {
    const { getByText } = render(
      <Main
        cells={Array.from({
          length: 2 * 2,
        }, (_, i) => (
          <Cell
            key={i}
            state={'unvisited'}
            index={i}
            numberOfRows={2}
            numberOfColumns={2}
            onClick={mockedFunction}
          />
        ))}
        onHistoryButtonClick={mockedFunction}
        onDangerButtonClick={mockedFunction}
        onRandomButtonClick={mockedFunction}
        onClearButtonClick={mockedFunction}
        onRunPathfindingClick={mockedFunction}
        isVisualizing={false}
        currentUser={{ email: 'foo@bar.com' }}
        isShowingDangerZones={true}
      />
    );
    fireEvent.click(getByText('History'));
    expect(mockedFunction).toBeCalledTimes(1);
    fireEvent.click(getByText('On'));
    expect(mockedFunction).toBeCalledTimes(2);
    fireEvent.click(getByText('Random'));
    expect(mockedFunction).toBeCalledTimes(3);
    fireEvent.click(getByText('Clear'));
    expect(mockedFunction).toBeCalledTimes(4);
    fireEvent.click(getByText('Find Path'));
    expect(mockedFunction).toBeCalledTimes(5);
    fireEvent.click(getByText('Visualize A*'));
    expect(mockedFunction).toBeCalledTimes(6);
  });

  test('History button should be disabled when no currentUser is given', () => {
    const { getByText } = render(
      <Main
        cells={Array.from({
          length: 2 * 2,
        }, (_, i) => (
          <Cell
            key={i}
            state={'unvisited'}
            index={i}
            numberOfRows={2}
            numberOfColumns={2}
            onClick={mockedFunction}
          />
        ))}
        onHistoryButtonClick={mockedFunction}
        onDangerButtonClick={mockedFunction}
        onRandomButtonClick={mockedFunction}
        onClearButtonClick={mockedFunction}
        onRunPathfindingClick={mockedFunction}
        isVisualizing={false}
        currentUser={null}
        isShowingDangerZones={true}
      />
    );
    expect(getByText('History')).toBeDisabled();
    fireEvent.click(getByText('History'));
    expect(mockedFunction).not.toBeCalled();
  });

  test('all buttons are disabled when isVisualizing is given as true', () => {
    const { getByText } = render(
      <Main
        cells={Array.from({
          length: 2 * 2,
        }, (_, i) => (
          <Cell
            key={i}
            state={'unvisited'}
            index={i}
            numberOfRows={2}
            numberOfColumns={2}
            onClick={mockedFunction}
          />
        ))}
        onHistoryButtonClick={mockedFunction}
        onDangerButtonClick={mockedFunction}
        onRandomButtonClick={mockedFunction}
        onClearButtonClick={mockedFunction}
        onRunPathfindingClick={mockedFunction}
        isVisualizing={true}
        currentUser={null}
        isShowingDangerZones={true}
      />
    );
    expect(getByText('History')).toBeDisabled();
    expect(getByText('On')).toBeDisabled();
    expect(getByText('Random')).toBeDisabled();
    expect(getByText('Clear')).toBeDisabled();
    expect(getByText('Find Path')).toBeDisabled();
    expect(getByText('Visualize A*')).toBeDisabled();
    fireEvent.click(getByText('History'));
    expect(mockedFunction).not.toBeCalled();
    fireEvent.click(getByText('On'));
    expect(mockedFunction).not.toBeCalled();
    fireEvent.click(getByText('Random'));
    expect(mockedFunction).not.toBeCalled();
    fireEvent.click(getByText('Clear'));
    expect(mockedFunction).not.toBeCalled();
    fireEvent.click(getByText('Find Path'));
    expect(mockedFunction).not.toBeCalled();
    fireEvent.click(getByText('Visualize A*'));
    expect(mockedFunction).not.toBeCalled();
  });
});
