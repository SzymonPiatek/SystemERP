import { useMutation } from '@tanstack/react-query';
import { LoginDataProps, LoginResponse } from '../utils/types.ts';
import { login } from '../actions/authActions.ts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext.tsx';
import { useContext } from 'react';

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  return useMutation<LoginResponse, any, LoginDataProps>({
    // @ts-ignore
    mutationFn: async (loginData: LoginDataProps) => {
      return await login(loginData);
    },
    onSuccess: async (data: LoginResponse) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        toast.success('Successfully logged in!');
        navigate('/');
      } else {
        toast.error('Error during login.');
      }
    },
    onError: (error: any) => {
      toast.error('Error');
      toast.error(error.message);
    },
  });
};
