import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../../types/types';
import logger from '../../../config/logger';
import { Response } from 'express';

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
export const ACCESS_TOKEN_EXPIRY = parseInt(process.env.ACCESS_TOKEN_EXPIRY as string, 10);
export const REFRESH_TOKEN_EXPIRY = parseInt(process.env.REFRESH_TOKEN_EXPIRY as string, 10);

export const generateAndSetTokens = async (res: Response, user: User) => {
  try {
    const accessToken = tokenGenerator({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY);
    const refreshToken = tokenGenerator({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    logger.info('Tokens generated and set in cookies');

    return { accessToken, refreshToken };
  } catch (error) {
    logger.error('Error generating or setting tokens', {
      userId: user.id,
      email: user.email,
      error: (error as Error).message,
    });
    throw error;
  }
};

export const verifyToken = (token: string, tokenSecret: string) => {
  try {
    const payload = jwt.verify(token, tokenSecret) as JwtPayload;
    delete payload.exp;
    return payload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { error: 'Token expired' };
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return { error: 'Token verification failed JsonWebTokenError' };
    }
    return { error: 'General token verification error' };
  }
};

export const tokenGenerator = (user: object, tokenSecret: string, expiryTime: number) => {
  return jwt.sign(user, tokenSecret, { expiresIn: expiryTime });
};

export const refreshAccessToken = async (refreshToken: string) => {
  const result = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);
  if (!result || result.error) {
    return { error: result ? result.error : 'Invalid token' };
  }
  const newPayload = {
    ...result,
    iat: Math.floor(Date.now() / 1000),
  };

  try {
    const newAccessToken = tokenGenerator(newPayload, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY);

    return { accessToken: newAccessToken };
  } catch (error) {
    return { error: 'Token generation failed' };
  }
};
