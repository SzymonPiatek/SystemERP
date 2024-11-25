import { useState, useEffect } from 'react';
import axiosAuth from '../utils/axiosUtils';
import { User } from '../utils/types';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const res = await axiosAuth.post('/auth/login', credentials);
      const { accessToken, refreshToken, user } = res.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosAuth.post('/auth/logout');
      localStorage.clear();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const res = await axiosAuth.get('/auth/me'); // Endpoint zwracający dane użytkownika
          setUser(res.data.user);
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.clear();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading, login, logout };
};

export default useAuth;
