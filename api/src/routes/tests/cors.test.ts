import express from 'express';
import request from 'supertest';
import { corsConfig } from '@src/routes/cors';

describe('Cors', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(corsConfig);
    app.get('/', (req, res) => {
      res.status(200).send('OK');
    });
  });

  it('should allow requests from allowed origins', async () => {
    await request(app)
      .get('/')
      .set('Origin', 'https://frontend:3000')
      .expect('Access-Control-Allow-Origin', 'https://frontend:3000')
      .expect(200);
  });

  it('should block requests from disallowed origins', async () => {
    await request(app)
      .get('/')
      .set('Origin', 'http://not-allowed.com')
      .expect((res) => {
        expect(res.headers['access-control-allow-origin']).toBeUndefined();
      })
      .expect(200);
  });

  it('should include credentials in the CORS response', async () => {
    await request(app).get('/').set('Origin', 'http://frontend:3000').expect('Access-Control-Allow-Credentials', 'true').expect(200);
  });
});

describe('CORS configuration', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  it('should correctly parse CORS_ORIGINS into an array', () => {
    process.env.CORS_ORIGINS = 'https://frontend:3000,https://example.com';
    const { getAllowedOrigins } = require('@src/routes/cors');
    expect(getAllowedOrigins()).toEqual(['https://frontend:3000', 'https://example.com']);
  });

  it('should handle empty CORS_ORIGINS', () => {
    process.env.CORS_ORIGINS = '';
    const { getAllowedOrigins } = require('@src/routes/cors');
    expect(getAllowedOrigins()).toEqual(['']);
  });

  it('should default to an empty array if CORS_ORIGINS is not set', () => {
    delete process.env.CORS_ORIGINS;
    const { getAllowedOrigins } = require('@src/routes/cors');
    expect(getAllowedOrigins()).toEqual([]);
  });

  it('should trim spaces in CORS_ORIGINS values', () => {
    process.env.CORS_ORIGINS = ' https://frontend:3000 , https://example.com ';
    const { getAllowedOrigins } = require('@src/routes/cors');
    expect(getAllowedOrigins()).toEqual(['https://frontend:3000', 'https://example.com']);
  });
});
