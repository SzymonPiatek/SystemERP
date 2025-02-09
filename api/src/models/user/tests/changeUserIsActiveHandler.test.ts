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
      id: 1,
      isActive: true,
    };

    const secondUser = {
      ...testUser,
      id: 2,
      isActive: false,
    };

    const updatedUser = {
      ...secondUser,
      isActive: true,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(secondUser);
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const response = await request(app).patch(baseUrl(secondUser.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User activated successfully');
    expect(response.body.user).toEqual(expect.objectContaining({ isActive: true }));
  });

  it(`Should toggle the user's isActive status to false`, async () => {
    const mockedUser = {
      ...testUser,
      id: 1,
      isActive: true,
    };

    const secondUser = {
      ...testUser,
      id: 2,
      isActive: true,
    };

    const updatedUser = {
      ...secondUser,
      isActive: false,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(secondUser);
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const response = await request(app).patch(baseUrl(secondUser.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User deactivated successfully');
    expect(response.body.user).toEqual(expect.objectContaining({ isActive: false }));
  });

  it(`Should throw error for the same user`, async () => {
    const mockedUser = {
      ...testUser,
      id: 1,
      isActive: true,
    };

    const updatedUser = {
      ...mockedUser,
      isActive: true,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('You cannot change your own status');
  });
});
