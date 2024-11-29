import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllEventsHandler, getEventByIdHandler } from '../handlers/getHandlers';
import { postEventHandler } from '../handlers/postHandlers';

const router = Router();

router.get('/', authenticateToken, getAllEventsHandler);
router.get('/:id', authenticateToken, getEventByIdHandler);

router.post('/', authenticateToken, postEventHandler);

export default router;
