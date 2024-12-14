import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllCompaniesHandler, getCompanyByIdHandler } from '../handlers/getHandlers';
import { postCompanyHandler } from '../handlers/postHandlers';
import { editCompanyDataHandler } from '../handlers/patchHandlers';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';

const router = Router();

router.get('/', apiLimiter, authenticateToken, getAllCompaniesHandler);
router.get('/:id', apiLimiter, authenticateToken, getCompanyByIdHandler);

router.post('/', authLimiter, authenticateToken, postCompanyHandler);

router.patch('/:id', authLimiter, authenticateToken, editCompanyDataHandler);

export default router;
