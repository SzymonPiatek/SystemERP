import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import { testCompany, testUser } from '@src/tests/data';
import { compileTemplate } from '@src/models/email/services/transporter';

export const emailPreviewHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { name } = req.params;

    if (!name) {
      res.status(400).json({ success: false, message: 'Missing template name' });
      return;
    }

    const templates = ['sendResetPassword', 'inviteUser'];

    if (!templates.includes(name)) {
      res.status(404).json({ success: false, message: 'Template not found' });
      return;
    }

    let data: Record<string, any> = {};

    if (name === 'sendResetPassword') {
      data = {
        subject: 'Password Reset Request',
        user: testUser,
        resetLink: '/',
      };
    } else if (name === 'inviteUser') {
      data = {
        subject: 'You are invited to company!',
        user: testUser,
        company: testCompany,
        inviteLink: '/',
      };
    }

    const html = await compileTemplate(name, data);

    res.send(html);
  } catch (error) {
    returnError(res, error);
  }
};
