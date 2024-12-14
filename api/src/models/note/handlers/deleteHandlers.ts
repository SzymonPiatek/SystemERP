import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';

export const deleteNoteHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.status(400).json({
        success: false,
        message: 'Invalid or missing note ID',
      });
      return;
    }

    const noteId = Number(id);

    const isExist = await prisma.note.findUnique({
      where: { id: noteId },
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
  } catch (error) {
    returnError(res, error);
  }
};
