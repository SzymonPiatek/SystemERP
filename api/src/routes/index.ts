import { Router } from 'express';
import userRoutes from '../models/user/routers/userRoutes';
import authRoutes from '../models/auth/routers/authRoutes';

const apiRouter = Router();

apiRouter.use('/user', userRoutes);
apiRouter.use('/auth', authRoutes);

export default apiRouter;
