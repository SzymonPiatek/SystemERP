import { RequestHandler } from 'express';
import nodemailer from 'nodemailer';
import { returnError } from '@src/utils/error';
import Joi from 'joi';

const emailSchema = Joi.object({
  from: Joi.string().email().required(),
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  text: Joi.any().required(),
});

export const sendEmailHandler: RequestHandler = async (req, res, nexta): Promise<void> => {
  const { from, to, subject, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 2525,
      secure: false,
      auth: {
        user: 'admin',
        pass: 'TestPassword',
      },
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });

    res.status(200).json({
      message: 'Email został wysłany',
      info,
    });
    return;
  } catch (error) {
    returnError(res, error);
  }
};
