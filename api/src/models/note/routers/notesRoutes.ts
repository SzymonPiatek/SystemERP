import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { getAllNotesHandler, getNoteByIdHandler } from '../handlers/getHandlers';
import { postNoteHandler } from '../handlers/postHandlers';
import { deleteNoteHandler } from '../handlers/deleteHandlers';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';
import { validateIdParam } from '../../../middlewares/idMiddleware';
import checkEmptyBody from '../../../middlewares/bodyMiddleware';

const router = Router();

router.get('/', apiLimiter, authenticateToken, getAllNotesHandler);
router.get('/:id', apiLimiter, authenticateToken, validateIdParam, getNoteByIdHandler);

router.post('/', authLimiter, authenticateToken, checkEmptyBody, postNoteHandler);

router.delete('/:id', authLimiter, authenticateToken, validateIdParam, deleteNoteHandler);

export default router;
