import express from 'express';
import { 
  getBlogs, 
  getBlogById, 
  createBlog, 
  deleteBlog 
} from '../controller/blogController.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', createBlog);
router.delete('/:id', deleteBlog);

export default router;
