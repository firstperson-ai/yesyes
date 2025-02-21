import { useRouter } from 'next/router';
import { useSupabase } from '../../utils/supabase';
import { Button, Navbar, NavItem } from '@shadcn/ui';
import { motion } from 'framer-motion';
import MotionButton from '../common/MotionButton';

function DashboardLayout({ children }) {
  const { supabase, user } = useSupabase();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-gradient-to-r from-blue-900 to-green-800 text-white py-6 px-8 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <svg className="h-12 w-12 mr-4 text-white animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
            </svg>
            <span className="text-3xl font-extrabold gradient-text">AI Resume Builder</span>
          </motion.div>
          <div>
            <MotionButton variant="secondary" size="md" onClick={handleLogout} aria-label="Logout">
              Logout
            </MotionButton>
          </div>
        </div>
      </header>
      <div className="flex-1 flex">
        <aside className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg">
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {['Dashboard', 'Create New Resume', 'ATS Score', 'Subscription', 'Profile', 'Resume History'].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, color: '#4A90E2', boxShadow: '0 2px 10px rgba(74, 144, 226, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <NavItem href={`/dashboard${item === 'Dashboard' ? '' : `/${item.toLowerCase().replace(' ', '-')}`}`}>
                  <a className="text-lg font-medium text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-200 p-2 rounded-lg" aria-label={item}>
                    {item}
                  </a>
                </NavItem>
              </motion.div>
            ))}
          </motion.nav>
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;