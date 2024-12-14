import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import Joi from 'joi';
import prisma from '../../../prismaClient';

const notesSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().optional(),
  ownerId: Joi.number().required(),
});

export const postNoteHandler: RequestHandler = async (req, res) => {
  try {
    const { error, value } = notesSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { title, description, date, ownerId } = value;

    const userExists = await prisma.user.findUnique({
      where: { id: ownerId },
    });

    if (!userExists) {
      res.status(404).json({ success: false, message: 'Owner not found' });
      return;
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        description,
        date,
        ownerId,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Note created',
      note: newNote,
    });
  } catch (error) {
    returnError(res, error);
  }
};
