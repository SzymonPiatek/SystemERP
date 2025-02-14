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
} from '../../utils/types';
import {
  getUsers,
  editUser,
  changeUserActivity,
  registerUser,
  acceptInvite,
} from '../../actions/usersActions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastForErrorHook, toastForSuccessHook } from '../../utils/hooks';

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
