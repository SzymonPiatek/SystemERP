import { returnError } from '@src/utils/error';
import { RequestHandler } from 'express';
import Joi from 'joi';
import prisma from '@src/prismaClient';
import { verifyToken } from '@src/models/auth/services/authService';
import { hashPassword } from '@src/modules/authModule';

const passwordResetSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
});

export const changeForgottenPasswordHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { error, value } = passwordResetSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { token, newPassword } = value;

    let decoded;
    try {
      decoded = verifyToken(token, process.env.RESET_PASS_TOKEN_SECRET as string);
    } catch (err) {
      res.status(400).json({ success: false, message: 'Invalid or expired token' });
      return;
    }

    if (!decoded.id) {
      res.status(400).json({ success: false, message: 'Invalid token payload' });
      return;
    }

    const userId = Number(decoded.id);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(400).json({ success: false, message: 'User not found' });
      return;
    }

    if (user.isPasswordResetting === false) {
      res.status(400).json({ success: false, message: 'Access denied' });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    const newUserData = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword, isPasswordResetting: false },
    });

    if (!newUserData) {
      res.status(400).json({ success: false, message: 'Error while updating password' });
      return;
    }

    res.status(200).json({ success: true, message: 'Password successfully reset' });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
