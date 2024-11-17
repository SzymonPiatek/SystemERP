import { Router } from 'express';
import { registerHandler } from '../handlers/registerHandler';
import { loginHandler } from '../handlers/loginHandler';

const router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;
