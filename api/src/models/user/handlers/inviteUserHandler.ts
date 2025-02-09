import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import Joi from 'joi';
import prisma from '@src/prismaClient';
import { sendEmail } from '@src/models/email/services/transporter';

const inviteSchema = Joi.object({
  fistName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  companyId: Joi.string().optional(),
  roleId: Joi.number().required(),
});

export const inviteUserHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const userId = Number(req.userId);

    const { error, value } = inviteSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { firstName, lastName, email, companyId, roleId } = value;

    const loggedInUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            role: true,
          },
        },
      },
    });
    if (!loggedInUser) {
      res.status(404).json({ success: false, message: 'Access denied' });
      return;
    }

    const isEmailExist = await prisma.user.findUnique({ where: { email } });
    if (isEmailExist) {
      res.status(404).json({ success: false, message: 'Email already exist' });
      return;
    }

    if (loggedInUser?.profile?.role.name !== 'ADMIN') {
      if (companyId === undefined || companyId === null) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      } else {
        if (companyId !== loggedInUser.companyId) {
          res.status(403).json({ success: false, message: 'Access denied' });
          return;
        }
      }

      if (roleId === 1) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }
    }

    if (companyId !== null && companyId !== undefined) {
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

    const info = await sendEmail(email, 'You are invited to company', 'You are invited to company');

    if (!info) {
      res.status(400).json({ success: false, message: 'Error while sending email' });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'Invite email sent',
    });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
