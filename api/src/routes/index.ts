import { Router } from 'express';
import userRoutes from '../models/user/routers/userRoutes';
import authRoutes from '../models/auth/routers/authRoutes';
import companyRoutes from '../models/company/routers/companyRoutes';
import eventRoutes from '../models/event/routers/eventRoutes';
import notesRoutes from '../models/note/routers/notesRoutes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/companies', companyRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/events', eventRoutes);
apiRouter.use('/notes', notesRoutes);

export default apiRouter;
