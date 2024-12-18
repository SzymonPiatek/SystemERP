import { RequestHandler } from 'express';
import prisma from '../../../prismaClient';
import { comparePassword, hashPassword } from '../../../modules/authModule';
import { returnError } from '../../../utils/error';

export const changeUserPasswordHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({ where: { id: id } });
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
      where: { id: id },
      data: { password: hashedPassword },
    });

    res.status(200).json({ success: true, message: 'Password updated successfully' });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
