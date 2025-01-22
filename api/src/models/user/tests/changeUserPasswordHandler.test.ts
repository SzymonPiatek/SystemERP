import '@src/tests/mocks';
import { testUser } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { comparePassword, hashPassword } from '@src/modules/authModule';

const baseUrl = (id: number) => {
  return `/api/v1/users/${id}/change_password`;
};

describe(`Change user's password`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`Should send message - new password must be different`, async () => {
    const oldPassword = 'Testowe123!';
    const hashedOldPassword = await hashPassword(oldPassword);

    const mockedUser = {
      ...testUser,
      isActive: true,
      password: hashedOldPassword,
    };

    const updatedUser = {
      ...mockedUser,
      password: hashedOldPassword,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (comparePassword as jest.Mock).mockResolvedValueOnce(true).mockResolvedValueOnce(true);
    (hashPassword as jest.Mock).mockResolvedValueOnce(hashedOldPassword);
    (prisma.user.update as jest.Mock).mockResolvedValueOnce(updatedUser);

    const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken').send({
      oldPassword: oldPassword,
      newPassword: oldPassword,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('New password must be different');
  });

  it(`Should change the user's password`, async () => {
    const oldPassword = 'Testowe123!';
    const newPassword = 'NoweTestowe123!';
    const hashedOldPassword = await hashPassword(oldPassword);
    const hashedNewPassword = await hashPassword(newPassword);

    const mockedUser = {
      ...testUser,
      isActive: true,
      password: hashedOldPassword,
    };

    const updatedUser = {
      ...mockedUser,
      password: hashedNewPassword,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (comparePassword as jest.Mock).mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    (hashPassword as jest.Mock).mockResolvedValueOnce(hashedNewPassword);
    (prisma.user.update as jest.Mock).mockResolvedValueOnce(updatedUser);

    const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken').send({
      oldPassword: oldPassword,
      newPassword: newPassword,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Password updated successfully');
  });

  it(`Should send message about wrong old password`, async () => {
    const oldPassword = 'Testowe123!';
    const newPassword = 'NoweTestowe123!';
    const hashedOldPassword = await hashPassword(oldPassword);
    const hashedNewPassword = await hashPassword(newPassword);

    const mockedUser = {
      ...testUser,
      isActive: true,
      password: hashedOldPassword,
    };

    const updatedUser = {
      ...mockedUser,
      password: hashedNewPassword,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (comparePassword as jest.Mock).mockResolvedValueOnce(false).mockResolvedValueOnce(false);
    (hashPassword as jest.Mock).mockResolvedValueOnce(hashedNewPassword);
    (prisma.user.update as jest.Mock).mockResolvedValueOnce(updatedUser);

    const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken').send({
      oldPassword: oldPassword,
      newPassword: newPassword,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Wrong password');
  });

  it('Should return 404 if user is not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).patch(baseUrl(9999999)).set('Authorization', 'Bearer mocktoken').send({
      oldPassword: 'Testowe123!',
      newPassword: 'NoweTestowe123!',
    });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
  });
});
