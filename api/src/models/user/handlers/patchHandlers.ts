import { RequestHandler } from 'express';
import prisma from '../../../prismaClient';
import { comparePassword, hashPassword } from '../../../modules/authModule';
import { returnError } from '../../../utils/error';

export const changeUserPassword: RequestHandler = async (req, res): Promise<void> => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const isMatchOld = await comparePassword(oldPassword, user.password);
    if (!isMatchOld) {
      res.status(400).json({ success: false, message: 'Wrong password' });
      return;
    }

    const isDifferentPassword = !(await comparePassword(newPassword, user.password));
    if (!isDifferentPassword) {
      res.status(400).json({ success: false, message: 'New password must be different' });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: Number(id) },
      data: { password: hashedPassword },
    });

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    returnError(res, error);
  }
};
