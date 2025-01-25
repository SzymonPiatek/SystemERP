import '@src/tests/mocks';
import { generateAndSetTokens } from '@src/models/auth/services/authService';
import prisma from '@src/prismaClient';
import { comparePassword } from '@src/modules/authModule';
import request from 'supertest';
import app from '@src/app';
import { adminUser } from '@src/tests/data';
import { excludePassword } from '@src/models/user/services/returnSafeUserData';

const baseUrl = '/api/v1/auth/login';

describe(`POST /auth/login`, () => {
  it('should login successfully with valid credentials', async () => {
    const mockedUser = adminUser;
    const safeMockedUser = excludePassword(mockedUser);
    const finalSafeMockedUser = {
      ...safeMockedUser,
      createdAt: safeMockedUser.createdAt.toISOString(),
      updatedAt: safeMockedUser.updatedAt.toISOString(),
      profile: { ...safeMockedUser.profile, profilePicBase64: null },
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (generateAndSetTokens as jest.Mock).mockResolvedValue(true);

    const response = await request(app).post(baseUrl).send({
      email: mockedUser.email,
      password: mockedUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.user).toEqual(finalSafeMockedUser);
  });

  it('should return 401 for invalid password', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (comparePassword as jest.Mock).mockResolvedValue(false);

    const response = await request(app).post(baseUrl).send({
      email: mockedUser.email,
      password: mockedUser.password,
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid email or password');
  });

  it('should return 400 for invalid email format', async () => {
    const response = await request(app).post(baseUrl).send({
      email: 'not-an-email',
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"email" must be a valid email');
  });

  it('should return 401 for not active account', async () => {
    const mockedUser = { ...adminUser, isActive: false };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (generateAndSetTokens as jest.Mock).mockResolvedValue(true);

    const response = await request(app).post(baseUrl).send({
      email: mockedUser.email,
      password: mockedUser.password,
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid email or password');
  });
});
