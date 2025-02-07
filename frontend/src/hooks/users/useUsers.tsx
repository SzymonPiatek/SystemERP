import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { QueryParamsProps, TableData, User } from '../../utils/types.ts';
import { getUsers, addUser, editUser, deleteUser } from '../../actions/usersActions.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toaster } from '../../components/ui/toaster.tsx';

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
export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TableData<User>,
    AxiosError<{ message?: string }>,
    { newUser: Omit<User, 'id' | 'isActive' | 'companyId'> }
  >({
    mutationKey: ['allUsers'],
    mutationFn: ({ newUser }) => addUser(newUser),
    onSuccess: () => {
      toaster.create({
        title: 'Success',
        description: 'User successfully added.',
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      toaster.create({
        title: 'Error',
        description: errorMessage,
        type: 'error',
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<TableData<User>, AxiosError<{ message?: string }>, { userId: number }>({
    mutationKey: ['allUsers'],
    mutationFn: ({ userId }) => deleteUser(userId),
    onSuccess: () => {
      toaster.create({
        title: 'Success',
        description: 'User successfully deactivated/activated.',
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      toaster.create({
        title: 'Error',
        description: errorMessage,
        type: 'error',
      });
    },
  });
};
export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TableData<User>,
    AxiosError<{ message?: string }>,
    { updatedUser: Omit<User, 'id' | 'isActive' | 'companyId'>; id: number }
  >({
    mutationKey: ['allUsers'],
    mutationFn: ({ updatedUser, id }) => editUser(updatedUser, id),
    onSuccess: () => {
      toaster.create({
        title: 'Success',
        description: 'User successfully updated.',
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      toaster.create({
        title: 'Error',
        description: errorMessage,
        type: 'error',
      });
    },
  });
};
