import { returnError } from '../utils/error';
import { Response, Request, NextFunction } from 'express';
import prisma from '../prismaClient';

export const authorizeRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // @ts-ignore
      const userId = req.userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: { include: { role: true } } },
      });

      if (!user) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }

      const userRole = user.profile?.role?.name;

      if (!userRole || !allowedRoles.includes(userRole)) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }

      next();
    } catch (error) {
      returnError(res, error);
    }
  };
};
