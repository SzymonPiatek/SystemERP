import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { Employee, QueryParamsProps, TableData, User } from '../../utils/types.ts';
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
    AxiosError,
    { newUser: Omit<Employee, 'id' | 'isActive' | 'companyId'> }
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
      toaster.create({
        title: 'Error',
        description: `An error has occurred. ${error}`,
        type: 'error',
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<TableData<Employee>, AxiosError, { userId: number }>({
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
      toaster.create({
        title: 'Error',
        description: `An error has occurred. ${error}`,
        type: 'error',
      });
    },
  });
};
export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TableData<User>,
    AxiosError,
    { updatedUser: Omit<Employee, 'id' | 'isActive' | 'companyId'>; id: number }
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
      toaster.create({
        title: 'Error',
        description: `An error has occurred. ${error}`,
        type: 'error',
      });
    },
  });
};
