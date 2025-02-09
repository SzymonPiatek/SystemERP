import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import Joi from 'joi';
import prisma from '@src/prismaClient';
import { sendEmailWithTemplate } from '@src/models/email/services/transporter';
import crypto from 'crypto';

const inviteSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  companyId: Joi.number().optional(),
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
      include: { profile: { include: { role: true } } },
    });

    if (!loggedInUser) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    if (loggedInUser?.profile?.role.name !== 'ADMIN') {
      if (companyId === null || companyId === undefined) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }

      if (companyId !== loggedInUser.companyId) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }

      if (roleId === 1) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }
    }

    let company = null;
    if (companyId) {
      company = await prisma.company.findUnique({ where: { id: companyId } });

      if (!company) {
        res.status(404).json({ success: false, message: 'Company not found' });
        return;
      }
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'Email already exists' });
      return;
    }

    const inviteToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const isInviteExist = await prisma.invite.findFirst({ where: { email } });
    if (isInviteExist) {
      res.status(400).json({ success: false, message: 'Invitation already exists for this email' });
      return;
    }

    const invite = await prisma.invite.create({
      data: {
        firstName,
        lastName,
        email,
        companyId,
        roleId,
        token: inviteToken,
        expiresAt,
      },
    });

    if (!invite) {
      res.status(400).json({ success: false, message: 'Error creating invite' });
      return;
    }

    const inviteLink = `${process.env.HOST}/accept-invite?token=${inviteToken}`;

    const newUser = {
      firstName,
      lastName,
      email,
    };

    const context = { user: newUser, company, inviteLink };

    await sendEmailWithTemplate(email, 'You are invited to company', 'inviteUser', context);

    res.status(201).json({ success: true, message: 'Invitation sent' });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
