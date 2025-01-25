import { Router } from 'express';
import { apiLimiter } from '@src/middlewares/limiterMiddleware';
import { authenticateToken } from '@src/middlewares/authenticateTokenMiddleware';
import { authorizeRole } from '@src/middlewares/authorizeRoleMiddleware';
import { sendEmailHandler } from '@src/models/email/handlers/sendEmailHandler';

const router = Router();

// SEND EMAIL
router.post('/', apiLimiter, authenticateToken, authorizeRole(['ADMIN']), sendEmailHandler);

export default router;
