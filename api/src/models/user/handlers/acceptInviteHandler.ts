import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import Joi from 'joi';
import prisma from '@src/prismaClient';
import { hashPassword } from '@src/modules/authModule';

const acceptInviteSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const acceptInviteHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { error, value } = acceptInviteSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { token, password } = value;

    const invite = await prisma.invite.findFirst({
      where: { token, expiresAt: { gt: new Date() } },
    });

    if (!invite) {
      res.status(400).json({ success: false, message: 'Invalid or expired token' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        firstName: invite.firstName,
        lastName: invite.lastName,
        email: invite.email,
        password: hashedPassword,
        isActive: true,
        companyId: invite.companyId,
        profile: {
          create: { roleId: invite.roleId },
        },
      },
    });

    await prisma.invite.delete({
      where: { id: invite.id },
    });

    res.status(200).json({ success: true, message: 'Account activated', user: newUser });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
