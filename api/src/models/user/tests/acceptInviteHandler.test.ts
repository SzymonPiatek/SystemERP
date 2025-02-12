import '@src/tests/mocks';
import request from 'supertest';
import app from '@src/app';
import prisma from '@src/prismaClient';
import { hashPassword } from '@src/modules/authModule';
import { testInvite } from '@src/tests/data';

const baseUrl = '/api/v1/users/accept_invite';

describe('Accept Invitation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should accept invitation and create user successfully', async () => {
    const newPassword = 'SecurePassword123!';
    const hashedPassword = 'hashedSecurePassword';

    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(testInvite);
    (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: 1,
      firstName: testInvite.firstName,
      lastName: testInvite.lastName,
      email: testInvite.email,
      password: hashedPassword,
      isActive: true,
      companyId: testInvite.companyId,
    });
    (prisma.invite.delete as jest.Mock).mockResolvedValue(testInvite);

    const response = await request(app).post(baseUrl).send({ token: 'valid-token', password: newPassword });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Account activated');
  });

  it('Should return an error for invalid or expired token', async () => {
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post(baseUrl).send({ token: 'invalid-token', password: 'SecurePassword123!' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid or expired token');
  });

  it('Should return an error if token is missing', async () => {
    const response = await request(app).post(baseUrl).send({ password: 'SecurePassword123!' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"token" is required');
  });

  it('Should return an error if password is too short', async () => {
    const response = await request(app).post(baseUrl).send({ token: 'valid-token', password: 'short' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"password" length must be at least 8 characters long');
  });
});
