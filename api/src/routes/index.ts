import { Router } from 'express';
import userRoutes from '@src/models/user/routers/userRoutes';
import authRoutes from '@src/models/auth/routers/authRoutes';
import companyRoutes from '@src/models/company/routers/companyRoutes';
import eventRoutes from '@src/models/event/routers/eventRoutes';
import notesRoutes from '@src/models/note/routers/notesRoutes';
import emailRoutes from '@src/models/email/routers/emailRoutes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/companies', companyRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/events', eventRoutes);
apiRouter.use('/notes', notesRoutes);
apiRouter.use('/email', emailRoutes);

export default apiRouter;
