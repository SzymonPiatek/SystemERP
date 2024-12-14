import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';

export const logoutHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({ success: true, message: 'Logout successful' });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
