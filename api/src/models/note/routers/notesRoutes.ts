import { Router } from 'express';
import { authenticateToken } from '@src/middlewares/authMiddleware';
import { apiLimiter, authLimiter } from '@src/middlewares/limiterMiddleware';
import { validateIdParam } from '@src/middlewares/idMiddleware';
import checkEmptyBody from '@src/middlewares/bodyMiddleware';
import { getAllNotesHandler } from '../handlers/getAllNotesHandler';
import { getNoteByIdHandler } from '../handlers/getNoteByIdHandler';
import { createNoteHandler } from '../handlers/createNoteHandler';
import { editNoteHandler } from '../handlers/editNoteHandler';
import { deleteNoteHandler } from '../handlers/deleteNoteHandler';

const router = Router();

// GET ALL NOTES
router.get('/', apiLimiter, authenticateToken, getAllNotesHandler);

// GET NOTE BY ID
router.get('/:id', apiLimiter, authenticateToken, validateIdParam, getNoteByIdHandler);

// CREATE NOTE
router.post('/', authLimiter, authenticateToken, checkEmptyBody, createNoteHandler);

// EDIT NOTE
router.patch('/:id', authLimiter, authenticateToken, validateIdParam, checkEmptyBody, editNoteHandler);

// DELETE NOTE
router.delete('/:id', authLimiter, authenticateToken, validateIdParam, deleteNoteHandler);

export default router;
