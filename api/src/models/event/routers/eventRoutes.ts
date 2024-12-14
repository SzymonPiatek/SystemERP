import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllEventsHandler, getEventByIdHandler } from '../handlers/getHandlers';
import { postEventHandler } from '../handlers/postHandlers';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';
import { editEventHandler } from '../handlers/patchHandlers';
import { validateIdParam } from '../../../middlewares/idMiddleware';
import checkEmptyBody from '../../../middlewares/bodyMiddleware';

const router = Router();

router.get('/', apiLimiter, authenticateToken, getAllEventsHandler);
router.get('/:id', apiLimiter, authenticateToken, validateIdParam, getEventByIdHandler);

router.post('/', authLimiter, authenticateToken, checkEmptyBody, postEventHandler);

router.patch('/:id', authLimiter, authenticateToken, validateIdParam, checkEmptyBody, editEventHandler);

export default router;
