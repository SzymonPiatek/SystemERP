import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { testUser } from '@src/tests/data';

const baseUrl = (id: number) => {
  return `/api/v1/users/${id}`;
};

describe(`Get user by id`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 200 if user found', async () => {
    const mockedUser = {
      ...testUser,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    const response = await request(app).get(baseUrl(mockedUser.id)).set('Authorization', `Bearer mocktoken`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User found');
  });

  it('Should return 404 if user is not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    const response = await request(app).get(baseUrl(9999999)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
  });
});
