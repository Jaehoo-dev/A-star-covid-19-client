import '@testing-library/jest-dom';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import Button, { specialTheme } from '../../components/atoms/Button';

afterEach(cleanup);

const mockedFunction = jest.fn();

describe('<Button />', () => {
  it('renders Button component', () => {
    render(
      <Button onClick={mockedFunction}>
        render
      </Button>
    );
    expect(screen.getByText('render')).toBeInTheDocument();
  });

  it('invokes onClick function when clicked', () => {
    render(
      <Button onClick={mockedFunction}>
        click
      </Button>
    );
    fireEvent.click(screen.getByText('click'));
    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });
});
