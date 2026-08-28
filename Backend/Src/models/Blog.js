import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  focusKeyword: { type: String, default: '' },
  seoScore: { type: Number, default: 0 },
  category: { type: String, default: 'Travel Guide' },
  location: { type: String, default: '' },
  readTime: { type: String, default: '5 min read' },
  author: { type: String, default: 'Samika Holiday Travel Desk' },
  bestTimeToVisit: { type: String, default: '' },
  idealDuration: { type: String, default: '' },
  howToReach: { type: String, default: '' },
  image: { type: String, default: '' },
  content: { type: String, required: true },
  tags: [{ type: String }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

blogSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

export const Blog = mongoose.model('Blog', blogSchema);
