import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import helmetConfig from './routes/helmet';
import { corsConfig } from './routes/cors';
import blockDoubleSlashesMiddleware from './middlewares/blockDoubleSlashesMiddleware';
import swaggerSpec from './swaggerConfig';
import apiRouter from './routes';
import path from 'path';
import { engine } from 'express-handlebars';

const app = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmetConfig);
app.use(corsConfig);
app.use(blockDoubleSlashesMiddleware);

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './models/email/templates/'));

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', apiRouter);
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
app.use('/public', express.static(path.resolve(__dirname, '../public')));

export default app;
