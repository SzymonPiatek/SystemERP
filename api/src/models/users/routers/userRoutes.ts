import { Router } from 'express';
import { getAllUsersHandler } from '../handlers/getHandlers';
import { authenticateToken } from '../../../routes/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getAllUsersHandler);

export default router;
