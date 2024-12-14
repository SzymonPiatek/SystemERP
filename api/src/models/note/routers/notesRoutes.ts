import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllNotesHandler, getNotesByIdHandler } from '../handlers/getHandlers';
import { postNotesHandler } from '../handlers/postHandlers';
import { deleteNoteHandler } from '../handlers/deleteHandlers';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';

const router = Router();

router.get('/', apiLimiter, authenticateToken, getAllNotesHandler);
router.get('/:id', apiLimiter, authenticateToken, getNotesByIdHandler);

router.post('/', authLimiter, authenticateToken, postNotesHandler);

router.delete('/:id', authLimiter, authenticateToken, deleteNoteHandler);

export default router;
