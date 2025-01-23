import '@src/tests/mocks';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { adminUser, companyData } from '@src/tests/data';

const baseUrl = (id: number) => {
  return `/api/v1/companies/${id}`;
};

describe(`Get company by id`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('Should return 404 if company is not found', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.company.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(baseUrl(9999999)).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Company not found');
  });
});
