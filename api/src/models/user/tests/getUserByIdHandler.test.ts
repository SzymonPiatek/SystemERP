import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { adminUser, testUser } from '@src/tests/data';
import { excludePassword } from '@src/models/user/services/returnSafeUserData';
import fs from 'fs/promises';

const baseUrl = (id: number) => {
  return `/api/v1/users/${id}`;
};

jest.mock('fs/promises');

describe(`Get user by id`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 200 and handle error when reading profile picture', async () => {
    const mockedUser = {
      ...testUser,
      profile: {
        profilePic: {
          filePath: '/uploads/mock-profile-pic.jpg',
          fileType: 'image/jpeg',
        },
      },
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('Failed to read file'));

    const response = await request(app).get(baseUrl(mockedUser.id)).set('Authorization', `Bearer mocktoken`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User found');
    expect(response.body.user.profile.profilePicBase64).toBeNull();
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockedUser.id },
      include: {
        profile: {
          include: {
            role: true,
            profilePic: true,
          },
        },
      },
    });
    expect(fs.readFile).toHaveBeenCalledWith('/uploads/mock-profile-pic.jpg');
  });

  it('Should return 200 if user found', async () => {
    const mockedUser = adminUser;
    const safeMockedUser = excludePassword(mockedUser);
    const finalSafeMockedUser = {
      ...safeMockedUser,
      createdAt: safeMockedUser.createdAt.toISOString(),
      updatedAt: safeMockedUser.updatedAt.toISOString(),
      profile: { ...safeMockedUser.profile, profilePicBase64: null },
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    const response = await request(app).get(baseUrl(mockedUser.id)).set('Authorization', `Bearer mocktoken`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User found');
    expect(response.body.user).toEqual(finalSafeMockedUser);
  });
});
