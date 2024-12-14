import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 100,
  message: 'Too many requests from this IP, please try again after 5 minutes',
});

export const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10_000,
  message: 'Too many requests, please try again later.',
});
