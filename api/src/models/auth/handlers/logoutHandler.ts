import { RequestHandler } from 'express';
import logger from '../../../config/logger';

export const logoutHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({ success: true, message: 'Logout successful' });
    return;
  } catch (error) {
    const err = error as Error;
    logger.error('Error during logout', err.message);
    res.status(500).json({ success: false, message: err.message });
    return;
  }
};
