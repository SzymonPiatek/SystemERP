import { Router } from 'express';
import { authenticateToken } from '@src/middlewares/authenticateTokenMiddleware';
import { apiLimiter, authLimiter } from '@src/middlewares/limiterMiddleware';
import { authorizeRole } from '@src/middlewares/authorizeRoleMiddleware';
import { getAllUsersHandler } from '../handlers/getAllUsersHandler';
import { getUserByIdHandler } from '../handlers/getUserByIdHandler';
import checkEmptyBody from '@src/middlewares/checkEmptyBodyMiddleware';
import { validateIdParam } from '@src/middlewares/validateIdParamMiddleware';
import { editUserDataHandler } from '../handlers/editUserDataHandler';
import { changeUserIsActiveHandler } from '../handlers/changeUserIsActiveHandler';
import { changeUserPasswordHandler } from '../handlers/changeUserPasswordHandler';

const router = Router();

// GET ALL USERS
router.get('/', apiLimiter, authenticateToken, authorizeRole(['ADMIN', 'ENTITY_ADMIN', 'OWNER', 'MANAGER']), getAllUsersHandler);

// GET USER BY ID
router.get('/:id', apiLimiter, authenticateToken, authorizeRole(['*']), validateIdParam, getUserByIdHandler);

// EDIT USER
router.patch('/:id', authLimiter, authenticateToken, authorizeRole(['*']), checkEmptyBody, validateIdParam, editUserDataHandler);

// (DE)ACTIVATE USER
router.patch('/:id/change_active', authLimiter, authenticateToken, authorizeRole(['*']), validateIdParam, changeUserIsActiveHandler);

// CHANGE PASSWORD
router.patch(
  '/:id/change_password',
  authLimiter,
  authenticateToken,
  authorizeRole(['*']),
  checkEmptyBody,
  validateIdParam,
  changeUserPasswordHandler,
);

export default router;
