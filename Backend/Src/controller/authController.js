import { User } from '../models/User.js';

// In-Memory Fallback
export let memoryUsers = [];

// Register (User / Single Admin)
export const register = async (req, res) => {
  const { name, username, email, phone, password, role, address } = req.body;

  if (!password || (!email && !username && !phone)) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  // Determine user role (defaults to user unless admin requested or admin credentials)
  const normalizedUsername = (username || (email ? email.split('@')[0] : '')).trim().toLowerCase();
  const normalizedEmail = (email || '').trim().toLowerCase();
  const assignedRole = (role === 'admin' || normalizedUsername.includes('admin') || normalizedEmail.includes('admin')) 
    ? 'admin' 
    : 'user';

  // --- SINGLE ADMIN REGISTRATION ENFORCEMENT ---
  if (assignedRole === 'admin') {
    try {
      const existingAdminCount = await User.countDocuments({ role: 'admin' });
      if (existingAdminCount >= 1) {
        return res.status(403).json({
          success: false,
          message: 'Registration Closed: Super Admin is already registered. Only 1 Admin account is permitted. Please log in.'
        });
      }
    } catch (err) {
      const memoryAdminExists = memoryUsers.some(u => u.role === 'admin');
      if (memoryAdminExists) {
        return res.status(403).json({
          success: false,
          message: 'Registration Closed: Super Admin is already registered. Only 1 Admin account is permitted. Please log in.'
        });
      }
    }
  }

  try {
    // Check existing user
    const query = [];
    if (normalizedEmail) query.push({ email: normalizedEmail });
    if (normalizedUsername) query.push({ username: normalizedUsername });
    if (phone) query.push({ phone });

    if (query.length > 0) {
      const existing = await User.findOne({ $or: query });
      if (existing) {
        return res.status(400).json({ success: false, message: 'An account with this email, username, or phone already exists.' });
      }
    }

    const newUser = new User({
      name: name || (assignedRole === 'admin' ? 'Administrator' : 'Guest Traveler'),
      username: normalizedUsername,
      email: normalizedEmail,
      phone: phone || '',
      password,
      role: assignedRole,
      address: address || ''
    });

    const saved = await newUser.save();
    return res.status(201).json({
      success: true,
      message: `${assignedRole === 'admin' ? 'Admin' : 'User'} registered successfully!`,
      user: {
        id: saved.id || saved._id,
        name: saved.name,
        username: saved.username,
        email: saved.email,
        phone: saved.phone,
        role: saved.role,
        address: saved.address,
        createdAt: saved.createdAt
      }
    });
  } catch (err) {
    console.warn('DB unavailable, using memory fallback for registration');
  }

  // Fallback in-memory registration
  const existingMemory = memoryUsers.find(u => 
    (normalizedEmail && u.email?.toLowerCase() === normalizedEmail) ||
    (normalizedUsername && u.username?.toLowerCase() === normalizedUsername) ||
    (phone && u.phone === phone)
  );

  if (existingMemory) {
    return res.status(400).json({ success: false, message: 'Account already exists.' });
  }

  const fallbackUser = {
    id: 'usr-' + Date.now(),
    name: name || (assignedRole === 'admin' ? 'Administrator' : 'Guest Traveler'),
    username: normalizedUsername,
    email: normalizedEmail,
    phone: phone || '',
    password,
    role: assignedRole,
    address: address || '',
    createdAt: new Date().toISOString()
  };

  memoryUsers.unshift(fallbackUser);
  return res.status(201).json({
    success: true,
    message: `${assignedRole === 'admin' ? 'Admin' : 'User'} registered successfully!`,
    user: {
      id: fallbackUser.id,
      name: fallbackUser.name,
      username: fallbackUser.username,
      email: fallbackUser.email,
      phone: fallbackUser.phone,
      role: fallbackUser.role,
      address: fallbackUser.address,
      createdAt: fallbackUser.createdAt
    }
  });
};

// Login
export const login = async (req, res) => {
  const { identifier, username, email, phone, password } = req.body;
  const input = (identifier || username || email || phone || '').trim().toLowerCase();

  if (!input || !password) {
    return res.status(400).json({ success: false, message: 'Please enter email/username and password.' });
  }

  try {
    const user = await User.findOne({
      $or: [
        { username: input },
        { email: input },
        { phone: input }
      ]
    });

    if (user && user.password === password) {
      return res.json({
        success: true,
        message: `${user.role === 'admin' ? 'Admin' : 'User'} login successful!`,
        user: {
          id: user.id || user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role,
          address: user.address
        }
      });
    }
  } catch (err) {
    console.warn('DB unavailable, using memory fallback for login');
  }

  // Fallback in-memory search
  const foundUser = memoryUsers.find(u => 
    (
      (u.username && u.username.toLowerCase() === input) ||
      (u.email && u.email.toLowerCase() === input) ||
      (u.phone && u.phone === input)
    ) && u.password === password
  );

  if (foundUser) {
    return res.json({
      success: true,
      message: `${foundUser.role === 'admin' ? 'Admin' : 'User'} login successful!`,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        username: foundUser.username,
        email: foundUser.email,
        phone: foundUser.phone,
        role: foundUser.role,
        address: foundUser.address
      }
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid username/email or password.' });
};

// Admin Status check endpoint (returns if admin exists)
export const getAdminStatus = async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    return res.json({ success: true, hasAdmin: adminCount > 0 });
  } catch (err) {
    const hasMemoryAdmin = memoryUsers.some(u => u.role === 'admin');
    return res.json({ success: true, hasAdmin: hasMemoryAdmin });
  }
};

// Get All Users (Admin)
export const getUsers = async (req, res) => {
  try {
    const data = await User.find().select('-password').sort({ createdAt: -1 });
    return res.json({ success: true, count: data.length, data });
  } catch (err) {
    const safeMemory = memoryUsers.map(({ password, ...rest }) => rest);
    return res.json({ success: true, count: safeMemory.length, data: safeMemory });
  }
};
