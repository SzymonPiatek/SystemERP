import { API_URL } from '../utils/axiosUtils.ts';
import API from '../utils/apiRoutes.ts';
import { createListCollection } from '@chakra-ui/react';

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

export const methodVariantsCollections = createListCollection({
  items: methodVariants,
  itemToString: (item) => item.name,
  itemToValue: (item) => item.name,
});

export type ResponseElementsProps = {
  displayName: string;
  method: string;
  url: string;
};

export type ResponseListDataProps = {
  [envName: string]: ResponseElementsProps[];
};

export const fullApiUrl = `${API_URL}/api/v1`;

export const responseList: ResponseListDataProps[] = [
  {
    auth: [
      {
        displayName: 'Register',
        method: 'POST',
        url: `${fullApiUrl}${API.auth.register}`,
      },
      {
        displayName: 'Login',
        method: 'POST',
        url: `${fullApiUrl}${API.auth.login}`,
      },
    ],
    user: [
      {
        displayName: 'Get all users',
        method: 'GET',
        url: `${fullApiUrl}${API.users.all}`,
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
