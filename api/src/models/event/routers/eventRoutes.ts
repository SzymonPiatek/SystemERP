import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllEventsHandler } from '../handlers/getHandlers';

const router = Router();

router.get('/', authenticateToken, getAllEventsHandler);

export default router;
