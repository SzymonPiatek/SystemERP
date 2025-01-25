import { Request, Response, NextFunction } from 'express';

const checkEmptyBody = (req: Request, res: Response, next: NextFunction): void => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ success: false, message: 'Request body cannot be empty' });
    return;
  }
  next();
};

export default checkEmptyBody;
