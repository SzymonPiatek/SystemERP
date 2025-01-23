import '@src/tests/mocks';
import request from 'supertest';
import prisma from '@src/prismaClient';
import app from '@src/app';

const url = '/api/v1/auth/register';

describe(`POST /auth/register`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if email already exists', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1 });

    const response = await request(app).post(url).send({
      email: 'test@example.com',
      password: 'TestPass123!',
      firstName: 'John',
      lastName: 'Doe',
      roleId: 1,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Email already in use');
  });

  it('should return 400 for invalid email format', async () => {
    const response = await request(app).post(url).send({
      email: 'invalid-email',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      roleId: 1,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"email" must be a valid email');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post(url).send({
      email: 'test@example.com',
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"password" is required');
  });

  it('should return 400 if companyId is invalid', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post(url).send({
      email: 'test@example.com',
      password: 'TestPass123!',
      firstName: 'John',
      lastName: 'Doe',
      roleId: 1,
      companyId: '123',
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid companyId');
  });

  it('should return 400 if roleID is invalid', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.company.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
    (prisma.role.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post(url).send({
      email: 'test@example.com',
      password: 'TestPass123!',
      firstName: 'John',
      lastName: 'Doe',
      companyId: 1,
      roleId: 9999,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid roleId');
  });
});
