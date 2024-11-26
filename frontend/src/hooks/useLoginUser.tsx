import { useMutation } from '@tanstack/react-query';
import { LoginDataProps } from '../utils/types.ts';
import { login } from '../actions/authActions.ts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLoginUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (loginData: LoginDataProps) => login(loginData),
    onSuccess: async () => {
      toast.success('Pomyślnie zalogowano!');
      navigate('/');
    },
    onError: (error: any) => {
      toast.error('Błąd podczas logowania');
      toast.error(error.message);
    },
  });
};
