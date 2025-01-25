import { Router } from 'express';
import { authenticateToken } from '@src/middlewares/authenticateTokenMiddleware';
import { apiLimiter, authLimiter } from '@src/middlewares/limiterMiddleware';
import checkEmptyBody from '@src/middlewares/checkEmptyBodyMiddleware';
import { validateIdParam } from '@src/middlewares/validateIdParamMiddleware';
import { authorizeRole } from '@src/middlewares/authorizeRoleMiddleware';
import { getAllCompaniesHandler } from '../handlers/getAllCompaniesHandler';
import { getCompanyByIdHandler } from '../handlers/getCompanyByIdHandler';
import { createCompanyHandler } from '../handlers/createCompanyHandler';
import { editCompanyDataHandler } from '../handlers/editCompanyDataHandler';

const router = Router();

// GET ALL COMPANIES
router.get('/', apiLimiter, authenticateToken, authorizeRole(['ADMIN']), getAllCompaniesHandler);

// GET COMPANY BY ID
router.get('/:id', apiLimiter, authenticateToken, authorizeRole(['*']), validateIdParam, getCompanyByIdHandler);

// CREATE COMPANY
router.post('/', authLimiter, authenticateToken, authorizeRole(['ADMIN']), checkEmptyBody, createCompanyHandler);

// EDIT COMPANY
router.patch(
  '/:id',
  authLimiter,
  authenticateToken,
  authorizeRole(['ADMIN', 'ENTITY_ADMIN', 'OWNER']),
  validateIdParam,
  checkEmptyBody,
  editCompanyDataHandler,
);

export default router;
