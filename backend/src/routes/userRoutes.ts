import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', requireAdmin, UserController.getAllUsers);
router.post('/', requireAdmin, UserController.addUser);
router.put('/:userId', requireAdmin, UserController.updateUser);

export default router;
