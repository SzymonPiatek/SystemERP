import { API_URL } from '../utils/axiosUtils.ts';

export type MethodVariantProps = {
  name: string;
  color: string;
};

export const methodVariants: MethodVariantProps[] = [
  { name: 'GET', color: 'green.700' },
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
  tag: string;
  displayName: string;
  method: string;
  url: string;
};

export const fullApiUrl = `${API_URL}/api/v1`;

export const responseList: ResponseListDataProps[] = [
  {
    tag: 'Auth',
    displayName: 'Register',
    method: 'POST',
    url: `${fullApiUrl}/auth/register`,
  },
  { tag: 'Auth', displayName: 'Login', method: 'POST', url: `${fullApiUrl}/auth/login` },

  { tag: 'User', displayName: 'Get users', method: 'GET', url: `${fullApiUrl}/users` },
  { tag: 'User', displayName: 'Get user', method: 'GET', url: `${fullApiUrl}/users/:id` },

  { tag: 'Company', displayName: 'Get companies', method: 'GET', url: `${fullApiUrl}/companies` },
  { tag: 'Company', displayName: 'Get company', method: 'GET', url: `${fullApiUrl}/companies/:id` },
  { tag: 'Company', displayName: 'Add company', method: 'POST', url: `${fullApiUrl}/companies` },
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
