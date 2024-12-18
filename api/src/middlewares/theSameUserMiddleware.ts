import { RequestHandler } from 'express';

export const checkTheSameUser: RequestHandler = (req, res, next) => {
  if (Number(req.userId) !== Number(req.params.id)) {
    res.status(403).json({ success: false, message: 'Access denied' });
    return;
  }

  next();
};
