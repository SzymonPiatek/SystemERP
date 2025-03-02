import axiosFetch from '../utils/axiosFetch';
import API from '../utils/apiRoutes';
import type { CompaniesResponse, QueryParamsProps } from '../utils/types';

export const getCompanies = async (params?: QueryParamsProps) => {
  return axiosFetch<CompaniesResponse>({ url: API.companies.all, params });
};
