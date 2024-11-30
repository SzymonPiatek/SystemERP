import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';

export const getAllNotesHandler: RequestHandler = async (req, res) => {
  try {
    const notes = await prisma.notes.findMany();
    const countNotes = notes.length;

    res.status(200).json({ success: true, count: countNotes, notes });
  } catch (error) {
    returnError(res, error);
  }
};

export const getNotesByIdHandler: RequestHandler = async (req, res) => {
  try {
    const notes = await prisma.notes.findUnique({ where: { id: Number(req.params.id) } });

    if (notes) {
      res.status(200).json({ success: true, notes });
    } else {
      res.status(404).json({ success: false, message: 'Not Found' });
    }
  } catch (error) {
    returnError(res, error);
  }
};
