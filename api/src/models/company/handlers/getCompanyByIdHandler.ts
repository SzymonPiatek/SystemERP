import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';

export const getCompanyByIdHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const userId = Number(req.userId);
    const companyId = Number(req.params.id);

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: { include: { role: true } } },
    });

    if (!currentUser) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    } else if (currentUser?.profile?.role.name !== 'ADMIN') {
      if (currentUser.companyId !== companyId) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }
    }

    const company = await prisma.company.findUnique({ where: { id: companyId } });

    if (company) {
      res.status(200).json({ success: true, message: 'Company found', company });
      return;
    } else {
      res.status(404).json({ success: false, message: 'Company not found' });
      return;
    }
  } catch (error) {
    returnError(res, error);
  }
};
