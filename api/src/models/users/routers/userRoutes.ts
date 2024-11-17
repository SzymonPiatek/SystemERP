import { Router } from 'express';
import { getAllUsersHandler } from '../handlers/getHandlers';

const router = Router();

router.get('/', getAllUsersHandler);

export default router;
