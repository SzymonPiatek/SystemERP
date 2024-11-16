import { RequestHandler } from 'express';

const blockDoubleSlashesMiddleware: RequestHandler = (req, res, next) => {
  if (req.originalUrl.includes('//')) {
    res.status(400).json({ message: 'Malformed URL. Please ensure all parameters are provided correctly.' });
  } else {
    next();
  }
};

export default blockDoubleSlashesMiddleware;
