import { RequestHandler } from 'express';
import Joi from 'joi';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';

const notesSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  date: Joi.date().optional(),
});

export const editNoteHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const userId = Number(req.userId);
    const noteId = Number(req.params.id);

    const { error, value } = notesSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const isExist = await prisma.note.findUnique({
      where: { id: noteId, ownerId: userId },
    });

    if (!isExist) {
      res.status(404).json({ success: false, message: 'Note not found' });
      return;
    }

    const { title, description, date } = value;

    const updatedData: {
      title?: string;
      description?: string;
      date?: Date;
    } = {};

    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (date) updatedData.date = date;

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: updatedData,
    });

    res.status(200).json({ success: true, message: 'Note updated successfully', note: updatedNote });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
