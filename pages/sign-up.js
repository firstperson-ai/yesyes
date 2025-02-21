import { useState } from 'react';
import { useSupabase } from '../utils/supabase';
import { Button, Input, Label } from '@shadcn/ui';
import MotionButton from '../components/common/MotionButton';
import { motion } from 'framer-motion';

function SignUpPage() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert('Sign-up successful! Check your email for verification.');
    } catch (error) {
      setError(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-green-800"
    >
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6 gradient-text text-center"
          aria-label="Sign Up"
        >
          Create Your Account
        </motion.h2>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-500 mb-4 text-center bg-red-100 dark:bg-red-900 p-3 rounded-lg"
            role="alert"
          >
            {error}
          </motion.div>
        )}
        <div className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              className="mt-1"
            >
              <Input
                id="email"
                type="email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Email Input"
                required
              />
            </motion.div>
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              className="mt-1"
            >
              <Input
                id="password"
                type="password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Password Input"
                required
              />
            </motion.div>
          </div>
          <MotionButton
            variant="primary"
            size="lg"
            onClick={handleSignUp}
            className="w-full"
            aria-label="Sign Up Button"
          >
            Sign Up
          </MotionButton>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default SignUpPage;