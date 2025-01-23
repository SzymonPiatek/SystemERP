import '@src/tests/mocks';
import { adminUser, companyData } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = '/api/v1/companies';

describe('CreateCompanyHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should create company', async () => {
    const mockedUser = adminUser;

    const companyDataBefore = {
      ...companyData,
      id: undefined,
    };

    const mockedCompany = {
      ...companyDataBefore,
      id: 1,
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.company.findFirst as jest.Mock).mockResolvedValueOnce(null);
    (prisma.company.create as jest.Mock).mockResolvedValueOnce(mockedCompany);

    const response = await request(app).post(baseUrl).set('Authorization', 'Bearer mocktoken').send(companyDataBefore);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Company created');
    expect(response.body.company).toEqual(mockedCompany);
  });
});
