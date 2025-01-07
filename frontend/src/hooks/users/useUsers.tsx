import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { Employee, QueryParamsProps, TableData, User } from '../../utils/types.ts';
import { getUsers, addUser, editUser, deleteUser } from '../../actions/usersActions.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
export const useAddUser = (params: Employee) => {
  return useQuery<TableData<User>, AxiosError>({
    queryKey: ['allUsers', params],
    queryFn: () => addUser(params),
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
export const useDeleteUser = (params: Employee) => {
  return useQuery<TableData<User>, AxiosError>({
    queryKey: ['allUsers', params],
    queryFn: () => deleteUser(params.id),
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
      console.log('User updated successfully');
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (error) => {
      console.error('Error updating user:', error);
    },
  });
};
