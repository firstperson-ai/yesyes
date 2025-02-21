import { useSupabase } from '../../utils/supabase';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';

function ProfilePage() {
  const { user, supabase } = useSupabase();
  const [subscriptions, setSubscriptions] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: subData, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id);
        if (subError) throw subError;
        setSubscriptions(subData || []);

        const { data: resumeData, error: resumeError } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id);
        if (resumeError) throw resumeError;
        setResumes(resumeData || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
          <h1 className="text-3xl font-bold gradient-text mb-6" aria-label="Your Profile">Your Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold gradient-text mb-4">User Details</h2>
              <p className="text-gray-700 dark:text-gray-300">Email: {user.email}</p>
              {/* Add more user details as needed */}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold gradient-text mb-4">Subscriptions</h2>
              {subscriptions.length > 0 ? (
                subscriptions.map((sub, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300">{sub.plan} - Active: {sub.active ? 'Yes' : 'No'}</p>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No subscriptions found.</p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 col-span-1 md:col-span-2"
            >
              <h2 className="text-2xl font-semibold gradient-text mb-4">Resume History</h2>
              {resumes.length > 0 ? (
                resumes.map((resume, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(74, 144, 226, 0.3)' }}
                    className="p-4 mb-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-gray-700 dark:text-gray-300">{resume.name || `Resume ${index + 1}`}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ATS Score: {resume.atsScore || 'N/A'}%</p>
                    <MotionButton
                      variant="secondary"
                      size="sm"
                      onClick={() => {/* Download or view resume logic */}}
                      className="mt-2"
                      aria-label={`Download ${resume.name || `Resume ${index + 1}`}`}
                    >
                      Download
                    </MotionButton>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No resumes found.</p>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function WrappedProfilePage() {
  return <DashboardLayout><ProfilePage /></DashboardLayout>;
}