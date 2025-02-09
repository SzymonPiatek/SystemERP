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
import { setProfilePictureHandler } from '@src/models/user/handlers/setProfilePictureHandler';
import upload from '@src/middlewares/uploadMiddleware';
import { sendResetPasswordHandler } from '@src/models/user/handlers/sendResetPasswordHandler';
import { changeForgottenPasswordHandler } from '@src/models/user/handlers/changeForgottenPasswordHandler';
import { inviteUserHandler } from '@src/models/user/handlers/inviteUserHandler';

const router = Router();

// GET ALL USERS
router.get('/', apiLimiter, authenticateToken, authorizeRole(['ADMIN', 'ENTITY_ADMIN', 'OWNER', 'MANAGER']), getAllUsersHandler);

// GET USER BY ID
router.get('/:id', apiLimiter, authenticateToken, authorizeRole(['*']), validateIdParam, getUserByIdHandler);

// CHANGE FORGOTTEN PASSWORD
router.patch('/change_forgotten_password', authLimiter, changeForgottenPasswordHandler);

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

// SET PROFILE PICTURE
router.post(
  '/:id/profile_pic',
  authLimiter,
  authenticateToken,
  authorizeRole(['*']),
  validateIdParam,
  upload.single('file'),
  setProfilePictureHandler,
);

// SEND RESET PASSWORD
router.post('/forgot_password', authLimiter, checkEmptyBody, sendResetPasswordHandler);

// INVITE USER
router.post(
  '/invite',
  authLimiter,
  authenticateToken,
  authorizeRole(['ADMIN', 'OWNER', 'ENTITY_ADMIN']),
  checkEmptyBody,
  inviteUserHandler,
);

export default router;
