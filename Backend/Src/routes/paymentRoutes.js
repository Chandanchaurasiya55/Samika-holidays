import express from 'express';
import { createOrder, verifyPayment, getKey } from '../controller/paymentController.js';

const router = express.Router();

// GET  /api/payment/key           → Get Razorpay Key ID (for frontend)
router.get('/key', getKey);

// POST /api/payment/create-order  → Create Razorpay Order
router.post('/create-order', createOrder);

// POST /api/payment/verify        → Verify Razorpay Payment Signature
router.post('/verify', verifyPayment);

export default router;
