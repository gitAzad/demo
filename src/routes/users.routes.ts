import { Router } from 'express';
import { checkPermission } from '../middlewares/checkPermission';

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
  uploadFile,
} from '../controllers/users.controller';

const router = Router();

router.get('/', getAllUsers);

router.post('/file/upload', uploadFile);

router.get('/:id', getUserById);

router.post('/', createUser);

router.post('/login', login);

router.put('/:id', updateUserById);

router.delete('/:id', deleteUserById);

export default router;
