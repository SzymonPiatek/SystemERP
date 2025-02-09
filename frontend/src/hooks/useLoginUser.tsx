import { useMutation } from '@tanstack/react-query';
import { LoginDataProps, LoginResponse } from '../utils/types';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { toaster } from '../components/ui/toaster.tsx';

export const useLoginUser = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation<LoginResponse, any, LoginDataProps>({
    mutationFn: async (loginData: LoginDataProps) => {
      const response = await fetch('api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Error';

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      return await response.json();
    },
    onSuccess: (data: LoginResponse) => {
      setUser(data.user);
      toaster.create({
        title: 'Success',
        description: `${data.message}`,
        type: 'success',
      });
    },
    onError: (error: any) => {
      toaster.create({
        title: 'Error',
        description: `${error.message}`,
        type: 'error',
      });
    },
  });
};
