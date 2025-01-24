import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { adminUser, companyData, testUser } from '@src/tests/data';

const baseUrl = (id: number) => {
  return `/api/v1/companies/${id}`;
};

describe(`Get company by id`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('First', () => {
    it('Should return 404 if company is not found', async () => {
      const mockedUser = adminUser;

      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
      (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(null);

      const response = await request(app).get(baseUrl(9999999)).set('Authorization', 'Bearer mocktoken');
      console.log(response.body);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Company not found');
    });
  });

  describe('Second', () => {
    it('Should return 403 if currentUser.role != ADMIN and currentUser.companyId != companyId', async () => {
      const mockedUser = {
        ...testUser,
        profile: { role: { name: 'USER' } },
        companyId: 1,
      };

      const mockedCompany = { ...companyData, id: 2 };

      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);

      (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(mockedCompany);

      const response = await request(app).get(baseUrl(2)).set('Authorization', 'Bearer mocktoken');

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Access denied');
    });
  });

  describe('Third', () => {
    it('Should return 200 if company found', async () => {
      const mockedUser = adminUser;
      const mockedCompany = companyData;

      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
      (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
      (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(mockedCompany);

      const response = await request(app).get(baseUrl(mockedCompany.id)).set('Authorization', `Bearer mocktoken`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Company found');
    });
  });
});
