import cors from 'cors';

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

const corsConfig = cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
});

export default corsConfig;
