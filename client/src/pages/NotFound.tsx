// import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  // const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4">
      <div className="w-full bg-white dark:bg-black overflow-hidden">
        <div className="relative h-48 flex items-center justify-center">
          <div className="text-9xl font-bold opacity-20 dark:text-white dark:opacity-40">
            404
          </div>
        </div>

        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              // onClick={() => navigate(-1)}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            >
              Go Back
            </button>
            <button
              // onClick={() => navigate('/')}
              className="px-3 py-1 text-white bg-indigo-500 dark:bg-indigo-500 dark:text-white rounded-lg font-medium transition hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white cursor-pointer"
            >
              Return Home
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help?{' '}
              <a
                href="mailto:support@example.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}