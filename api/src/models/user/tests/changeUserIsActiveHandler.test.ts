import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = (id: number) => {
  return `/api/v1/users/${id}/change_active`;
};

const testUser = {
  id: 1,
  firstName: 'Test',
  lastName: 'Testowy',
  email: 'test@test.com',
  password: 'Testowe123!',
  profile: {
    role: {
      name: 'ADMIN',
    },
  },
  isActive: true,
};

describe('Change user isActive handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('', () => {
    it(`Should toggle the user's isActive status to true`, async () => {
      const mockedUser = {
        ...testUser,
        id: 1,
        isActive: false,
      };

      const updatedUser = {
        ...mockedUser,
        isActive: true,
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
      (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User activated successfully');
      expect(response.body.user).toEqual(expect.objectContaining({ isActive: true }));
    });
  });

  it(`Should toggle the user's isActive status to false`, async () => {
    const mockedUser = {
      ...testUser,
      id: 1,
      isActive: true,
    };

    const updatedUser = {
      ...mockedUser,
      isActive: false,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User deactivated successfully');
    expect(response.body.user).toEqual(expect.objectContaining({ isActive: false }));
  });
});
