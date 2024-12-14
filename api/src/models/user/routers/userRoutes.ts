import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { changeUserIsActiveHandler, changeUserPasswordHandler, editUserDataHandler } from '../handlers/patchHandlers';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';
import { authorizeRole } from '../../../middlewares/roleMiddleware';
import { getAllUsersHandler } from '../handlers/getAllUsersHandler';
import { getUserByIdHandler } from '../handlers/getUserByIdHandler';
import checkEmptyBody from '../../../middlewares/bodyMiddleware';
import { validateIdParam } from '../../../middlewares/idMiddleware';
import { checkTheSameUser } from '../../../middlewares/theSameUserMiddleware';

const router = Router();

router.get('/', apiLimiter, authenticateToken, authorizeRole(['ADMIN', 'ENTITY_ADMIN', 'OWNER', 'MANAGER']), getAllUsersHandler);
router.get('/:id', apiLimiter, authenticateToken, validateIdParam, getUserByIdHandler);

router.patch('/:id', authLimiter, authenticateToken, checkTheSameUser, checkEmptyBody, validateIdParam, editUserDataHandler);
router.patch('/:id/change_active', authLimiter, authenticateToken, validateIdParam, changeUserIsActiveHandler);
router.patch(
  '/:id/change_password',
  authLimiter,
  authenticateToken,
  checkTheSameUser,
  checkEmptyBody,
  validateIdParam,
  changeUserPasswordHandler,
);

export default router;
