import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import Joi from 'joi';
import prisma from '../../../prismaClient';

const notesSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  isActive: Joi.boolean().required(),
  ownerId: Joi.number().required(),
});

export const postNotesHandler: RequestHandler = async (req, res) => {
  try {
    const { error, value } = notesSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { title, description, isActive, ownerId } = value;

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
        isActive,
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