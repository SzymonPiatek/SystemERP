import '@src/tests/mocks';
import request from 'supertest';
import app from '@src/app';
import prisma from '@src/prismaClient';
import { sendEmailWithTemplate } from '@src/models/email/services/transporter';
import { adminUser, testCompany, testInvite, testUser } from '@src/tests/data';

const baseUrl = '/api/v1/users/invite';

describe('Invite User', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should successfully send an invitation', async () => {
    const mockedUser = adminUser;
    const mockedCompany = testCompany;

    (prisma.user.findUnique as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(mockedUser))
      .mockImplementationOnce(() => Promise.resolve(mockedUser))
      .mockImplementationOnce(() => Promise.resolve(null));
    (prisma.company.findUnique as jest.Mock).mockResolvedValue(mockedCompany);
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.invite.create as jest.Mock).mockResolvedValue({ email: 'john@example.com' });
    (sendEmailWithTemplate as jest.Mock).mockResolvedValue(true);

    const response = await request(app).post(baseUrl).set('Authorization', `Bearer mockToken`).send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      companyId: mockedCompany.id,
      roleId: 2,
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Invitation sent');
  });

  it('Should return an error if request body is empty', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);

    const response = await request(app).post(baseUrl).set('Authorization', `Bearer mockToken`).send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Request body cannot be empty');
  });

  it('Should return an error if the user is not an admin and tries to invite without a company', async () => {
    const mockedUser = testUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);

    const response = await request(app).post(baseUrl).set('Authorization', `Bearer mockToken`).send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      roleId: 2,
    });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Access denied');
  });

  it('Should return an error if the company does not exist', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.company.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post(baseUrl).set('Authorization', `Bearer mockToken`).send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      companyId: 99,
      roleId: 2,
    });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Company not found');
  });

  it('Should return an error if the email is invalid', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);

    const response = await request(app).post(baseUrl).set('Authorization', `Bearer mockToken`).send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      companyId: 1,
      roleId: 2,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"email" must be a valid email');
  });

  it('Should return an error if the email already exists', async () => {
    const mockedUser = adminUser;
    const existingUser = testUser;
    const mockedCompany = testCompany;

    (prisma.user.findUnique as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(mockedUser))
      .mockImplementationOnce(() => Promise.resolve(mockedUser))
      .mockImplementationOnce(() => Promise.resolve(existingUser));
    (prisma.company.findUnique as jest.Mock).mockResolvedValue(mockedCompany);

    const response = await request(app).post(baseUrl).set('Authorization', `Bearer mockToken`).send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      companyId: 1,
      roleId: 2,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already exists');
  });

  it('Should return error for invite error', async () => {
    const mockedUser = adminUser;
    const mockedCompany = testCompany;

    (prisma.user.findUnique as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(mockedUser))
      .mockImplementationOnce(() => Promise.resolve(mockedUser))
      .mockImplementationOnce(() => Promise.resolve(null));
    (prisma.company.findUnique as jest.Mock).mockResolvedValue(mockedCompany);
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.invite.create as jest.Mock).mockResolvedValue(null);

    const response = await request(app).post(baseUrl).set('Authorization', `Bearer mockToken`).send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      companyId: mockedCompany.id,
      roleId: 2,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Error creating invite');
  });

  it('Should return error for existing invite', async () => {
    const mockedUser = adminUser;
    const mockedCompany = testCompany;
    const mockedInvite = testInvite;

    (prisma.user.findUnique as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(mockedUser))
      .mockImplementationOnce(() => Promise.resolve(mockedUser))
      .mockImplementationOnce(() => Promise.resolve(null));
    (prisma.company.findUnique as jest.Mock).mockResolvedValue(mockedCompany);
    (prisma.invite.findFirst as jest.Mock).mockResolvedValue(mockedInvite);

    const response = await request(app).post(baseUrl).set('Authorization', `Bearer mockToken`).send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      companyId: mockedCompany.id,
      roleId: 2,
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invitation already exists for this email');
  });

  it('Should return error for not existing user', async () => {
    const mockedUser = adminUser;
    const mockedInvite = testInvite;

    (prisma.user.findUnique as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(mockedUser))
      .mockImplementationOnce(() => Promise.resolve(null));

    const response = await request(app)
      .post(baseUrl)
      .set('Authorization', `Bearer mockToken`)
      .send({ ...testInvite, id: undefined });

    console.log(response.body);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Access denied');
  });
});
