import { File } from '@src/types/types';
import fs from 'fs/promises';

export const getFile = async (file: File) => {
  let profilePicBase64: string | null = null;

  if (file.filePath) {
    try {
      const fileBuffer = await fs.readFile(file.filePath);
      profilePicBase64 = `data:${file.fileType};base64,${fileBuffer.toString('base64')}`;
    } catch (err) {
      console.error('Failed to read file:', err);
    }
  }
  return profilePicBase64;
};
