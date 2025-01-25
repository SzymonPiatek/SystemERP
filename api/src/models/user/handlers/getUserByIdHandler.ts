import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import prisma from '@src/prismaClient';
import { excludePassword } from '../services/returnSafeUserData';
import fs from 'fs/promises';

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
      if (user.profile?.profilePic?.filePath) {
        try {
          const fileBuffer = await fs.readFile(user.profile.profilePic.filePath);
          profilePicBase64 = `data:${user.profile.profilePic.fileType};base64,${fileBuffer.toString('base64')}`;
        } catch (err) {
          console.error('Failed to read profile picture:', err);
        }
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
