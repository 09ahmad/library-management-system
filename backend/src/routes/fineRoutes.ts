import { Router } from 'express';
import { FineController } from '../controllers/fineController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/pay', requireAuth, FineController.payFine);

export default router;
