import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import Joi from 'joi';
import prisma from '../../../prismaClient';

const notesSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  isActive: Joi.boolean().required(),
});

export const postNotesHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { error, value } = notesSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { title, description, isActive } = value;

    const newNotes = await prisma.notes.create({
      data: {
        title,
        description,
        isActive,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Note created',
      notes: newNotes,
    });
  } catch (error) {
    returnError(res, error);
  }
};
