import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { adminUser, companyData } from '@src/tests/data';

const baseUrl = '/api/v1/companies';

describe('getAllCompaniesHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return paginated companies', async () => {
    const mockedUser = adminUser;
    const mockedCompanies = [
      { ...companyData, id: 1, createdAt: companyData.createdAt.toISOString(), updatedAt: companyData.updatedAt.toISOString() },
      { ...companyData, id: 2, createdAt: companyData.createdAt.toISOString(), updatedAt: companyData.updatedAt.toISOString() },
    ];

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.company.count as jest.Mock).mockResolvedValueOnce(mockedCompanies.length);
    (prisma.company.findMany as jest.Mock).mockResolvedValue(mockedCompanies);

    const response = await request(app).get(baseUrl).set('Authorization', `Bearer mocktoken`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.total).toEqual(mockedCompanies.length);
    expect(response.body.data).toEqual(mockedCompanies);
  });
});
