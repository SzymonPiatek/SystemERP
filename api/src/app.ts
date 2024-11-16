import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import helmetConfig from './routes/helmet';
import corsConfig from './routes/cors';
import blockDoubleSlashesMiddleware from './routes/routeMiddleware';
import swaggerSpec from './swaggerConfig';

const app = express();

app.set('trues proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmetConfig);
app.use(corsConfig);
app.use(blockDoubleSlashesMiddleware);

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
