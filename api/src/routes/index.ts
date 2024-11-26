import { Router } from 'express';
import userRoutes from '../models/user/routers/userRoutes';
import authRoutes from '../models/auth/routers/authRoutes';
import companyRoutes from '../models/company/routers/companyRoutes';
import eventRoutes from '../models/Event/routers/eventRoutes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/companies', companyRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/events', eventRoutes);

export default apiRouter;
