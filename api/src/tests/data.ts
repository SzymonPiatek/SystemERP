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
  isActive: true,
  createdAt: new Date('2025-01-22T13:36:35.561Z'),
  updatedAt: new Date('2025-01-22T13:36:35.561Z'),
};
