import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { User } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type AuthContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const isAuthenticated = !!user;

  const logout = () => {
    localStorage.clear();
    setUser(null);
    toast.success('Successfully logged out!');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
