import { Request, Response, NextFunction } from 'express';

const checkUserId = (req: Request, res: Response, next: NextFunction): void => {
  const userId = req.userId;

  if (!userId) {
    res.status(403).json({ success: false, message: 'Access denied' });
    return;
  }

  next();
};

export default checkUserId;
