import { Router } from 'express';
import { getAllUsersHandler, getUserByIdHandler } from '../handlers/getHandlers';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { changeUserIsActiveHandler, changeUserPasswordHandler, editUserDataHandler } from '../handlers/patchHandlers';

const router = Router();

router.get('/', authenticateToken, getAllUsersHandler);
router.get('/:id', authenticateToken, getUserByIdHandler);

router.patch('/:id', authenticateToken, editUserDataHandler);
router.patch('/:id/change_active', authenticateToken, changeUserIsActiveHandler);
router.patch('/:id/change_password', authenticateToken, changeUserPasswordHandler);

export default router;
