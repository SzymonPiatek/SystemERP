import { useMutation } from '@tanstack/react-query';
import { LoginDataProps, LoginResponse } from '../utils/types';
import { login } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  return useMutation<LoginResponse, any, LoginDataProps>({
    // @ts-ignore
    mutationFn: async (loginData: LoginDataProps) => {
      return await login(loginData);
    },
    onSuccess: (data: LoginResponse) => {
      setUser(data.user);
      toast.success('Successfully logged in!');
      navigate('/');
    },
    onError: (error: any) => {
      toast.error('Error during login.');
      toast.error(error.message);
    },
  });
};
