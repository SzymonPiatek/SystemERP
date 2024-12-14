import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';
import paginateData from '../../../utils/pagination';

export const getAllNotesHandler: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    const limit = parseInt(req.query.limit as string, 10) || 10;
    const page = parseInt(req.query.page as string, 10) || 1;

    const total = await prisma.note.count({
      where: { ownerId: Number(userId) },
    });
    const notes = await prisma.note.findMany({
      where: { ownerId: Number(userId) },
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

export const getNoteByIdHandler: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    const note = await prisma.note.findUnique({ where: { id: Number(req.params.id), ownerId: Number(userId) } });

    if (note) {
      res.status(200).json({ success: true, note });
      return;
    } else {
      res.status(404).json({ success: false, message: 'Not Found' });
      return;
    }
  } catch (error) {
    returnError(res, error);
  }
};
