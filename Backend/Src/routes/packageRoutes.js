import express from 'express';
import { 
  getPackages, 
  createPackage, 
  deletePackage 
} from '../controller/packageController.js';

const router = express.Router();

router.get('/', getPackages);
router.post('/', createPackage);
router.delete('/:id', deletePackage);

export default router;
