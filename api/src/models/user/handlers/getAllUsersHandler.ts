import { RequestHandler } from 'express';
import { addTextCondition } from '../../../utils/queryConditions';
import type { User } from '../../../types/types';
import prisma from '../../../prismaClient';
import paginateData from '../../../utils/pagination';
import { returnError } from '../../../utils/error';

export const getAllUsersHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, firstName, lastName, isActive, companyId, search } = req.query;

    const queryConditions: Record<string, any> = {};

    addTextCondition(queryConditions, 'email', email as string | string[] | undefined);
    addTextCondition(queryConditions, 'firstName', firstName as string | string[] | undefined);
    addTextCondition(queryConditions, 'lastName', lastName as string | string[] | undefined);
    addTextCondition(queryConditions, 'email', email as string | string[] | undefined);

    if (isActive !== undefined) {
      queryConditions.isActive = isActive === 'true';
    }
    if (companyId !== undefined) {
      queryConditions.companyId = Number(companyId);
    }

    if (search) {
      const searchWords = search.toString().trim().split(/\s+/);
      queryConditions.OR = searchWords.flatMap((word) => [
        { email: { contains: word, mode: 'insensitive' } },
        { firstName: { contains: word, mode: 'insensitive' } },
        { lastName: { contains: word, mode: 'insensitive' } },
      ]);
    }

    const limit = parseInt(req.query.limit as string, 10) || 10;
    const page = parseInt(req.query.page as string, 10) || 1;

    let total: number;
    let users: User[];

    // @ts-ignore
    const userId = req.userId;
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { company: true, profile: { include: { role: true } } },
    });

    if (!currentUser) {
      res.status(404).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    if (currentUser && currentUser.profile && currentUser.profile.role) {
      if (currentUser.profile.role.name !== 'ADMIN') {
        const userCompanyId = currentUser.companyId;

        if (userCompanyId === undefined) {
          res.status(404).json({
            success: false,
            message: 'Access denied',
          });
          return;
        }

        queryConditions.companyId = Number(userCompanyId);
      }

      total = await prisma.user.count({
        where: queryConditions,
      });

      users = await prisma.user.findMany({
        where: queryConditions,
        skip: (page - 1) * limit,
        take: limit,
      });

      const paginatedResponse = paginateData(users, limit, page, total);

      res.status(200).json({
        success: true,
        ...paginatedResponse,
        total,
      });
      return;
    }

    res.status(403).json({ success: false, message: 'Access denied' });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
