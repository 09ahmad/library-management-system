import { Router } from 'express';
import { MemberController } from '../controllers/memberController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, MemberController.getAllMembers);
router.get('/:membershipNumber', requireAuth, MemberController.getMemberByNumber);
router.post('/', requireAuth, MemberController.addMember);
router.put('/:membershipNumber', requireAuth, MemberController.updateMember);

export default router;
