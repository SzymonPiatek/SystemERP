import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import Joi from 'joi';
import prisma from '@src/prismaClient';
import { tokenGenerator } from '@src/models/auth/services/authService';
import { sendEmail } from '@src/models/email/services/transporter';

const resetSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const sendResetPasswordHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { error, value } = resetSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { email } = value;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const token = tokenGenerator(
      user,
      process.env.RESET_PASS_TOKEN_SECRET as string,
      parseInt(process.env.RESET_PASS_TOKEN_EXPIRY as string, 10),
    );

    const resetLink = `${process.env.HOST}/reset-password?token=${token}`;

    const text = `Click the link to reset your password: \n${resetLink}`;

    await sendEmail(email, 'Reset Password', text);

    res.status(200).json({ success: true, message: 'Password reset email sent' });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
