import { Router } from 'express';
import { MovieController } from '../controllers/movieController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, MovieController.getAllMovies);
router.post('/', requireAuth, MovieController.addMovie);
router.put('/:serialNo', requireAuth, MovieController.updateMovie);

export default router;
