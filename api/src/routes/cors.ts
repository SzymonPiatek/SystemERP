import cors from 'cors';

export const getAllowedOrigins = () => {
  const originalAllowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];
  return originalAllowedOrigins.map((origin) => origin.trim());
};
export const corsConfig = cors({
  origin: getAllowedOrigins(),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
});
