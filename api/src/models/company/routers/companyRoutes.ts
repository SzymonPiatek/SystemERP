import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllCompaniesHandler, getCompanyByIdHandler } from '../handlers/getHandlers';
import { postCompanyHandler } from '../handlers/postHandlers';
import { editCompanyHandler } from '../handlers/patchHandlers';

const router = Router();

router.get('/', authenticateToken, getAllCompaniesHandler);
router.get('/:id', authenticateToken, getCompanyByIdHandler);

router.post('/', authenticateToken, postCompanyHandler);

router.patch('/:id', authenticateToken, editCompanyHandler);

export default router;
