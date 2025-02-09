import nodemailer from 'nodemailer';
import path from 'path';
import * as Handlebars from 'handlebars';
import fs from 'fs/promises';

const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  logger: true,
  debug: false,
});

const compileTemplate = async (templateName: string, context: Record<string, any>) => {
  const filePath = path.join(__dirname, '../templates', `${templateName}.hbs`);
  const source = await fs.readFile(filePath, 'utf-8');
  const template = Handlebars.compile(source);
  return template(context);
};

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: SMTP_USER,
      to,
      subject,
      text,
    });
    return info;
  } catch (error: any) {
    throw new Error(`Failed to send email to ${to}: ${error.message}`);
  }
};

export const sendEmailWithTemplate = async (to: string, subject: string, templateName: string, context: Record<string, any>) => {
  try {
    const html = await compileTemplate(templateName, context);

    const info = await transporter.sendMail({
      from: SMTP_USER,
      to,
      subject,
      html,
    });

    return info;
  } catch (error: any) {
    throw new Error(`Failed to send email to ${to}: ${error.message}`);
  }
};
