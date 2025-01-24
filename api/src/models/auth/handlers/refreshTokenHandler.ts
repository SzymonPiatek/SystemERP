import { RequestHandler } from 'express';
import { refreshAccessToken } from '../services/authService';
import { returnError } from '@src/utils/error';

export const refreshTokensHandler: RequestHandler = async (req, res): Promise<void> => {
  const { refreshToken, accessToken } = req.query;

  try {
    if (!refreshToken || !accessToken) {
      res.status(400).json({ success: false, message: 'Tokens required' });
      return;
    }

    const tokenResponse = refreshAccessToken(String(refreshToken));
    if (!tokenResponse) {
      res.status(401).json({ success: false, message: 'Failed to refresh access token' });
      return;
    }

    // @ts-ignore
    res.cookie('accessToken', tokenResponse.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({ success: true, message: 'Tokens refreshed' });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
