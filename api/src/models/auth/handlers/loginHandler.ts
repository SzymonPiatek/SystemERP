import { RequestHandler } from 'express';
import Joi from 'joi';
import { comparePassword } from '../../../modules/authModule';
import { returnError } from '../../../utils/error';
import prisma from '../../../prismaClient';
import { generateAccessToken, generateRefreshToken } from '../services/authService';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { email, password } = value;
    const invalidMessage = 'Invalid email or password';

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: invalidMessage });
      return;
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ success: false, message: invalidMessage });
      return;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      user,
    });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
