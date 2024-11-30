import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllNotesHandler, getNotesByIdHandler } from '../handlers/getHandlers';
import { postNotesHandler } from '../handlers/postHandlers';

const router = Router();

router.get('/', authenticateToken, getAllNotesHandler);
router.get('/:id', authenticateToken, getNotesByIdHandler);

router.post('/', authenticateToken, postNotesHandler);

export default router;
