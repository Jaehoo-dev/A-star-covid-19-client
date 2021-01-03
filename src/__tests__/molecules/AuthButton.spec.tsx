import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import AuthButton from '../../components/molecules/AuthButton';
import githubLogo from '../../../public/images/github.png';

afterEach(cleanup);

const mockedFunction = jest.fn();

describe('<AuthButton />', () => {
  it('renders with github logo', () => {
    const { getByAltText } = render(<AuthButton onClick={mockedFunction} currentUser={null} />);
    expect(getByAltText('github')).toBeTruthy();
    const img = document.querySelector('img') as HTMLImageElement;
    expect(img.src).toContain(githubLogo);
  });

  it('renders as Login button when no user is given', () => {
    render(<AuthButton onClick={mockedFunction} currentUser={null} />);
    const logoutButton = screen.queryByText('Logout');
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(logoutButton).not.toBeInTheDocument();
  });

  it('renders as Login button when user is given', () => {
    render(<AuthButton onClick={mockedFunction} currentUser={{ email: 'foo@bar.com' }} />);
    const loginButton = screen.queryByText('Login');
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(loginButton).not.toBeInTheDocument();
  });
});
