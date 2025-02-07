import '@src/tests/mocks';
import request from 'supertest';
import app from '@src/app';
import prisma from '@src/prismaClient';
import { tokenGenerator } from '@src/models/auth/services/authService';
import { sendEmailWithTemplate } from '@src/models/email/services/transporter';
import { testUser } from '@src/tests/data';

const baseUrl = '/api/v1/users/forgot_password';

describe('Send Reset Password Email', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return an error if body is empty', async () => {
    const response = await request(app).post(baseUrl).send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Request body cannot be empty');
  });

  it('Should return an error if user is not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post(baseUrl).send({ email: 'nonexistent@example.com' });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
  });

  it('Should return an error if email sending fails', async () => {
    const email = testUser.email;
    const token = 'mocked-token';

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(testUser);
    (tokenGenerator as jest.Mock).mockReturnValue(token);
    (sendEmailWithTemplate as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post(baseUrl).send({ email });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Error while sending email');
  });

  it('Should return an error if updating user fails', async () => {
    const email = testUser.email;
    const token = 'mocked-token';

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(testUser);
    (tokenGenerator as jest.Mock).mockReturnValue(token);
    (sendEmailWithTemplate as jest.Mock).mockResolvedValue(true);
    (prisma.user.update as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post(baseUrl).send({ email });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Error while updating user');
  });
});
