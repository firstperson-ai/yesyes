import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function ATSScoreMeter({ score = 0 }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [score]);

  const meterVariants = {
    hidden: { width: 0 },
    visible: { width: `${score}%`, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
      aria-label="ATS Score Meter"
    >
      <h3 className="text-2xl font-semibold mb-4 gradient-text">ATS Score</h3>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
        <motion.div
          variants={meterVariants}
          initial="hidden"
          animate={isAnimating ? 'visible' : 'hidden'}
          className={`h-full rounded-full bg-gradient-to-r from-green-500 to-green-300`}
          aria-label={`ATS Score: ${score}%`}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-4xl font-bold text-green-600 dark:text-green-400 drop-shadow-md"
      >
        {score}%
      </motion.div>
      <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
        {score >= 80 ? 'Excellent - Ready for ATS!' : 'Optimize for better results'}
      </p>
    </motion.div>
  );
}

export default ATSScoreMeter;