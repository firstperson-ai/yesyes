import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingSpinner from '../components/common/LoadingSpinner';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200"
          aria-label="Retry"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default MyApp;