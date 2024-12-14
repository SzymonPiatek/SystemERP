import { RequestHandler } from 'express';
import prisma from '../../../prismaClient';
import { excludePassword } from '../services/returnSafeUserData';
import { returnError } from '../../../utils/error';

export const editUserDataHandler: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

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
      where: { id: Number(id) },
      data: updatedData,
    });

    const safeData = excludePassword(updatedUser);

    res.status(200).json({ success: true, message: 'User updated successfully', user: safeData });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
