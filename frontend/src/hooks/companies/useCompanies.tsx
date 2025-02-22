import { useQuery } from '@tanstack/react-query';
import type { Company } from '../../utils/types';
import { AxiosError } from 'axios';
import { getCompanies } from '../../actions/companiesActions';

export const useCompanies = () => {
  return useQuery<Company[], AxiosError>({
    queryKey: ['allCompanies'],
    queryFn: async () => {
      try {
        const response = await getCompanies();
        return response.companies;
      } catch (error) {
        throw error;
      }
    },
  });
};
