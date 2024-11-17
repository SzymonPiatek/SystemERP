import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllCompaniesHandler, getCompanyByIdHandler } from '../handlers/getHandlers';

const router = Router();

router.get('/', authenticateToken, getAllCompaniesHandler);
router.get('/:id', authenticateToken, getCompanyByIdHandler);

export default router;
