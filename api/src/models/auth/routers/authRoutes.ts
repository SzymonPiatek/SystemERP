import { Router } from 'express';
import { registerHandler } from '../handlers/registerHandler';
import { loginHandler } from '../handlers/loginHandler';
import { refreshTokensHandler } from '../handlers/refreshTokenHandler';
import { logoutHandler } from '../handlers/logoutHandler';
import checkEmptyBody from '../../../middlewares/bodyMiddleware';

const router = Router();

router.post('/register', checkEmptyBody, registerHandler);
router.post('/login', checkEmptyBody, loginHandler);
router.post('/logout', logoutHandler);
router.post('/token/refresh', refreshTokensHandler);

export default router;
