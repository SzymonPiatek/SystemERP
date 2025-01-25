import '@src/tests/mocks';
import { adminUser, companyData, emptyRequest, testUser } from '@src/tests/data';
import prisma from '@src/prismaClient';
import request from 'supertest';
import app from '@src/app';
import { editCompanyDataHandler } from '@src/models/company/handlers/editCompanyDataHandler';
import { mockedNext, mockedRequest, mockedResponse } from '@src/tests/mocks';

const baseUrl = (id: number) => {
  return `/api/v1/companies/${id}`;
};

describe('editCompanyHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 404 for company not found', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).patch(baseUrl(999999)).set('Authorization', `Bearer mocktoken`).send({ name: 'New name' });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Company not found');
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

  it('Should return 403 - access denied', async () => {
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
    expect(response.body.message).toBe('Access denied');
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

  it('Should allow access if user is not ADMIN but their companyId matches', async () => {
    const mockedUser = testUser;
    const mockedCompany = companyData;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(mockedCompany);

    await editCompanyDataHandler(mockedRequest({ ...emptyRequest, body: { name: 'New name' } }), mockedResponse(), mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
  });

  it('Should return validation error - name already in use', async () => {
    const mockedUser = { ...adminUser, company: companyData, companyId: companyData.id };
    const mockedCompany = { ...companyData, id: 1, name: 'Old name' };
    const newCompany = { ...mockedCompany, id: 2, name: 'Old name' };

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);
    (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(mockedCompany);
    (prisma.company.findFirst as jest.Mock).mockResolvedValue(mockedCompany);
    (prisma.company.update as jest.Mock).mockResolvedValue(newCompany);

    const response = await request(app).patch(baseUrl(mockedCompany.id)).set('Authorization', `Bearer mocktoken`).send({
      name: newCompany.name,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('A company with this name already exists');
  });
});
