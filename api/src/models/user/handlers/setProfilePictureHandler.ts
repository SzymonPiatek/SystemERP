import { RequestHandler } from 'express';
import prisma from '@src/prismaClient';
import { returnError } from '@src/utils/error';
import fs from 'fs/promises';
import path from 'path';

export const setProfilePictureHandler: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const file = req.file;

    if (!file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const currentProfile = await prisma.profile.findUnique({
      where: { userId: userId },
      include: { profilePic: true },
    });

    if (!currentProfile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    if (currentProfile.profilePic) {
      const oldFilePath = currentProfile.profilePic.filePath;
      try {
        await fs.unlink(path.resolve(oldFilePath));
      } catch (error) {
        console.warn(`Failed to delete old profile picture: ${oldFilePath}`, error);
      }
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId: userId },
      data: {
        profilePic: {
          update: {
            filePath: file.path,
            fileName: file.filename,
            fileType: file.mimetype,
          },
          create: {
            filePath: file.path,
            fileName: file.filename,
            fileType: file.mimetype,
          },
        },
      },
      include: {
        profilePic: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Profile picture updated successfully',
      profile: updatedProfile,
    });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
