import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllEventsHandler, getEventByIdHandler } from '../handlers/getHandlers';
import { postEventHandler } from '../handlers/postHandlers';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';
import { editEventHandler } from '../handlers/patchHandlers';

const router = Router();

router.get('/', apiLimiter, authenticateToken, getAllEventsHandler);
router.get('/:id', apiLimiter, authenticateToken, getEventByIdHandler);

router.post('/', authLimiter, authenticateToken, postEventHandler);

router.patch('/:id', authLimiter, authenticateToken, editEventHandler);

export default router;
