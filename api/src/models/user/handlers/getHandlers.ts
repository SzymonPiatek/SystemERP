import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';
import { excludePassword } from '../services/returnSafeUserData';
import { User } from '../../../types/types';
import { addTextCondition } from '../../../utils/queryConditions';
import paginateData from '../../../utils/pagination';

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

    const total = await prisma.user.count({
      where: queryConditions,
    });
    const users = await prisma.user.findMany({
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
  } catch (error) {
    returnError(res, error);
  }
};

export const getUserByIdHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        profile: {
          include: {
            role: true,
          },
        },
      },
    });

    if (user) {
      const safeData = excludePassword(user);
      res.status(200).json({ success: true, message: 'User found', user: safeData });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    returnError(res, error);
  }
};
