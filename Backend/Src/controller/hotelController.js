import { Hotel } from '../models/Hotel.js';

// In-Memory Fallback
export let memoryHotels = [];

// Get all hotels
export const getHotels = async (req, res) => {
  try {
    const data = await Hotel.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    return res.json({ success: true, count: memoryHotels.length, data: memoryHotels });
  }
};

// Create hotel
export const createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel({
      name: req.body.name,
      location: req.body.location || 'Uttarakhand',
      dest: req.body.dest || 'Nainital',
      rating: req.body.rating || '4.8 (New)',
      price: req.body.price || '4,999',
      image: req.body.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      images: req.body.images || [],
      tag: req.body.tag || 'Luxury Resort',
      amenities: req.body.amenities || ['WiFi', 'Restaurant', 'Parking', 'Room Service'],
      description: req.body.description || '',
      checkInOut: req.body.checkInOut || 'Check-in: 12:00 PM | Check-out: 11:00 AM',
      dining: req.body.dining || 'Buffet Breakfast & Kumaoni cuisine available'
    });
    const saved = await newHotel.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    const fallbackHotel = {
      id: 'htl-' + Date.now(),
      name: req.body.name,
      location: req.body.location || 'Uttarakhand',
      dest: req.body.dest || 'Nainital',
      rating: req.body.rating || '4.8 (New)',
      price: req.body.price || '4,999',
      image: req.body.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      images: req.body.images || [],
      tag: req.body.tag || 'Luxury Resort',
      amenities: req.body.amenities || ['WiFi', 'Restaurant', 'Parking', 'Room Service'],
      description: req.body.description || '',
      checkInOut: req.body.checkInOut || 'Check-in: 12:00 PM | Check-out: 11:00 AM',
      dining: req.body.dining || 'Buffet Breakfast & Kumaoni cuisine available'
    };
    memoryHotels.unshift(fallbackHotel);
    return res.status(201).json({ success: true, data: fallbackHotel });
  }
};

// Delete hotel
export const deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    await Hotel.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Hotel deleted successfully' });
  } catch (err) {}

  memoryHotels = memoryHotels.filter(h => h.id !== id && h._id !== id);
  return res.json({ success: true, message: 'Hotel deleted successfully' });
};
