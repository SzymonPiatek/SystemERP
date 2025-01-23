import { RequestHandler } from 'express';

export const validateIdParam: RequestHandler = (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ success: false, message: 'Invalid ID' });
    return;
  }

  next();
};
