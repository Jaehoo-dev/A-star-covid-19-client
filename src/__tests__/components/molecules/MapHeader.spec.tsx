import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import MapHeader from '../../../components/molecules/MapHeader';

afterEach(cleanup);

describe('<MapHeader />', () => {
  const mockedFunction = jest.fn();

  test('renders all buttons properly', () => {
    const { getAllByRole, getByText } = render(
      <MapHeader
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
    expect(getAllByRole('button')).toHaveLength(6);
    expect(getByText('History')).toBeInTheDocument();
    expect(getByText('On')).toBeInTheDocument();
    expect(getByText('Random')).toBeInTheDocument();
    expect(getByText('Clear')).toBeInTheDocument();
    expect(getByText('Find Path')).toBeInTheDocument();
    expect(getByText('Visualize A*')).toBeInTheDocument();
  });

  test('danger button text should be Off when isShowingDangerZones is given as false', () => {
    const { getByText } = render(
      <MapHeader
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
      <MapHeader
        onHistoryButtonClick={mockedFunction}
        onDangerButtonClick={mockedFunction}
        onRandomButtonClick={mockedFunction}
        onClearButtonClick={mockedFunction}
        onRunPathfindingClick={mockedFunction}
        isVisualizing={false}
        currentUser={{ email: 'foo@bar.com ' }}
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
      <MapHeader
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
      <MapHeader
        onHistoryButtonClick={mockedFunction}
        onDangerButtonClick={mockedFunction}
        onRandomButtonClick={mockedFunction}
        onClearButtonClick={mockedFunction}
        onRunPathfindingClick={mockedFunction}
        isVisualizing={true}
        currentUser={{ email: 'foo@bar.com' }}
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
