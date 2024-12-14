import { Router } from 'express';
import { getAllUsersHandler, getUserByIdHandler } from '../handlers/getHandlers';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { changeUserIsActiveHandler, changeUserPasswordHandler, editUserDataHandler } from '../handlers/patchHandlers';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';
import { authorizeRole } from '../../../middlewares/roleMiddleware';

const router = Router();

router.get('/', apiLimiter, authenticateToken, authorizeRole(['ADMIN', 'ENTITY_ADMIN', 'OWNER', 'MANAGER']), getAllUsersHandler);
router.get('/:id', apiLimiter, authenticateToken, getUserByIdHandler);

router.patch('/:id', authLimiter, authenticateToken, editUserDataHandler);
router.patch('/:id/change_active', authLimiter, authenticateToken, changeUserIsActiveHandler);
router.patch('/:id/change_password', authLimiter, authenticateToken, changeUserPasswordHandler);

export default router;
