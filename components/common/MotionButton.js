import { motion } from 'framer-motion';
import { Button } from '@shadcn/ui';

function MotionButton({ children, ...props }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 2, boxShadow: '0 5px 15px rgba(74, 144, 226, 0.3)' }}
      whileTap={{ scale: 0.95, rotate: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <Button
        {...props}
        className="bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 transition-all duration-200 rounded-xl shadow-md hover:shadow-lg"
        aria-label={props['aria-label'] || children}
      >
        {children}
      </Button>
    </motion.div>
  );
}

export default MotionButton;