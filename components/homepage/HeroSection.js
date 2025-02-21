import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import MotionButton from '../common/MotionButton';
import { useInView } from 'framer-motion';

function HeroSection() {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: require('/lottie/manifest.json'),
  };

  const ref = useInView({ triggerOnce: true, threshold: 0.1 });
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-hero-pattern bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundAttachment: 'fixed' }} // Parallax effect
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={useInView(ref) ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-6xl font-extrabold gradient-text mb-6 drop-shadow-lg"
          aria-label="AI-Powered Resume Builder"
        >
          🚀 AI-Powered Resume Builder – Land Your Dream Job!
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-2xl text-gray-700 dark:text-gray-300 mb-8 drop-shadow-md"
        >
          Transform your resume with AI to beat ATS and get hired faster—free for your first resume!
        </motion.p>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          className="mb-12"
        >
          <MotionButton variant="primary" size="lg" href="/login" aria-label="Create My Resume Now – Free">
            Create My Resume Now – Free!
          </MotionButton>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-0 right-0 w-full md:w-1/2 h-1/2 md:h-1/2 z-0"
      >
        <Lottie options={lottieOptions} height={300} width={300} isClickToPauseDisabled aria-label="AI Resume Animation" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50 z-0" />
    </div>
  );
}

export default HeroSection;