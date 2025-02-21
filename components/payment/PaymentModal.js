import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { loadRazorpay } from 'razorpay';
import { Button } from '@shadcn/ui';

function PaymentModal({ onClose, onSuccess, amount = 9900 }) {
  const handlePayment = async () => {
    const razorpay = await loadRazorpay();
    const response = await fetch('/api/razorpay-order', { method: 'POST' });
    const { id: orderId } = await response.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency: 'INR',
      name: 'AI Resume Builder',
      description: 'Resume Download',
      order_id: orderId,
      handler: (response) => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4A90E2', '#50C878', '#FF6B6B'],
        });
        onSuccess?.();
        onClose();
      },
      prefill: { name: 'User', email: 'user@example.com', contact: '1234567890' },
      theme: { color: '#4A90E2' },
      modal: { ondismiss: () => onClose() },
    };

    const rzp = new razorpay(options);
    rzp.open();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm"
      aria-label="Payment Modal"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full"
      >
        <h3 className="text-3xl font-bold mb-6 gradient-text">Complete Your Payment</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Upgrade your plan to unlock premium features and download your ATS-optimized resume!
        </p>
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
          >
            <Button
              onClick={handlePayment}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Pay ₹99 for Single Resume"
            >
              Pay ₹99 (Single Resume)
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
          >
            <Button
              onClick={() => handlePayment(18900)} // ₹189 for 3 Resumes
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Pay ₹189 for 3 Resumes"
            >
              Pay ₹189 (3 Resumes)
            </Button>
          </motion.div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          className="mt-6 w-full py-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors duration-200"
          onClick={onClose}
          aria-label="Cancel Payment"
        >
          Cancel
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default PaymentModal;