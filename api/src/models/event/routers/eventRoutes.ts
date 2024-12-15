import { Router } from 'express';
import { authenticateToken } from '../../../middlewares/authMiddleware';
import { apiLimiter, authLimiter } from '../../../middlewares/limiterMiddleware';
import { validateIdParam } from '../../../middlewares/idMiddleware';
import checkEmptyBody from '../../../middlewares/bodyMiddleware';
import { getAllEventsHandler } from '../handlers/getAllEventsHandler';
import { getEventByIdHandler } from '../handlers/getEventByIdHandler';
import { createEventHandler } from '../handlers/createEventHandler';
import { editEventHandler } from '../handlers/editEventHandler';

const router = Router();

// GET ALL EVENTS
router.get('/', apiLimiter, authenticateToken, getAllEventsHandler);

// GET EVENT BY ID
router.get('/:id', apiLimiter, authenticateToken, validateIdParam, getEventByIdHandler);

// CREATE EVENT
router.post('/', authLimiter, authenticateToken, checkEmptyBody, createEventHandler);

// EDIT EVENT
router.patch('/:id', authLimiter, authenticateToken, validateIdParam, checkEmptyBody, editEventHandler);

export default router;
