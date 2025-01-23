import '@src/tests/mocks';
import { adminUser, companyData, testUser } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';

const baseUrl = (id: number) => {
  return `/api/v1/companies/${id}`;
};

describe('editCompanyHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should edit company data successfully', async () => {
    const mockedUser = { ...adminUser, company: companyData, companyId: companyData.id };
    const mockedCompany = { ...companyData, name: 'Old name' };
    const updatedCompany = { ...mockedCompany, name: 'New name' };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(mockedCompany);
    (prisma.company.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.company.update as jest.Mock).mockResolvedValue(updatedCompany);

    const response = await request(app).patch(baseUrl(mockedCompany.id)).set('Authorization', `Bearer mocktoken`).send({
      name: updatedCompany.name,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Company updated successfully');
    expect(response.body.company).toEqual({
      ...updatedCompany,
      createdAt: updatedCompany.createdAt.toISOString(),
      updatedAt: updatedCompany.updatedAt.toISOString(),
    });
  });

  it('Should return 403 - user not found', async () => {
    const mockedUser = { ...adminUser, company: companyData, companyId: companyData.id };
    const mockedCompany = { ...companyData, name: 'Old name' };
    const updatedCompany = { ...mockedCompany, name: 'New name' };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
    (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(mockedCompany);
    (prisma.company.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.company.update as jest.Mock).mockResolvedValue(updatedCompany);

    const response = await request(app).patch(baseUrl(mockedCompany.id)).set('Authorization', `Bearer mocktoken`).send({
      name: updatedCompany.name,
    });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
  });

  it('Should return validation error', async () => {
    const mockedUser = { ...adminUser, company: companyData, companyId: companyData.id };
    const mockedCompany = { ...companyData, name: 'Old name' };
    const updatedCompany = { ...mockedCompany, name: 123 };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(mockedCompany);
    (prisma.company.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.company.update as jest.Mock).mockResolvedValue(updatedCompany);

    const response = await request(app).patch(baseUrl(mockedCompany.id)).set('Authorization', `Bearer mocktoken`).send({
      name: updatedCompany.name,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"name" must be a string');
  });
});
