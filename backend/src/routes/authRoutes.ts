import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/login', AuthController.login);
router.post('/logout', requireAuth, AuthController.logout);
router.get('/session', requireAuth, AuthController.getSession);

export default router;
