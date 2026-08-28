import { Enquiry } from '../models/Enquiry.js';

// In-Memory Fallback
export let memoryEnquiries = [];

// Get all enquiries
export const getEnquiries = async (req, res) => {
  try {
    const data = await Enquiry.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    return res.json({ success: true, count: memoryEnquiries.length, data: memoryEnquiries });
  }
};

// Create new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const newEnq = new Enquiry({
      name: req.body.name || 'Guest',
      phone: req.body.phone || '',
      email: req.body.email || '',
      destination: req.body.destination || 'Uttarakhand',
      service: req.body.service || 'General Enquiry',
      guests: req.body.guests || '2 Guests',
      date: req.body.date || new Date().toISOString().split('T')[0],
      notes: req.body.notes || '',
      status: req.body.status || 'Pending',
      paidAmount: req.body.paidAmount || 0,
      totalAmount: req.body.totalAmount || 15000,
      paymentStatus: req.body.paymentStatus || 'Unpaid'
    });
    const saved = await newEnq.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    // Fallback
    const fallbackEnq = {
      id: 'enq-' + Date.now(),
      name: req.body.name || 'Guest',
      phone: req.body.phone || '',
      email: req.body.email || '',
      destination: req.body.destination || 'Uttarakhand',
      service: req.body.service || 'General Enquiry',
      guests: req.body.guests || '2 Guests',
      date: req.body.date || new Date().toISOString().split('T')[0],
      notes: req.body.notes || '',
      status: req.body.status || 'Pending',
      paidAmount: req.body.paidAmount || 0,
      totalAmount: req.body.totalAmount || 15000,
      paymentStatus: req.body.paymentStatus || 'Unpaid',
      createdAt: new Date().toISOString()
    };
    memoryEnquiries.unshift(fallbackEnq);
    return res.status(201).json({ success: true, data: fallbackEnq });
  }
};

// Update enquiry status / details
export const updateEnquiry = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Enquiry.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (updated) return res.json({ success: true, data: updated });
  } catch (err) {}

  const index = memoryEnquiries.findIndex(e => e.id === id || e._id === id);
  if (index !== -1) {
    memoryEnquiries[index] = { ...memoryEnquiries[index], ...req.body };
    return res.json({ success: true, data: memoryEnquiries[index] });
  }

  return res.status(404).json({ success: false, message: 'Enquiry not found' });
};

// Delete enquiry
export const deleteEnquiry = async (req, res) => {
  const { id } = req.params;
  try {
    await Enquiry.findByIdAndDelete(id);
    return res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (err) {}

  memoryEnquiries = memoryEnquiries.filter(e => e.id !== id && e._id !== id);
  return res.json({ success: true, message: 'Enquiry deleted successfully' });
};
