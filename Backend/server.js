import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './Src/db.js';

// Route Imports
import authRoutes from './Src/routes/authRoutes.js';
import enquiryRoutes from './Src/routes/enquiryRoutes.js';
import packageRoutes from './Src/routes/packageRoutes.js';
import hotelRoutes from './Src/routes/hotelRoutes.js';
import postRoutes from './Src/routes/postRoutes.js';
import blogRoutes from './Src/routes/blogRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Dynamic CORS configuration
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Body Parsers (Supports JSON & URL-Encoded with large limit for Base64 image uploads)
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// --- MOUNT API ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/blogs', blogRoutes);

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    port: PORT,
    timestamp: new Date().toISOString(),
    message: 'Atithya Stay Backend API is running smoothly'
  });
});

// Start Server & Connect MongoDB
app.listen(PORT, async () => {
  console.log(`🚀 Atithya Stay Backend API server running on http://localhost:${PORT}`);
  const conn = await connectDB();
  if (!conn) {
    console.log('⚠️ Running backend with in-memory persistence fallback');
  }
});
