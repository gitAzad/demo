import { Router } from 'express';
import { checkPermission } from '../middlewares/checkPermission';

import {
  getTechnologyById,
  getAllTechnology,
  createTechnology,
  updateTechnologyById,
  deleteTechnologyById,
} from '../controllers/technology.controller';

const router = Router();

router.get('/', getAllTechnology);

router.get('/:id', getTechnologyById);

router.use(checkPermission(['AUTHOR', 'ADMIN']));

router.post('/', createTechnology);

router.put('/:id', updateTechnologyById);

router.delete('/:id', deleteTechnologyById);

export default router;
