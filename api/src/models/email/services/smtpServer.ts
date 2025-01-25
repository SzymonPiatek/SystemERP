import { SMTPServer } from 'smtp-server';
import fs from 'fs';
import path from 'path';

export const smtpServer = new SMTPServer({
  authOptional: true,
  onData(stream, session, callback) {
    let emailData = '';

    stream.on('data', (chunk) => {
      emailData += chunk.toString();
    });

    stream.on('end', () => {
      console.log('Odebrano wiadomość e-mail:');
      console.log(emailData);

      const emailsDir = path.join(__dirname, '../../../emails');

      if (!fs.existsSync(emailsDir)) {
        fs.mkdirSync(emailsDir, { recursive: true });
      }

      const filePath = path.join(emailsDir, `${Date.now()}.eml`);
      fs.writeFileSync(filePath, emailData);

      callback();
    });
  },
  onAuth(auth, session, callback) {
    const { username, password } = auth;

    const validUser = process.env.SMTP_USER;
    const validPassword = process.env.SMTP_PASS;

    if (username === validUser && password === validPassword) {
      callback(null, { user: username });
    } else {
      callback(new Error('Niepoprawne dane logowania'));
    }
  },
});
