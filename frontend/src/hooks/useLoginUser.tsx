import { useMutation } from '@tanstack/react-query';
import { LoginDataProps, LoginResponse } from '../utils/types.ts';
import { login } from '../actions/authActions.ts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLoginUser = () => {
  const navigate = useNavigate();

  return useMutation<LoginResponse, any, LoginDataProps>({
    // @ts-ignore
    mutationFn: async (loginData: LoginDataProps) => {
      return await login(loginData);
    },
    onSuccess: async (data: LoginResponse) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        toast.success('Successfully logged in!');
        navigate('/');
      } else {
        toast.error('Error');
      }
    },
    onError: (error: any) => {
      toast.error('Error');
      toast.error(error.message);
    },
  });
};
