import '@src/tests/mocks';
import request from 'supertest';
import app from '@src/app';
import prisma from '@src/prismaClient';
import { verifyToken } from '@src/models/auth/services/authService';
import { hashPassword } from '@src/modules/authModule';
import { testUser } from '@src/tests/data';

const baseUrl = '/api/v1/users/change_forgotten_password';

describe('Reset forgotten password', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should reset password successfully', async () => {
    const newPassword = 'NewPassword123!';
    const hashedPassword = 'hashedNewPassword';

    (verifyToken as jest.Mock).mockReturnValue({ ...testUser });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      ...testUser,
      isPasswordResetting: true,
    });
    (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
    (prisma.user.update as jest.Mock).mockResolvedValue({
      ...testUser,
      password: hashedPassword,
      isPasswordResetting: false,
    });

    const response = await request(app).patch(baseUrl).send({ token: 'valid-token', newPassword });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Password successfully reset');
  });

  it('Should return an error for invalid or expired token', async () => {
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid or expired token');
    });

    const response = await request(app).patch(baseUrl).send({ token: 'invalid-token', newPassword: 'NewPassword123!' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid or expired token');
  });

  it('Should return an error if token is missing', async () => {
    const response = await request(app).patch(baseUrl).send({ newPassword: 'NewPassword123!' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"token" is required');
  });

  it('Should return an error if password is too short', async () => {
    const response = await request(app).patch(baseUrl).send({ token: 'valid-token', newPassword: 'short' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"newPassword" length must be at least 8 characters long');
  });

  it('Should return an error if user does not exist', async () => {
    (verifyToken as jest.Mock).mockReturnValue({ id: 999 });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).patch(baseUrl).send({ token: 'valid-token', newPassword: 'NewPassword123!' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
  });

  it('Should return an error if user is not allowed to reset password', async () => {
    (verifyToken as jest.Mock).mockReturnValue({ id: testUser.id });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      ...testUser,
      isPasswordResetting: false,
    });

    const response = await request(app).patch(baseUrl).send({ token: 'valid-token', newPassword: 'NewPassword123!' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Access denied');
  });

  it('Should return an error if updating password fails', async () => {
    const newPassword = 'NewPassword123!';
    const hashedPassword = 'hashedNewPassword';

    (verifyToken as jest.Mock).mockReturnValue({ id: testUser.id });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      ...testUser,
      isPasswordResetting: true,
    });
    (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
    (prisma.user.update as jest.Mock).mockResolvedValue(null);

    const response = await request(app).patch(baseUrl).send({ token: 'valid-token', newPassword });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Error while updating password');
  });
});
