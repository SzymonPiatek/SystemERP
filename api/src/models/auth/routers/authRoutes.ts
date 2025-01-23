import { Router } from 'express';
import { registerHandler } from '../handlers/registerHandler';
import { loginHandler } from '../handlers/loginHandler';
import { refreshTokensHandler } from '../handlers/refreshTokenHandler';
import { logoutHandler } from '../handlers/logoutHandler';
import checkEmptyBody from '../../../middlewares/checkEmptyBodyMiddleware';

const router = Router();

// REGISTER NEW USER
router.post('/register', checkEmptyBody, registerHandler);

// LOGIN USER
router.post('/login', checkEmptyBody, loginHandler);

// LOGOUT USER
router.post('/logout', logoutHandler);

// REFRESH TOKENS
router.post('/token/refresh', refreshTokensHandler);

export default router;
