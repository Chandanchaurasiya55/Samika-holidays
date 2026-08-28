import { Blog } from '../models/Blog.js';

// In-Memory Fallback
export let memoryBlogs = [];

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const data = await Blog.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    return res.json({ success: true, count: memoryBlogs.length, data: memoryBlogs });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (blog) return res.json({ success: true, data: blog });
  } catch (err) {}

  const memoryBlog = memoryBlogs.find(b => b.id === id || b._id === id);
  if (memoryBlog) return res.json({ success: true, data: memoryBlog });

  return res.status(404).json({ success: false, message: 'Blog not found' });
};

// Create new blog
export const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      subtitle: req.body.subtitle || '',
      metaTitle: req.body.metaTitle || req.body.title || '',
      metaDescription: req.body.metaDescription || req.body.subtitle || '',
      focusKeyword: req.body.focusKeyword || '',
      seoScore: Number(req.body.seoScore) || 0,
      category: req.body.category || 'Travel Guide',
      location: req.body.location || '',
      readTime: req.body.readTime || '5 min read',
      author: req.body.author || 'Atithya Travel Desk',
      bestTimeToVisit: req.body.bestTimeToVisit || '',
      idealDuration: req.body.idealDuration || '',
      howToReach: req.body.howToReach || '',
      image: req.body.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      content: req.body.content || req.body.description || '',
      tags: req.body.tags || ['Uttarakhand', 'Travel Guide', 'Himalayas']
    });
    const saved = await newBlog.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    const fallbackBlog = {
      id: 'blog-' + Date.now(),
      title: req.body.title,
      subtitle: req.body.subtitle || '',
      metaTitle: req.body.metaTitle || req.body.title || '',
      metaDescription: req.body.metaDescription || req.body.subtitle || '',
      focusKeyword: req.body.focusKeyword || '',
      seoScore: Number(req.body.seoScore) || 0,
      category: req.body.category || 'Travel Guide',
      location: req.body.location || '',
      readTime: req.body.readTime || '5 min read',
      author: req.body.author || 'Atithya Travel Desk',
      bestTimeToVisit: req.body.bestTimeToVisit || '',
      idealDuration: req.body.idealDuration || '',
      howToReach: req.body.howToReach || '',
      image: req.body.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      content: req.body.content || req.body.description || '',
      tags: req.body.tags || ['Uttarakhand', 'Travel Guide', 'Himalayas'],
      createdAt: new Date().toISOString()
    };
    memoryBlogs.unshift(fallbackBlog);
    return res.status(201).json({ success: true, data: fallbackBlog });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Blog article deleted successfully' });
  } catch (err) {}

  memoryBlogs = memoryBlogs.filter(b => b.id !== id && b._id !== id);
  return res.json({ success: true, message: 'Blog article deleted successfully' });
};
