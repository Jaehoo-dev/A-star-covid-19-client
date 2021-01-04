import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import MainHeader from '../../../components/organisms/MainHeader';

afterEach(cleanup);

describe('<MainHeader />', () => {
  const mockedFunction = jest.fn();
  const { reload } = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    window.location.reload = reload;
  });

  test('header renders properly', () => {
    const { getByText } = render(
      <MainHeader
        onAuthButtonClick={mockedFunction}
        currentUser={null}
      />
    );
    expect(getByText('A* COVID-19')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  test('AuthButton renders as logout button when currentUser is given', () => {
    const { getByText } = render(
      <MainHeader
        onAuthButtonClick={mockedFunction}
        currentUser={{ email: 'foo@bar.com' }}
      />
    );
    const loginButton = screen.queryByText('Login');
    expect(getByText('Logout')).toBeInTheDocument();
    expect(loginButton).not.toBeInTheDocument();
  });

  test('site refreshes when home button is clicked', () => {
    const { getByText } = render(
      <MainHeader
        onAuthButtonClick={mockedFunction}
        currentUser={{ email: 'foo@bar.com' }}
      />
    );
    fireEvent.click(getByText('A* COVID-19'));
    expect(jest.isMockFunction(window.location.reload)).toBe(true);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
