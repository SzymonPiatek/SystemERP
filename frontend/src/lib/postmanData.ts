import { API_URL } from '../utils/axiosUtils.ts';
import API from '../utils/apiRoutes.ts';
import { createListCollection } from '@chakra-ui/react';

export const fullApiUrl = `${API_URL}/api/v1`;

export type MethodVariantProps = {
  name: string;
  color: string;
};

export type ResponseElementsProps = {
  displayName: string;
  method: string;
  url: string;
};

export type ResponseListDataProps = {
  [envName: string]: ResponseElementsProps[];
};

export type EnvironmentListDataProps = {
  [envName: string]: Record<string, string>;
};

export const methodVariants: MethodVariantProps[] = [
  { name: 'GET', color: 'green' },
  { name: 'POST', color: 'orange' },
  { name: 'PATCH', color: '#6b03fc' },
  { name: 'DELETE', color: 'red' },
];

export const methodVariantsCollections = createListCollection({
  items: methodVariants,
  itemToString: (item: MethodVariantProps) => item.name,
  itemToValue: (item: MethodVariantProps) => item.name,
});

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
      {
        displayName: 'Get user by id',
        method: 'GET',
        url: `${fullApiUrl}${API.users.all}/1`,
      },
      {
        displayName: 'Edit user data',
        method: 'PATCH',
        url: `${fullApiUrl}${API.users.all}/1`,
      },
      {
        displayName: 'Change user password',
        method: 'PATCH',
        url: `${fullApiUrl}${API.users.all}/1/change_password`,
      },
      {
        displayName: 'Change user isActive',
        method: 'PATCH',
        url: `${fullApiUrl}${API.users.all}/1/change_active`,
      },
    ],
    company: [
      {
        displayName: 'Get all companies',
        method: 'GET',
        url: `${fullApiUrl}${API.companies.all}`,
      },
      {
        displayName: 'Get company by id',
        method: 'GET',
        url: `${fullApiUrl}${API.companies.all}/1`,
      },
      {
        displayName: 'Edit company data',
        method: 'PATCH',
        url: `${fullApiUrl}${API.companies.all}/1`,
      },
    ],
    events: [
      {
        displayName: 'Get all events',
        method: 'GET',
        url: `${fullApiUrl}${API.events.all}`,
      },
      {
        displayName: 'Get event by id',
        method: 'GET',
        url: `${fullApiUrl}${API.events.all}/1`,
      },
    ],
    notes: [
      {
        displayName: 'Get all notes',
        method: 'GET',
        url: `${fullApiUrl}${API.notes.all}`,
      },
      {
        displayName: 'Get note by id',
        method: 'GET',
        url: `${fullApiUrl}${API.notes.all}/1`,
      },
    ],
  },
];

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
