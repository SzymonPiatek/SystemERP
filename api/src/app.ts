import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import helmetConfig from './routes/helmet';
import { corsConfig } from './routes/cors';
import blockDoubleSlashesMiddleware from './middlewares/blockDoubleSlashesMiddleware';
import swaggerSpec from './swaggerConfig';
import apiRouter from './routes';
import path from 'path';

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
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

export default app;
