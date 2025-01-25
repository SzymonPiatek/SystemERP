import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import fs from 'fs/promises';
import { adminUser } from '@src/tests/data';

jest.mock('fs/promises');

const baseUrl = (id: number) => {
  return `/api/v1/users/${id}/profile_pic`;
};

describe('Set profile picture', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 200 and update profile picture successfully', async () => {
    const mockedUser = adminUser;
    const mockedFile = {
      path: '/uploads/mock-file.jpg',
      filename: 'mock-file.jpg',
      mimetype: 'image/jpeg',
    };
    const mockedProfile = {
      id: mockedUser.id,
      userId: mockedUser.id,
      profilePic: {
        filePath: '/uploads/old-file.jpg',
        fileName: 'old-file.jpg',
        fileType: 'image/jpeg',
      },
    };
    const mockedUpdatedProfile = {
      ...mockedProfile,
      profilePic: {
        filePath: mockedFile.path,
        fileName: mockedFile.filename,
        fileType: mockedFile.mimetype,
      },
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.profile.findUnique as jest.Mock).mockResolvedValue(mockedProfile);
    (prisma.profile.update as jest.Mock).mockResolvedValue(mockedUpdatedProfile);

    const response = await request(app)
      .post(baseUrl(mockedUser.id))
      .set('Authorization', `Bearer mocktoken`)
      .attach('file', Buffer.from('mock data'), mockedFile.filename);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Profile picture updated successfully');
    expect(response.body.profile.profilePic.filePath).toBe(mockedFile.path);

    expect(prisma.profile.findUnique).toHaveBeenCalledWith({
      where: { userId: mockedUser.id },
      include: { profilePic: true },
    });

    expect(prisma.profile.update).toHaveBeenCalledWith({
      where: { userId: mockedUser.id },
      data: {
        profilePic: {
          update: {
            filePath: expect.any(String),
            fileName: expect.any(String),
            fileType: mockedFile.mimetype,
          },
          create: {
            filePath: expect.any(String),
            fileName: expect.any(String),
            fileType: mockedFile.mimetype,
          },
        },
      },
      include: { profilePic: true },
    });

    expect(fs.unlink).toHaveBeenCalledWith(expect.stringContaining('/uploads/old-file.jpg'));
  });

  it('Should return 400 if no file is uploaded', async () => {
    const mockedUserId = 1;

    const response = await request(app).post(baseUrl(mockedUserId)).set('Authorization', `Bearer mocktoken`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('No file uploaded');
    expect(prisma.profile.findUnique).not.toHaveBeenCalled();
    expect(prisma.profile.update).not.toHaveBeenCalled();
  });

  it('Should return 404 if profile is not found', async () => {
    const mockedUserId = 1;

    (prisma.profile.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post(baseUrl(mockedUserId))
      .set('Authorization', `Bearer mocktoken`)
      .attach('file', Buffer.from('mock data'), 'mock-file.jpg');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Profile not found');
    expect(prisma.profile.findUnique).toHaveBeenCalledWith({
      where: { userId: mockedUserId },
      include: { profilePic: true },
    });
    expect(prisma.profile.update).not.toHaveBeenCalled();
  });
});
