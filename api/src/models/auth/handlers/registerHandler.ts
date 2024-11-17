import { RequestHandler } from 'express';
import { hashPassword } from '../../../modules/authModule';
import { returnError } from '../../../utils/error';
import Joi from 'joi';
import prisma from '../../../prismaClient';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  isActive: Joi.boolean().optional().default(true),
});

export const registerHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { email, password, firstName, lastName, isActive } = value;

    const isEmailAlreadyExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isEmailAlreadyExist) {
      res.status(400).json({ success: false, message: 'Email already in use' });
      return;
    }

    const hashedPassword: string = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        isActive,
      },
    });

    res.status(201).json({
      success: true,
      message: 'User created',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        isActive: newUser.isActive,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    returnError(res, error);
  }
};
