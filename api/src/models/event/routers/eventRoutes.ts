import { Router } from 'express';
import { authenticateToken } from '@src/middlewares/authenticateTokenMiddleware';
import { apiLimiter, authLimiter } from '@src/middlewares/limiterMiddleware';
import { validateIdParam } from '@src/middlewares/validateIdParamMiddleware';
import checkEmptyBody from '@src/middlewares/checkEmptyBodyMiddleware';
import { getAllEventsHandler } from '../handlers/getAllEventsHandler';
import { getEventByIdHandler } from '../handlers/getEventByIdHandler';
import { createEventHandler } from '../handlers/createEventHandler';
import { editEventHandler } from '../handlers/editEventHandler';
import { authorizeRole } from '@src/middlewares/authorizeRoleMiddleware';
import { deleteEventHandler } from '@src/models/event/handlers/deleteEventHandler';

const router = Router();

// GET ALL EVENTS
router.get('/', apiLimiter, authenticateToken, authorizeRole(['*']), getAllEventsHandler);

// GET EVENT BY ID
router.get('/:id', apiLimiter, authenticateToken, authorizeRole(['*']), validateIdParam, getEventByIdHandler);

// CREATE EVENT
router.post('/', authLimiter, authenticateToken, authorizeRole(['*']), createEventHandler);

// EDIT EVENT
router.patch('/:id', authLimiter, authenticateToken, authorizeRole(['*']), validateIdParam, checkEmptyBody, editEventHandler);

// DELETE EVENT
router.delete('/:id', authLimiter, authenticateToken, authorizeRole(['*']), validateIdParam, deleteEventHandler);

export default router;
