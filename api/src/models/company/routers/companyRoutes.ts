import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllCompaniesHandler, getCompanyByIdHandler } from '../handlers/getHandlers';
import { postCompanyHandler } from '../handlers/postHandlers';
import { editCompanyDataHandler } from '../handlers/patchHandlers';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';
import checkEmptyBody from '../../../middlewares/bodyMiddleware';
import { validateIdParam } from '../../../middlewares/idMiddleware';
import { authorizeRole } from '../../../middlewares/roleMiddleware';
import checkUserId from '../../../middlewares/userIdMiddleware';

const router = Router();

router.get('/', apiLimiter, authenticateToken, authorizeRole(['ADMIN']), checkUserId, getAllCompaniesHandler);
router.get(
  '/:id',
  apiLimiter,
  authenticateToken,
  validateIdParam,
  authorizeRole(['ADMIN', 'ENTITY_ADMIN', 'OWNER', 'MANAGER']),
  checkUserId,
  getCompanyByIdHandler,
);

router.post('/', authLimiter, authenticateToken, authorizeRole(['ADMIN']), checkUserId, checkEmptyBody, postCompanyHandler);

router.patch(
  '/:id',
  authLimiter,
  authenticateToken,
  authorizeRole(['ADMIN', 'ENTITY_ADMIN', 'OWNER']),
  checkUserId,
  validateIdParam,
  checkEmptyBody,
  editCompanyDataHandler,
);

export default router;
