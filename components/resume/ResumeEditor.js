import { motion } from 'framer-motion';
import { Button } from '@shadcn/ui';

function ResumeEditor({ resumeData, setResumeData, onOptimize }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-2xl font-semibold mb-4 gradient-text" aria-label="Edit Your Resume">Edit Your Resume</h3>
      <motion.textarea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[300px] text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
        value={resumeData.content || ''}
        onChange={(e) => setResumeData({ ...resumeData, content: e.target.value })}
        placeholder="Paste or edit your resume here—AI will optimize it for ATS..."
        whileFocus={{ scale: 1.02, boxShadow: '0 0 15px rgba(74, 144, 226, 0.3)' }}
        aria-label="Resume Editor"
      />
      <motion.div
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.95, rotate: -2 }}
        className="mt-4"
      >
        <Button
          onClick={onOptimize}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
          aria-label="Optimize Resume with AI"
        >
          Optimize with AI
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default ResumeEditor;