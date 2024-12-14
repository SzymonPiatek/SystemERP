import { RequestHandler } from 'express';
import prisma from '../../../prismaClient';
import { excludePassword } from '../services/returnSafeUserData';
import { returnError } from '../../../utils/error';
import Joi from 'joi';

const userSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().optional(),
});

export const editUserDataHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.userId);

    const { error, value } = userSchema.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    const { firstName, lastName, email } = value;

    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

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

    if (user.id === userId || (loggedInUser && loggedInUser.profile && loggedInUser.profile.role.name === 'ADMIN')) {
      if (email) {
        const existingUserWithEmail = await prisma.user.findUnique({ where: { email } });
        if (existingUserWithEmail && existingUserWithEmail.id !== user.id) {
          res.status(400).json({ success: false, message: 'Email must be unique' });
          return;
        }
      }

      const updatedData: { firstName?: string; lastName?: string; email?: string } = {};
      if (firstName) updatedData.firstName = firstName;
      if (lastName) updatedData.lastName = lastName;
      if (email) updatedData.email = email;

      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: updatedData,
      });

      const safeData = excludePassword(updatedUser);

      res.status(200).json({ success: true, message: 'User updated successfully', user: safeData });
      return;
    } else {
      res.status(404).json({ success: false, message: 'Access denied' });
      return;
    }
  } catch (error) {
    returnError(res, error);
  }
};
