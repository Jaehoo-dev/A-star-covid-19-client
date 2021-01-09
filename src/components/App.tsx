import { auth, provider } from '../config/firebase';
import { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import requestLogin from '../api/requestLogin';
import fetchCurrentUser from '../api/fetchCurrentUser';
import { User } from '../interfaces';
import { AUTH_TOKEN } from '../constants';

const App = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);

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
    localStorage.setItem(AUTH_TOKEN, token);
  }

  async function signOutUser(): Promise<void> {
    await auth.signOut();
    localStorage.removeItem(AUTH_TOKEN);
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
