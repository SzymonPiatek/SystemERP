import '@src/tests/mocks';
import request from 'supertest';
import app from '@src/app';
import { refreshAccessToken } from '@src/models/auth/services/authService';
import logger from '@src/config/logger';

const url = '/api/v1/auth/token/refresh';

describe('POST /auth/refresh', () => {
  it('should return 400 if tokens are missing', async () => {
    const response = await request(app).post(url);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Tokens required');
  });

  it('should return 401 if token refresh fails', async () => {
    (refreshAccessToken as jest.Mock).mockReturnValue(null);

    const response = await request(app).post(url).query({ refreshToken: 'invalidRefreshToken', accessToken: 'invalidAccessToken' });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Failed to refresh access token');
  });

  it('should refresh tokens successfully', async () => {
    (refreshAccessToken as jest.Mock).mockReturnValue({
      accessToken: 'newAccessToken',
    });

    const response = await request(app).post(url).query({ refreshToken: 'validRefreshToken', accessToken: 'validAccessToken' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Tokens refreshed');

    const cookies = Array.isArray(response.headers['set-cookie'])
      ? response.headers['set-cookie']
      : [response.headers['set-cookie']].filter(Boolean);

    const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('accessToken=newAccessToken'));
    expect(accessTokenCookie).toBe('accessToken=newAccessToken; Path=/; HttpOnly; SameSite=Strict');
  });
});
