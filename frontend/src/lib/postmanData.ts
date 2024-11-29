import { API_URL } from '../utils/axiosUtils.ts';
import API from '../utils/apiRoutes.ts';

export type MethodVariantProps = {
  name: string;
  color: string;
};

export const methodVariants: MethodVariantProps[] = [
  { name: 'GET', color: 'green' },
  { name: 'POST', color: 'orange' },
  { name: 'PATCH', color: '#6b03fc' },
  { name: 'DELETE', color: 'red' },
];

export type MethodCollectionProps = {
  label: string;
  value: string;
};

export const methodCollection: MethodCollectionProps[] = methodVariants.flatMap((method) => ({
  label: method.name,
  value: method.name,
}));

export type ResponseListDataProps = {
  [envName: string]: {
    displayName: string;
    method: string;
    url: string;
  }[];
};

export const fullApiUrl = `${API_URL}/api/v1`;

export const responseList: ResponseListDataProps[] = [
  {
    auth: [
      {
        displayName: 'Register',
        method: 'POST',
        url: API.auth.register,
      },
      {
        displayName: 'Login',
        method: 'POST',
        url: API.auth.login,
      },
    ],
    user: [
      {
        displayName: 'Get all users',
        method: 'GET',
        url: API.users.all,
      },
    ],
  },
];

export type EnvironmentListDataProps = {
  [envName: string]: Record<string, string>;
};

export const environmentList: EnvironmentListDataProps[] = [
  {
    admin: {
      email: 'admin@example.com',
      password: 'admin123',
    },
  },
  {
    user: {
      email: 'user@example.com',
      password: 'user123',
    },
  },
];
