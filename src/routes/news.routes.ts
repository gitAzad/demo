import { Router } from 'express';
import { checkPermission } from '../middlewares/checkPermission';

import {
  getAllNews,
  createNews,
  getNewsById,
  updateNewsById,
  deleteNewsById,
} from '../controllers/news.controller';

const router = Router();

router.get('/', getAllNews);

router.get('/:id', getNewsById);

router.use(checkPermission(['AUTHOR', 'ADMIN']));

router.post('/', createNews);

router.put('/:id', updateNewsById);

router.delete('/:id', deleteNewsById);

export default router;
