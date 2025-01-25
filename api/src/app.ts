import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import helmetConfig from './routes/helmet';
import { corsConfig } from './routes/cors';
import blockDoubleSlashesMiddleware from './middlewares/blockDoubleSlashesMiddleware';
import swaggerSpec from './swaggerConfig';
import apiRouter from './routes';
import { smtpServer } from '@src/models/email/services/smtpServer';

const app = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmetConfig);
app.use(corsConfig);
app.use(blockDoubleSlashesMiddleware);

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', apiRouter);

smtpServer.listen(2525, () => {
  console.log('Serwer SMTP działa na porcie 2525');
});

export default app;
