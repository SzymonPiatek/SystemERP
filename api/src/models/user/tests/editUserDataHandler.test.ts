import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { testUser } from '@src/tests/data';

const baseUrl = (id: number) => {
  return `/api/v1/users/${id}`;
};

describe(`Change user's data`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 400 for not unique email', async () => {
    const mockedUser = {
      ...testUser,
      email: 'test@email.com',
    };

    const existingUser = {
      ...testUser,
      id: 2,
      email: 'example@email.com',
    };

    (prisma.user.findUnique as jest.Mock).mockImplementation(async ({ where: { id, email } }) => {
      if (id === mockedUser.id) return mockedUser;
      if (email === existingUser.email) return existingUser;
      return null;
    });

    const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken').send({
      email: existingUser.email,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Email must be unique');
  });

  it('Should return 400 for validation error', async () => {
    const mockedUser = {
      ...testUser,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);

    const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken').send({
      firstName: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"firstName" must be a string');
  });

  it('Should return 404 if user is not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).patch(baseUrl(9999999)).set('Authorization', 'Bearer mocktoken').send({
      firstName: 'Person',
    });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
  });

  it(`Should change user's data`, async () => {
    const mockedUser = {
      ...testUser,
      id: 1,
      firstName: 'Test',
      email: 'test@email.com',
    };

    const updatedUser = {
      ...mockedUser,
      firstName: 'User',
    };

    (prisma.user.findUnique as jest.Mock).mockImplementation(async ({ where: { id } }) => {
      if (id === mockedUser.id) return mockedUser;
      return null;
    });

    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const response = await request(app).patch(baseUrl(mockedUser.id)).set('Authorization', 'Bearer mocktoken').send({
      firstName: 'User',
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User updated successfully');
    expect(response.body.user).toEqual(expect.objectContaining({ firstName: 'User' }));
  });
});
