import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { User } from '../utils/types';
import { logout as apiLogout } from '../actions/authActions.ts';
import { toaster } from '../components/ui/toaster.tsx';

type AuthContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  logout: () => void;
};

function getInitialUser() {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser) as User;
    } catch (err) {
      console.error('Błąd parsowania użytkownika z localStorage:', err);
    }
  }
  return null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getInitialUser());

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = async () => {
    try {
      await apiLogout();
      toaster.create({
        title: 'Success',
        description: 'Successfully logged out!',
        type: 'success',
      });
    } catch (err) {
      console.error('Błąd podczas wylogowywania:', err);
    }
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
