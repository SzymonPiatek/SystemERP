import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllNotesHandler, getNoteByIdHandler } from '../handlers/getHandlers';
import { postNoteHandler } from '../handlers/postHandlers';
import { deleteNoteHandler } from '../handlers/deleteHandlers';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';

const router = Router();

router.get('/', apiLimiter, authenticateToken, getAllNotesHandler);
router.get('/:id', apiLimiter, authenticateToken, getNoteByIdHandler);

router.post('/', authLimiter, authenticateToken, postNoteHandler);

router.delete('/:id', authLimiter, authenticateToken, deleteNoteHandler);

export default router;
