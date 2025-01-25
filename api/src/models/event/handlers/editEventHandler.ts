import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import Joi from 'joi';
import prisma from '@src/prismaClient';

const eventSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  isAllDay: Joi.boolean().optional(),
});

export const editEventHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.userId);

    const { error, value } = eventSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const isExist = await prisma.event.findUnique({ where: { id: id, ownerId: userId } });
    if (!isExist) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    const { title, description, startDate, endDate, isAllDay } = value;

    const updatedData: {
      title?: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      isAllDay?: boolean;
    } = {};

    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (startDate) updatedData.startDate = startDate;
    if (endDate) updatedData.endDate = endDate;
    if (isAllDay) updatedData.isAllDay = isAllDay;

    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: updatedData,
    });

    res.status(200).json({ success: true, message: 'Event updated successfully', event: updatedEvent });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
