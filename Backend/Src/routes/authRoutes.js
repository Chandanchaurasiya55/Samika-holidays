import express from 'express';
import { 
  register, 
  login, 
  getAdminStatus, 
  getUsers 
} from '../controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/admin-status', getAdminStatus);
router.get('/users', getUsers);

export default router;
