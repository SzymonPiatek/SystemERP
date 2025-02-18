import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  EditUserPayload,
  QueryParamsProps,
  RegisterUserPayload,
  TableData,
  ToastForErrorHookErrorType,
  User,
  UserResponse,
  AcceptInvitePayload,
  changePasswordPayload,
} from '../../utils/types';
import {
  getUsers,
  editUser,
  changeUserActivity,
  registerUser,
  acceptInvite,
  changePassword,
  changePicture,
} from '../../actions/usersActions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastForErrorHook, toastForSuccessHook } from '../../utils/hooks';
import { forgotPassword, ResetPassword } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';

export const useUsers = (params: QueryParamsProps) => {
  return useQuery<TableData<User>, AxiosError>({
    queryKey: ['allUsers', params],
    queryFn: () => getUsers(params),
    select: (response) => {
      return {
        ...response,
        data: response.data.map((user) => ({
          ...user,
          roleName: user.profile?.role?.name ?? 'No role',
        })),
      };
    },
  });
};

export const useChangeUserActivity = () => {
  const queryClient = useQueryClient();

  return useMutation<UserResponse, ToastForErrorHookErrorType, { userId: number }>({
    mutationKey: ['allUsers'],
    mutationFn: async ({ userId }) => {
      const response = await changeUserActivity(userId);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};
export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UserResponse,
    ToastForErrorHookErrorType,
    { updatedUser: EditUserPayload; id: number }
  >({
    mutationKey: ['allUsers'],
    mutationFn: async ({ updatedUser, id }) => {
      const response = editUser(updatedUser, id);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};
export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UserResponse, ToastForErrorHookErrorType, { newUser: RegisterUserPayload }>({
    mutationKey: ['allUsers'],
    mutationFn: async ({ newUser }) => {
      const response = registerUser(newUser);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};

export const useAcceptInvite = () => {
  return useMutation<UserResponse, ToastForErrorHookErrorType, { accept: AcceptInvitePayload }>({
    mutationFn: async ({ accept }) => {
      const response = acceptInvite(accept);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};

export const useChangePassword = () => {
  return useMutation<
    UserResponse,
    ToastForErrorHookErrorType,
    { updatedUser: changePasswordPayload; id: number }
  >({
    mutationFn: async ({ updatedUser, id }) => {
      const response = changePassword(updatedUser, id);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};

export const useChangePic = () => {
  return useMutation<UserResponse, ToastForErrorHookErrorType, { updatedUser: File; id: number }>({
    mutationFn: async ({ updatedUser, id }) => {
      const response = await changePicture(updatedUser, id);
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<UserResponse, ToastForErrorHookErrorType, { email: string }>({
    mutationFn: async ({ email }) => {
      const response = await forgotPassword({ email });
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};
export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation<
    UserResponse,
    ToastForErrorHookErrorType,
    { newPassword: string; token: string }
  >({
    mutationFn: async ({ newPassword, token }) => {
      const response = await ResetPassword({ newPassword, token });
      return response;
    },
    onSuccess: (response) => {
      toastForSuccessHook({ response });
      navigate('/');
    },
    onError: (error) => {
      toastForErrorHook({ error });
    },
  });
};
