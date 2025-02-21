import { motion } from 'framer-motion';
import Image from 'next/image';

function TrustSection() {
  const companies = ['amazon', 'google', 'flipkart'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <h2 className="text-4xl font-bold gradient-text mb-12 text-center">Trusted by Top Companies</h2>
      <div className="flex justify-center space-x-12 flex-wrap">
        {companies.map((company, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src={`/logos/${company}.svg`}
              alt={`${company} logo`}
              width={120}
              height={40}
              className="h-12"
              aria-label={`${company} Logo`}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default TrustSection;