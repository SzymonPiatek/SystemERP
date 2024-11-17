import { Router } from 'express';
import { registerHandler } from '../handlers/registerHandler';

const router = Router();

router.post('/register', registerHandler);

export default router;
