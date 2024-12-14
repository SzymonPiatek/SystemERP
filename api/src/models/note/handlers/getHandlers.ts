import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';
import paginateData from '../../../utils/pagination';

export const getAllNotesHandler: RequestHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const page = parseInt(req.query.page as string, 10) || 1;

    const total = await prisma.note.count();
    const notes = await prisma.note.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    const paginatedResponse = paginateData(notes, limit, page, total);

    res.status(200).json({
      success: true,
      ...paginatedResponse,
      total,
    });
  } catch (error) {
    returnError(res, error);
  }
};

export const getNoteByIdHandler: RequestHandler = async (req, res) => {
  try {
    const note = await prisma.note.findUnique({ where: { id: Number(req.params.id) } });

    if (note) {
      res.status(200).json({ success: true, note });
    } else {
      res.status(404).json({ success: false, message: 'Not Found' });
    }
  } catch (error) {
    returnError(res, error);
  }
};
