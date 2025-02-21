import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-12 h-12 border-t-4 border-blue-500 rounded-full"
      aria-label="Loading"
    />
  );
}

export default LoadingSpinner;