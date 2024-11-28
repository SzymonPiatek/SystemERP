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
  displayName: string;
  method: string;
  url: string;
};

export const responseList: ResponseListDataProps[] = [
  { displayName: 'Get users', method: 'GET', url: 'http://localhost/api/v1/users' },
  { displayName: 'Login', method: 'PATCH', url: 'http://localhost/api/v1/auth/login' },
];
