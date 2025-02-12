import '@src/tests/mocks';
import request from 'supertest';
import app from '@src/app';
import { testUser, testCompany, adminUser } from '@src/tests/data';
import { compileTemplate } from '@src/models/email/services/transporter';
import prisma from '@src/prismaClient';

const baseUrl = '/api/v1/email/preview';

describe('Email Preview Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return email preview for sendResetPassword template', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (compileTemplate as jest.Mock).mockResolvedValue('<html>Password Reset Email</html>');

    const response = await request(app).get(`${baseUrl}/sendResetPassword`).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.text).toBe('<html>Password Reset Email</html>');
    expect(compileTemplate).toHaveBeenCalledWith('sendResetPassword', {
      subject: 'Password Reset Request',
      user: testUser,
      resetLink: '/',
    });
  });

  it('Should return email preview for inviteUser template', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);
    (compileTemplate as jest.Mock).mockResolvedValue('<html>Invite User Email</html>');

    const response = await request(app).get(`${baseUrl}/inviteUser`).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(200);
    expect(response.text).toBe('<html>Invite User Email</html>');
    expect(compileTemplate).toHaveBeenCalledWith('inviteUser', {
      subject: 'You are invited to company!',
      user: testUser,
      company: testCompany,
      inviteLink: '/',
    });
  });

  it('Should return 400 error if template name is missing', async () => {
    const response = await request(app).get(baseUrl);

    expect(response.status).toBe(404);
  });

  it('Should return 404 error for unknown template', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockedUser);

    const response = await request(app).get(`${baseUrl}/unknown`).set('Authorization', 'Bearer mocktoken');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Template not found');
  });

  it('Should return 400 error if template name is not provided in params', async () => {
    const response = await request(app).get(baseUrl);

    expect(response.status).toBe(404);
  });
});
