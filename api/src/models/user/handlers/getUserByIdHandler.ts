import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';
import { excludePassword } from '../services/returnSafeUserData';
import fs from 'fs/promises';
import { getFile } from '@src/models/file/services/getFile';

export const getUserByIdHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        profile: {
          include: {
            role: true,
            profilePic: true,
          },
        },
      },
    });

    if (user) {
      const safeData = excludePassword(user);

      let profilePicBase64: string | null = null;
      if (user.profile?.profilePic) {
        profilePicBase64 = await getFile(user.profile?.profilePic);
      }

      res.status(200).json({
        success: true,
        message: 'User found',
        user: {
          ...safeData,
          profile: {
            ...safeData.profile,
            profilePicBase64,
          },
        },
      });
      return;
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
  } catch (error) {
    returnError(res, error);
  }
};
