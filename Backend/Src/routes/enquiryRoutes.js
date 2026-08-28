import express from 'express';
import { 
  getEnquiries, 
  createEnquiry, 
  updateEnquiry, 
  deleteEnquiry 
} from '../controller/enquiryController.js';

const router = express.Router();

router.get('/', getEnquiries);
router.post('/', createEnquiry);
router.put('/:id', updateEnquiry);
router.delete('/:id', deleteEnquiry);

export default router;
