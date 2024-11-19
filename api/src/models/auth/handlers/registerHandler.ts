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
  isActive: Joi.boolean().optional().default(false),
  companyId: Joi.number().integer().optional().allow(null),
  roleId: Joi.number().integer().required(),
});

export const registerHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { email, password, firstName, lastName, isActive, companyId, roleId } = value;

    const isEmailAlreadyExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isEmailAlreadyExist) {
      res.status(400).json({ success: false, message: 'Email already in use' });
      return;
    }

    if (companyId !== null) {
      const companyExists = await prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!companyExists) {
        res.status(400).json({ success: false, message: 'Invalid companyId' });
        return;
      }
    }

    const roleExists = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!roleExists) {
      res.status(400).json({ success: false, message: 'Invalid roleId' });
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
        companyId: companyId || null,
        profile: {
          create: {
            roleId,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'User created',
      user: newUser,
    });
  } catch (error) {
    returnError(res, error);
  }
};
