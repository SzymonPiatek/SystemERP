import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import Joi from 'joi';
import prisma from '@src/prismaClient';

type ItemType = 'sala' | 'biurko' | 'miejsce parkingowe';

const itemSchema = Joi.object({
  itemId: Joi.number().required(),
  name: Joi.string().required(),
  type: Joi.string().valid('sala', 'biurko', 'miejsce parkingowe').required(),
  place: Joi.string().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date()
    .required()
    .custom((value, helpers) => {
      const { createdAt } = helpers.state.ancestors[0];
      if (new Date(value) < new Date(createdAt)) {
        return helpers.error('any.invalid', { message: '"updatedAt" must be greater than or equal to "createdAt"' });
      }
      return value;
    }),
});

const generateOrderNumber = (type: ItemType, orderIndex: number): string => {
  const typePrefix = {
    sala: 'S',
    biurko: 'B',
    'miejsce parkingowe': 'P',
  }[type];

  `${typePrefix}${orderIndex.toString().padStart(3, '0')}`;
  return;
};

export const createItemHandler: RequestHandler = async (req, res) => {
  try {
    const { error, value } = itemSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { itemId, name, type, place, createdAt, updatedAt } = value;

    const itemExists = await prisma.item.findUnique({
      where: { itemId: itemId }
    });

    if (itemExists) {
      res.status(400).json({ success: false, message: 'Item already exists' });
      return;
    }

    const orderIndex = (await prisma.item.count({ where: { type } })) + 1;
    const orderNumber = generateOrderNumber(type as ItemType, orderIndex);

    const newItem = await prisma.item.create({
      data: {
        itemId,
        name,
        type,
        orderNumber,
        place,
        createdAt,
        updatedAt,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Item created',
      item: newItem,
    });
    return;
  } catch(error) {
    returnError(res, error);
  }
};
