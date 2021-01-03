import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, queryByAttribute } from '@testing-library/react';
import Cell from '../../../components/atoms/Cell';

afterEach(cleanup);

describe('<Cell />', () => {
  const mockedFunction = jest.fn();
  const mockedState = 'unvisited';
  const mockedIndex = 1;
  const mockedNumberOfRows = 1;
  const mockedNumberOfColumns = 1;
  const getById = queryByAttribute.bind(null, 'id');

  it('renders Cell component', () => {
    const { container } = render(
      <Cell
        onClick={mockedFunction}
        state={mockedState}
        index={mockedIndex}
        numberOfRows={mockedNumberOfRows}
        numberOfColumns={mockedNumberOfColumns}
      />
    );
    const cell = getById(container as HTMLElement, '1');
    expect(cell).toBeInTheDocument();
  });

  it('invokes onClick function when clicked', () => {
    const { container } = render(
      <Cell
        onClick={mockedFunction}
        state={mockedState}
        index={mockedIndex}
        numberOfRows={mockedNumberOfRows}
        numberOfColumns={mockedNumberOfColumns}
      />
    );
    const cell = getById(container as HTMLElement, '1');
    fireEvent.click(cell as Element);
    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });
});
