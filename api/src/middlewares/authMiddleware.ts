import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, verifyToken } from '../models/auth/services/authService';

if (!ACCESS_TOKEN_SECRET) {
  throw new Error('ACCESS_TOKEN_SECRET is not defined');
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).json({ message: 'Access token not found in cookies' });
    return;
  }

  try {
    const decoded = verifyToken(token, ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token has expired' });
      return;
    }
    res.status(401).json({ message: 'Token is invalid' });
  }
}
