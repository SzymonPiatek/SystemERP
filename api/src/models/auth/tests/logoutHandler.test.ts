import '@src/tests/mocks';
import request from 'supertest';
import app from '@src/app';

const url = '/api/v1/auth/logout';

describe('POST /auth/logout', () => {
  it('should clear cookies and respond with success', async () => {
    const response = await request(app).post(url).set('Cookie', ['accessToken=validAccessToken', 'refreshToken=validRefreshToken']);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Logout successful');

    const cookies = response.headers['set-cookie'];
    expect(cookies).toEqual(
      expect.arrayContaining([
        expect.stringContaining('accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'),
        expect.stringContaining('refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'),
      ]),
    );
  });
});
