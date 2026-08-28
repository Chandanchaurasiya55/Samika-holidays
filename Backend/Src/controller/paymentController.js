import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay Instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/payment/create-order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ success: false, message: 'Amount is required and must be at least ₹1' });
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status
      }
    });
  } catch (err) {
    console.error('Razorpay Create Order Error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to create Razorpay order',
      error: err.message 
    });
  }
};

// POST /api/payment/verify
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment verification parameters' });
    }

    // Create HMAC SHA256 signature for verification
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isAuthentic = generatedSignature === razorpay_signature;

    if (isAuthentic) {
      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Signature mismatch.'
      });
    }
  } catch (err) {
    console.error('Razorpay Verify Payment Error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Payment verification error',
      error: err.message 
    });
  }
};

// GET /api/payment/key
export const getKey = (req, res) => {
  return res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID
  });
};
