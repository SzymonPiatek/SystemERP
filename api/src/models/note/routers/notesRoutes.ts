import { Router } from 'express';
import { authenticateToken } from '@src/middlewares/authenticateTokenMiddleware';
import { apiLimiter, authLimiter } from '@src/middlewares/limiterMiddleware';
import { validateIdParam } from '@src/middlewares/validateIdParamMiddleware';
import checkEmptyBody from '@src/middlewares/checkEmptyBodyMiddleware';
import { getAllNotesHandler } from '../handlers/getAllNotesHandler';
import { getNoteByIdHandler } from '../handlers/getNoteByIdHandler';
import { createNoteHandler } from '../handlers/createNoteHandler';
import { editNoteHandler } from '../handlers/editNoteHandler';
import { deleteNoteHandler } from '../handlers/deleteNoteHandler';
import { authorizeRole } from '@src/middlewares/authorizeRoleMiddleware';

const router = Router();

// GET ALL NOTES
router.get('/', apiLimiter, authenticateToken, authorizeRole(['*']), getAllNotesHandler);

// GET NOTE BY ID
router.get('/:id', apiLimiter, authenticateToken, authorizeRole(['*']), validateIdParam, getNoteByIdHandler);

// CREATE NOTE
router.post('/', authLimiter, authenticateToken, authorizeRole(['*']), checkEmptyBody, createNoteHandler);

// EDIT NOTE
router.patch('/:id', authLimiter, authenticateToken, authorizeRole(['*']), validateIdParam, checkEmptyBody, editNoteHandler);

// DELETE NOTE
router.delete('/:id', authLimiter, authenticateToken, authorizeRole(['*']), validateIdParam, deleteNoteHandler);

export default router;
