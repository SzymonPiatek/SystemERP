import { Router } from 'express';
import userRoutes from '../models/users/routers/userRoutes';

const apiRouter = Router();

apiRouter.use('/users', userRoutes);

export default apiRouter;
