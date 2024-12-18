import { RequestHandler } from 'express';
import prisma from '../../../prismaClient';
import paginateData from '../../../utils/pagination';
import { returnError } from '../../../utils/error';

export const getAllNotesHandler: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.userId);

    const limit = parseInt(req.query.limit as string, 10) || 10;
    const page = parseInt(req.query.page as string, 10) || 1;

    const total = await prisma.note.count({
      where: { ownerId: userId },
    });
    const notes = await prisma.note.findMany({
      where: { ownerId: userId },
      skip: (page - 1) * limit,
      take: limit,
    });

    const paginatedResponse = paginateData(notes, limit, page, total);

    res.status(200).json({
      success: true,
      ...paginatedResponse,
      total,
    });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
