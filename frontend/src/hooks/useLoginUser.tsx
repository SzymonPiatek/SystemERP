import { useMutation } from '@tanstack/react-query';
import { LoginDataProps, LoginResponse, ToastForErrorHookErrorType } from '../utils/types';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { toastForErrorHook, toastForSuccessHook } from '../utils/hooks';

export const useLoginUser = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation<LoginResponse, ToastForErrorHookErrorType, LoginDataProps>({
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
      toastForSuccessHook({ response: data });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};
