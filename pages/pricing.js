import MotionButton from '../components/common/MotionButton';
import { motion } from 'framer-motion';

function PricingPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, delay: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const plans = [
    { name: '1 Resume Free', price: 'Free', resumes: 1, features: ['Basic optimization', 'One-time use'] },
    { name: 'Single Resume', price: '₹99', resumes: 1, features: ['Download as PDF', 'ATS optimization'] },
    { name: '3 Resumes', price: '₹189', resumes: 3, features: ['Best value', 'Multiple downloads', 'Priority support'] },
    { name: 'Monthly Plan', price: '₹699', resumes: 20, features: ['Monthly access', 'Unlimited optimizations', 'Premium support'] },
    { name: 'Unlimited Monthly', price: '₹999', resumes: 'Unlimited', features: ['Full access', 'All features', 'Dedicated support'] },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold gradient-text mb-12 text-center"
          aria-label="Choose Your Plan"
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(74, 144, 226, 0.3)' }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
              aria-label={`${plan.name} Pricing Plan`}
            >
              <h3 className="text-2xl font-bold gradient-text mb-4">{plan.name}</h3>
              <p className="text-4xl font-extrabold text-gray-800 dark:text-white mb-6">{plan.price}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Up to {plan.resumes} Resumes</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="mr-2 text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <MotionButton
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {/* Handle plan selection, e.g., open PaymentModal */}}
                aria-label={`Get Started with ${plan.name}`}
              >
                Get Started
              </MotionButton>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default PricingPage;