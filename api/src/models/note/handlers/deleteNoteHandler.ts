import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';

export const deleteNoteHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const noteId = Number(req.params.id);
    const userId = Number(req.userId);

    const isExist = await prisma.note.findUnique({
      where: { id: noteId, ownerId: userId },
    });

    if (!isExist) {
      res.status(404).json({
        success: false,
        message: 'Note not found',
      });
      return;
    }

    await prisma.note.delete({
      where: { id: noteId },
    });

    res.status(200).json({
      success: true,
      message: 'Note deleted',
    });
    return;
  } catch (error) {
    returnError(res, error);
  }
};