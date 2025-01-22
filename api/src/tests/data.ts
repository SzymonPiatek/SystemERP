export const testCompany = {
  id: 1,
  name: 'Test Company',
  country: 'Poland',
  voivodeship: 'Mazowieckie',
  district: 'Warszawa',
  commune: 'Warszawa',
  city: 'Warszawa',
  zipCode: '01-234',
  street: 'warszawska',
  houseNumber: '5',
  apartmentNumber: '2',
  nip: '1234567890',
  regon: '1234567890',
  users: [],
  createdAt: new Date('2025-01-22T13:36:35.561Z'),
  updatedAt: new Date('2025-01-22T13:36:35.561Z'),
};

export const testUser = {
  id: 1,
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'Testowe123!',
  profile: {
    id: 1,
    roleId: 1,
    userId: 1,
    role: {
      id: 1,
      name: 'USER',
    },
  },
  company: null,
  companyId: null,
  isActive: true,
  createdAt: new Date('2025-01-22T13:36:35.561Z'),
  updatedAt: new Date('2025-01-22T13:36:35.561Z'),
};

export const adminUser = {
  id: 2,
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@test.com',
  password: 'Testowe123!',
  profile: {
    id: 2,
    roleId: 2,
    userId: 2,
    role: {
      id: 2,
      name: 'ADMIN',
    },
  },
  company: null,
  companyId: null,
  isActive: true,
  createdAt: new Date('2025-01-22T13:36:35.561Z'),
  updatedAt: new Date('2025-01-22T13:36:35.561Z'),
};

export const emptyRequest = {
  body: {},
  params: {},
  userId: undefined,
  cookies: {},
  headers: {},
};
