import { useSupabase } from '../../utils/supabase';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function ResumeHistoryPage() {
  const { user, supabase } = useSupabase();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data, error: resumeError } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (resumeError) throw resumeError;
        setResumes(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResumes();
  }, [user, supabase]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-8"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-red-500 mb-4 bg-red-100 dark:bg-red-900 p-4 rounded-xl"
          role="alert"
        >
          {error}
        </motion.div>
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-6" aria-label="Resume History">Resume History</h1>
          <div className="space-y-4">
            {resumes.length > 0 ? (
              resumes.map((resume, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(74, 144, 226, 0.3)' }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold gradient-text mb-2">{resume.name || `Resume ${index + 1}`}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">Created: {new Date(resume.created_at).toLocaleDateString()}</p>
                  <p className="text-gray-600 dark:text-gray-400">ATS Score: {resume.atsScore || 'N/A'}%</p>
                  <MotionButton
                    variant="secondary"
                    size="sm"
                    onClick={() => {/* Download or view resume logic */}}
                    className="mt-4"
                    aria-label={`Download ${resume.name || `Resume ${index + 1}`}`}
                  >
                    Download
                  </MotionButton>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No resumes found.</p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function WrappedResumeHistoryPage() {
  return <DashboardLayout><ResumeHistoryPage /></DashboardLayout>;
}