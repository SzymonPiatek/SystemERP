import { RequestHandler } from 'express';
import Joi from 'joi';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';

const notesSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  date: Joi.date().optional(),
});

export const editNoteHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { error, value } = notesSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const userId = req.userId;

    if (!userId) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    const id = req.params.id;

    const isExist = await prisma.note.findUnique({
      where: { id: Number(id), ownerId: Number(userId) },
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
      where: { id: Number(id) },
      data: updatedData,
    });

    res.status(200).json({ success: true, message: 'Note updated successfully', note: updatedNote });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
