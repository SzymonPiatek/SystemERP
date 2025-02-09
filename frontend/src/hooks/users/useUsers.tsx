import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { QueryParamsProps, TableData, User, UserResponse } from '../../utils/types.ts';
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
    UserResponse,
    AxiosError<{ message?: string }>,
    { newUser: Omit<User, 'id' | 'isActive' | 'companyId'> }
  >({
    mutationKey: ['allUsers'],
    mutationFn: async ({ newUser }) => {
      const response = await addUser(newUser);
      return response;
    },
    onSuccess: (response) => {
      toaster.create({
        title: 'Success',
        description: response.message || 'User successfully added.',
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

  return useMutation<UserResponse, AxiosError<{ message?: string }>, { userId: number }>({
    mutationKey: ['allUsers'],
    mutationFn: async ({ userId }) => {
      const response = await deleteUser(userId);
      return response;
    },
    onSuccess: (response) => {
      toaster.create({
        title: 'Success',
        description: response.message || 'User activated/deactivated successfully.',
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
    UserResponse,
    AxiosError<{ message?: string }>,
    { updatedUser: Omit<User, 'id' | 'isActive' | 'companyId'>; id: number }
  >({
    mutationKey: ['allUsers'],
    mutationFn: async ({ updatedUser, id }) => {
      const response = editUser(updatedUser, id);
      return response;
    },
    onSuccess: (response) => {
      toaster.create({
        title: 'Success',
        description: response.message || 'User successfully updated.',
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
