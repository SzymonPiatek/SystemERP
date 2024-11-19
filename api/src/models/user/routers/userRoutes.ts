import { Router } from 'express';
import { getAllUsersHandler, getUserByIdHandler } from '../handlers/getHandlers';
import { authenticateToken } from '../../../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getAllUsersHandler);
router.get('/:id', authenticateToken, getUserByIdHandler);

export default router;
