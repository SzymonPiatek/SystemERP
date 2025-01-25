import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';

export const getNoteByIdHandler: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.userId);
    const noteId = Number(req.params.id);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    const note = await prisma.note.findUnique({ where: { id: noteId, ownerId: userId } });

    if (note) {
      res.status(200).json({ success: true, note });
      return;
    } else {
      res.status(404).json({ success: false, message: 'Note not found' });
      return;
    }
  } catch (error) {
    returnError(res, error);
  }
};
