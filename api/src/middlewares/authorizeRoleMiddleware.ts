import { returnError } from '../utils/error';
import { Response, Request, NextFunction } from 'express';
import prisma from '../prismaClient';

export const authorizeRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.userId);

      if (!userId) {
        res.status(403).json({
          success: false,
          message: 'Access denied',
        });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: { include: { role: true } } },
      });

      if (!user) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }

      const userRole = user.profile?.role?.name;
      req.userRoleName = userRole;

      if (!allowedRoles.includes('*')) {
        if (!userRole || !allowedRoles.includes(userRole)) {
          res.status(403).json({ success: false, message: 'Access denied' });
          return;
        }
      }

      next();
    } catch (error) {
      returnError(res, error);
    }
  };
};
