import { RequestHandler } from 'express';
import Joi from 'joi';
import { comparePassword } from '@src/modules/authModule';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';
import { generateAndSetTokens } from '../services/authService';
import { excludePassword } from '@src/models/user/services/returnSafeUserData';

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

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: {
          include: {
            role: true,
            profilePic: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    await generateAndSetTokens(res, user);
    const safeData = excludePassword(user);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: safeData,
    });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
