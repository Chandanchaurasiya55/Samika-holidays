import { Package } from '../models/Package.js';

// In-Memory Fallback
export let memoryPackages = [];

// Get all packages
export const getPackages = async (req, res) => {
  try {
    const data = await Package.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    return res.json({ success: true, count: memoryPackages.length, data: memoryPackages });
  }
};

// Create package
export const createPackage = async (req, res) => {
  try {
    const newPkg = new Package({
      title: req.body.title,
      subtitle: req.body.subtitle || 'Custom Package',
      duration: req.body.duration || '3 Nights / 4 Days',
      category: req.body.category || 'Family Tours',
      badge: req.body.badge || 'Popular',
      badgeColor: req.body.badgeColor || 'bg-[#0F382C]',
      price: req.body.price || '9,999',
      priceUnit: req.body.priceUnit || 'person',
      rating: req.body.rating || '5.0 (New)',
      image: req.body.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      images: req.body.images || [],
      specs: req.body.specs || ['Hotel', 'Meals', 'Taxi'],
      highlights: req.body.highlights || ['Handpicked luxury stay', 'Private vehicle transfer', 'Zero hidden charges'],
      itinerary: req.body.itinerary || []
    });
    const saved = await newPkg.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    const fallbackPkg = {
      id: 'pkg-' + Date.now(),
      title: req.body.title,
      subtitle: req.body.subtitle || 'Custom Package',
      duration: req.body.duration || '3 Nights / 4 Days',
      category: req.body.category || 'Family Tours',
      badge: req.body.badge || 'Popular',
      badgeColor: req.body.badgeColor || 'bg-[#0F382C]',
      price: req.body.price || '9,999',
      priceUnit: req.body.priceUnit || 'person',
      rating: req.body.rating || '5.0 (New)',
      image: req.body.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      images: req.body.images || [],
      specs: req.body.specs || ['Hotel', 'Meals', 'Taxi'],
      highlights: req.body.highlights || ['Handpicked luxury stay', 'Private vehicle transfer', 'Zero hidden charges'],
      itinerary: req.body.itinerary || []
    };
    memoryPackages.unshift(fallbackPkg);
    return res.status(201).json({ success: true, data: fallbackPkg });
  }
};

// Delete package
export const deletePackage = async (req, res) => {
  const { id } = req.params;
  try {
    await Package.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Package deleted successfully' });
  } catch (err) {}

  memoryPackages = memoryPackages.filter(p => p.id !== id && p._id !== id);
  return res.json({ success: true, message: 'Package deleted successfully' });
};
