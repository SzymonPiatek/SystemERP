import { Router } from 'express';
import { registerHandler } from '../handlers/registerHandler';
import { loginHandler } from '../handlers/loginHandler';
import { refreshTokensHandler } from '../handlers/refreshTokenHandler';
import { logoutHandler } from '../handlers/logoutHandler';

const router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', logoutHandler);
router.post('/token/refresh', refreshTokensHandler);

export default router;
