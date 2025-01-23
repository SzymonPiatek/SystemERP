import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { testUser } from '@src/tests/data';

const baseUrl = (id: number) => {
  return `/api/v1/users/${id}/change_active`;
};

describe('Change user isActive handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`Should toggle the user's isActive status to true`, async () => {
    const mockedUser = {
      ...testUser,
      isActive: false,
    };

    const updatedUser = {
      ...mockedUser,
      isActive: true,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User activated successfully');
    expect(response.body.user).toEqual(expect.objectContaining({ isActive: true }));
  });

  it(`Should toggle the user's isActive status to false`, async () => {
    const mockedUser = {
      ...testUser,
      isActive: true,
    };

    const updatedUser = {
      ...mockedUser,
      isActive: false,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User deactivated successfully');
    expect(response.body.user).toEqual(expect.objectContaining({ isActive: false }));
  });

  it('Should return 404 if user is not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).patch(baseUrl(9999999)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
  });
});
