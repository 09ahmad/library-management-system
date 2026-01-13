import { Router } from 'express';
import { IssueController } from '../controllers/issueController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, IssueController.getAllIssues);
router.get('/active', requireAuth, IssueController.getActiveIssues);
router.get('/overdue', requireAuth, IssueController.getOverdueIssues);
router.post('/', requireAuth, IssueController.createIssue);
router.post('/return', requireAuth, IssueController.returnBook);

export default router;
