import { AxiosError } from 'axios';
import axiosAuth from './axiosUtils';
import { ErrorResponse } from './types.ts';

type AxiosFetchProps = {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  url: string;
  data?: any;
  params?: Record<string, any>;
};

const axiosFetch = async <T>({
  method = 'get',
  url,
  data,
  params,
}: AxiosFetchProps): Promise<T> => {
  try {
    const response = await axiosAuth[method](url, method === 'get' ? { params } : data);
    return response.data as T;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const errorResponse = axiosError.response.data as ErrorResponse;

      console.log('Error: ', errorResponse);
    } else {
      console.log('Error: ', error);
    }
    throw axiosError;
  }
};

export default axiosFetch;
