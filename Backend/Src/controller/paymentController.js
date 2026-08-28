import Razorpay from 'razorpay';
import crypto from 'crypto';

// Helper function to get Razorpay instance dynamically
const getRazorpayInstance = () => {
  const key_id = (process.env.RAZORPAY_KEY_ID || '').trim();
  const key_secret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) are missing or empty in backend .env file.');
  }

  return new Razorpay({ key_id, key_secret });
};

// POST /api/payment/create-order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ success: false, message: 'Amount is required and must be at least ₹1' });
    }

    const instance = getRazorpayInstance();

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    };

    const order = await instance.orders.create(options);

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
    console.error('Razorpay Create Order Error:', err.message || err);
    return res.status(500).json({ 
      success: false, 
      message: err.message || 'Failed to create Razorpay order',
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

    const secret = (process.env.RAZORPAY_KEY_SECRET || '').trim();
    if (!secret) {
      return res.status(500).json({ success: false, message: 'RAZORPAY_KEY_SECRET is missing in backend .env' });
    }

    // Create HMAC SHA256 signature for verification
    const generatedSignature = crypto
      .createHmac('sha256', secret)
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
    console.error('Razorpay Verify Payment Error:', err.message || err);
    return res.status(500).json({ 
      success: false, 
      message: 'Payment verification error',
      error: err.message 
    });
  }
};

// GET /api/payment/key
export const getKey = (req, res) => {
  const key_id = (process.env.RAZORPAY_KEY_ID || '').trim();
  return res.status(200).json({
    success: true,
    key: key_id
  });
};
