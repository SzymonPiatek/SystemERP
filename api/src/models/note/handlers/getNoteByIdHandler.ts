import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';

export const getNoteByIdHandler: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.userId);
    const noteId = Number(req.params.id);

    if (!userId) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    const note = await prisma.note.findUnique({ where: { id: noteId, ownerId: userId } });

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
