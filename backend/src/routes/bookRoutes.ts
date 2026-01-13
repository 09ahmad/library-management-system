import { Router } from 'express';
import { BookController } from '../controllers/bookController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, BookController.getAllBooks);
router.get('/search', requireAuth, BookController.searchBooks);
router.get('/:serialNo', requireAuth, BookController.getBookBySerial);
router.post('/', requireAuth, BookController.addBook);
router.put('/:serialNo', requireAuth, BookController.updateBook);

export default router;
