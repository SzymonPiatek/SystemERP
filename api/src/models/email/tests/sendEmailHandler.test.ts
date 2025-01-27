import '@src/tests/mocks';
import request from 'supertest';
import app from '@src/app';
import { adminUser } from '@src/tests/data';
import prisma from '@src/prismaClient';
import { sendEmail } from '@src/models/email/services/transporter';

const baseUrl = '/api/v1/email';

describe('sendEmailHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if validation fails (missing required fields)', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);

    const response = await request(app).post(baseUrl).set('Authorization', 'Bearer mocktoken').send({
      subject: 'Test Subject',
      text: 'Test message body',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: '"to" is required',
    });
  });

  it('should return 400 if "to" field is not a valid email', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);

    const response = await request(app).post(baseUrl).set('Authorization', 'Bearer mocktoken').send({
      to: 'invalid-email',
      subject: 'Test Subject',
      text: 'Test message body',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: '"to" must be a valid email',
    });
  });

  it('should return 200 and send email if input is valid', async () => {
    const mockedUser = adminUser;

    (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(mockedUser);

    (sendEmail as jest.Mock).mockResolvedValueOnce({
      accepted: ['test@example.com'],
      messageId: '12345',
    });

    const response = await request(app).post(baseUrl).set('Authorization', 'Bearer mocktoken').send({
      to: 'test@example.com',
      subject: 'Test Subject',
      text: 'Test message body',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Email was sent',
      email: {
        accepted: ['test@example.com'],
        messageId: '12345',
      },
    });
    expect(sendEmail).toHaveBeenCalledWith('test@example.com', 'Test Subject', 'Test message body');
  });
});
