import express from 'express';
import request from 'supertest';
import corsConfig from '@src/routes/cors';

describe('CORS Middleware', () => {
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
