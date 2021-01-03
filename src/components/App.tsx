import { auth, provider } from '../config/firebase';
import { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import requestLogin from '../api/requestLogin';
import fetchCurrentUser from '../api/fetchCurrentUser';
import { User } from '../interfaces';

const App = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('astar-covid19-auth-token');

    if (!token) return;

    loadCurrentUser(token);

    async function loadCurrentUser(token: string): Promise<void> {
      const user = await fetchCurrentUser(token);

      if (!user) {
        signOutUser();
        return;
      }

      setCurrentUser(user);
    }
  }, []);

  async function authButtonClickHandler(): Promise<void> {
    if (currentUser) {
      signOutUser();
      return;
    }

    await auth.signInWithPopup(provider);

    if (!auth.currentUser) {
      alert('Login failed.');
      return;
    }

    const loginResponse = await requestLogin(auth.currentUser.email!);

    if (!loginResponse) return;

    const { user, token } = loginResponse;

    setCurrentUser(user);
    localStorage.setItem('astar-covid19-auth-token', token);
  }

  function signOutUser(): void {
    auth.signOut();
    localStorage.removeItem('astar-covid19-auth-token');
    setCurrentUser(null);
  }

  return (
    <MainPage
      currentUser={currentUser}
      onAuthButtonClick={authButtonClickHandler}
    />
  );
};

export default App;
