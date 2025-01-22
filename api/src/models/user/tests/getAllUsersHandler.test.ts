import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { adminUser, testCompany, testUser } from '@src/tests/data';
import { excludePassword } from '@src/models/user/services/returnSafeUserData';

const baseUrl = `/api/v1/users/`;

describe(`Get all users`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return paginated users for an admin', async () => {
    const mockAdmin = { ...adminUser, id: 1 };
    const mockUsers = [
      { ...testUser, id: 11, email: 'email1@test.pl' },
      { ...testUser, id: 12, email: 'email2@test.pl' },
    ];
    const mockSafeUsers = mockUsers.map((user) => ({
      ...excludePassword(user),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockAdmin);
    (prisma.user.count as jest.Mock).mockResolvedValue(mockUsers.length);
    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const response = await request(app).get(baseUrl).set('Authorization', 'Bearer mocktoken').query({ page: 1, limit: 2 });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockAdmin.id },
      include: { company: true, profile: { include: { role: true } } },
    });

    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 0,
        take: 2,
      }),
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.total).toBe(mockUsers.length);
    expect(response.body.data).toEqual(mockSafeUsers);
  });

  it('Should return paginated users for a manager', async () => {
    const mockUser = {
      ...testUser,
      id: 1,
      companyId: 1,
      profile: {
        ...testUser.profile,
        role: { name: 'MANAGER' },
      },
    };
    const mockUsers = [
      { ...testUser, id: 11, email: 'email1@test.pl', companyId: 1 },
      { ...testUser, id: 12, email: 'email2@test.pl', companyId: 1 },
    ];
    const mockSafeUsers = mockUsers.map((user) => ({
      ...excludePassword(user),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.count as jest.Mock).mockResolvedValue(mockUsers.length);
    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const response = await request(app).get(baseUrl).set('Authorization', 'Bearer mocktoken').query({ page: 1, limit: 2 });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      include: { company: true, profile: { include: { role: true } } },
    });

    expect(prisma.user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          companyId: mockUser.companyId,
        }),
        skip: 0,
        take: 2,
      }),
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.total).toBe(mockUsers.length);
    expect(response.body.data).toEqual(mockSafeUsers);
  });

  it('Should return access denied for normal user', async () => {
    const mockUser = {
      ...testUser,
      id: 1,
      companyId: testCompany.id,
      company: testCompany,
      profile: {
        ...testUser.profile,
        role: { name: 'USER' },
      },
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.findMany as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(baseUrl).set('Authorization', 'Bearer mocktoken').query({ page: 1, limit: 2 });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      include: { profile: { include: { role: true } } },
    });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Access denied');
  });

  it('Should return access denied for manager without company', async () => {
    const mockUser = {
      ...testUser,
      id: 1,
      companyId: null,
      company: null,
      profile: {
        ...testUser.profile,
        role: { name: 'MANAGER' },
      },
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (prisma.user.findMany as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(baseUrl).set('Authorization', 'Bearer mocktoken').query({ page: 1, limit: 2 });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      include: { profile: { include: { role: true } } },
    });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual('Access denied');
  });
});
