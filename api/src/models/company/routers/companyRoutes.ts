import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllCompaniesHandler, getCompanyByIdHandler } from '../handlers/getHandlers';
import { postCompanyHandler } from '../handlers/postHandlers';
import { editCompanyDataHandler } from '../handlers/patchHandlers';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';
import checkEmptyBody from '../../../middlewares/bodyMiddleware';
import { validateIdParam } from '../../../middlewares/idMiddleware';

const router = Router();

router.get('/', apiLimiter, authenticateToken, getAllCompaniesHandler);
router.get('/:id', apiLimiter, authenticateToken, validateIdParam, getCompanyByIdHandler);

router.post('/', authLimiter, authenticateToken, checkEmptyBody, postCompanyHandler);

router.patch('/:id', authLimiter, authenticateToken, validateIdParam, checkEmptyBody, editCompanyDataHandler);

export default router;
