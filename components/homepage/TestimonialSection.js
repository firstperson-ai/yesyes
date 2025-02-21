import { motion } from 'framer-motion';

function TestimonialSection() {
  const testimonials = [
    { name: 'John Doe', scoreBefore: 45, scoreAfter: 92, company: 'Google', text: 'AI optimization doubled my ATS score—got hired in 2 weeks!' },
    { name: 'Jane Smith', scoreBefore: 38, scoreAfter: 88, company: 'Amazon', text: 'Incredible tool, easy to use, and highly effective.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delay: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <h2 className="text-4xl font-bold gradient-text mb-12 text-center">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(74, 144, 226, 0.3)' }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">{testimonial.text}</p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>{testimonial.name}</strong> – {testimonial.company}
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              ATS Score: {testimonial.scoreBefore}% → {testimonial.scoreAfter}%
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default TestimonialSection;