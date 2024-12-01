import { Router } from 'express';
import { getAllUsersHandler, getUserByIdHandler } from '../handlers/getHandlers';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { changeUserPassword } from '../handlers/patchHandlers';

const router = Router();

router.get('/', authenticateToken, getAllUsersHandler);
router.get('/:id', authenticateToken, getUserByIdHandler);

router.patch('/:id/change_password', authenticateToken, changeUserPassword);

export default router;
