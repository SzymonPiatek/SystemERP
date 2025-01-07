import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { QueryParamsProps, TableData, User } from '../../utils/types.ts';
import { getUsers } from '../../actions/employeesActions.ts';

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
