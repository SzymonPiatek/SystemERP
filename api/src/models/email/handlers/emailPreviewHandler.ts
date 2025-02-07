import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import { testUser } from '@src/tests/data';

export const emailPreviewHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { name } = req.params;

    if (!name) {
      res.status(400).json({ success: false, message: 'Missing template name' });
      return;
    }

    const templates = ['sendResetPassword'];

    if (!templates.includes(name)) {
      res.status(404).json({ success: false, message: 'Template not found' });
      return;
    }

    let data;
    if (name === 'sendResetPassword') {
      data = {
        subject: 'Password Reset Request',
        user: testUser,
        resetLink: 'http://localhost/reset-password?token=123456',
      };
    }

    res.render(name, data, (err, html) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Error rendering email' });
        return;
      } else {
        res.send(html);
        return;
      }
    });
  } catch (error) {
    returnError(res, error);
  }
};
