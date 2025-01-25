import { RequestHandler } from 'express';
import { returnError } from '@src/utils/error';
import Joi from 'joi';
import { transporter } from '@src/models/email/services/transporter';

const emailSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  text: Joi.any().required(),
});

export const sendEmailHandler: RequestHandler = async (req, res, nexta): Promise<void> => {
  const { error, value } = emailSchema.validate(req.body);
  if (error) {
    res.status(400).json({ success: false, message: error.details[0].message });
    return;
  }

  try {
    const { to, subject, text } = value;

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
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
