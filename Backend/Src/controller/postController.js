import { Post } from '../models/Post.js';

// In-Memory Fallback
export let memoryPosts = [];

// Get posts (optionally filtered by ?page=weddings or ?page=destinations)
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const query = page ? { page } : {};
    const data = await Post.find(query).sort({ createdAt: -1 });
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    const filtered = page ? memoryPosts.filter(p => p.page === page) : memoryPosts;
    return res.json({ success: true, count: filtered.length, data: filtered });
  }
};

// Create post / wedding highlight
export const createPost = async (req, res) => {
  try {
    const newPost = new Post({
      page: req.body.page || 'weddings',
      title: req.body.title,
      subtitle: req.body.subtitle || '',
      image: req.body.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      description: req.body.description || ''
    });
    const saved = await newPost.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    const fallbackPost = {
      id: 'post-' + Date.now(),
      page: req.body.page || 'weddings',
      title: req.body.title,
      subtitle: req.body.subtitle || '',
      image: req.body.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      description: req.body.description || '',
      createdAt: new Date().toISOString()
    };
    memoryPosts.unshift(fallbackPost);
    return res.status(201).json({ success: true, data: fallbackPost });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {}

  memoryPosts = memoryPosts.filter(p => p.id !== id && p._id !== id);
  return res.json({ success: true, message: 'Post deleted successfully' });
};
