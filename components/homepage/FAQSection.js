import { motion } from 'framer-motion';

function FAQSection() {
  const faqs = [
    { question: 'Is my first resume really free?', answer: 'Yes, we offer one free ATS-optimized resume for first-time users.' },
    { question: 'How does AI optimize my resume?', answer: 'Our AI analyzes job descriptions and tailors your resume to match ATS keywords and formats.' },
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
      <h2 className="text-4xl font-bold gradient-text mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold gradient-text mb-2">{faq.question}</h3>
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default FAQSection;