import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY as string;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY as string;

export const generateAccessToken = (user: any) => {
  return jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};
