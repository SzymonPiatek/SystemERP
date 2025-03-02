import { useQuery } from '@tanstack/react-query';
import type { CompaniesResponse, Company } from '../../utils/types';
import { AxiosError } from 'axios';
import { getCompanies } from '../../actions/companiesActions';

export const useCompanies = () => {
  return useQuery<CompaniesResponse, AxiosError>({
    queryKey: ['allCompanies'],
    queryFn: async () => {
      try {
        const response = await getCompanies();
        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};
