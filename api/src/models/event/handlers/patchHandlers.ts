import { RequestHandler } from 'express';
import { returnError } from '../../../utils/error';
import Joi from 'joi';
import prisma from '../../../prismaClient';

const eventSchema = Joi.object({
  title: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  isAllDay: Joi.boolean().optional(),
});

export const editEventHandler: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;

  try {
    const { error, value } = eventSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const isExist = await prisma.event.findUnique({ where: { id: Number(id) } });
    if (!isExist) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    const { title, startDate, endDate, isAllDay } = value;

    const updatedData: {
      title?: string;
      startDate?: string;
      endDate?: string;
      isAllDay?: boolean;
    } = {};

    if (title) updatedData.title = title;
    if (startDate) updatedData.startDate = startDate;
    if (endDate) updatedData.endDate = endDate;
    if (isAllDay) updatedData.isAllDay = isAllDay;

    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.status(200).json({ success: true, message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    returnError(res, error);
  }
};
