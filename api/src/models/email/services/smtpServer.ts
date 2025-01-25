import { SMTPServer } from 'smtp-server';
import fs from 'fs';

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

      fs.writeFileSync(`emails/${Date.now()}.eml`, emailData);

      callback();
    });
  },
  onAuth(auth, session, callback) {
    const { username, password } = auth;

    if (username === 'test' && password === 'password') {
      callback(null, { user: 'test' });
    } else {
      callback(new Error('Niepoprawne dane logowania'));
    }
  },
});
