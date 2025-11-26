'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      const success = searchParams.get('success');
      const token = searchParams.get('token');
      const errorParam = searchParams.get('error');

      console.log('🔵 Callback Params:', { success, hasToken: !!token, errorParam });

      if (success === 'true' && token) {
        try {


        useAuthStore.getState().setAuth(true);

          // ✅ Mark success and redirect
          setStatus('success');
          setTimeout(() => router.replace('/dashboard'), 1500);
        } catch (err) {
          console.error('❌ Token processing failed:', err);
          setStatus('error');
          setError('Failed to process authentication token');
          setTimeout(() => router.replace('/login'), 3000);
        }
      } else {
        console.error('❌ OAuth error:', errorParam);
        setStatus('error');
        setError(decodeURIComponent(errorParam || 'Authentication failed'));
        setTimeout(() => router.replace('/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  // --- UI (loading, success, error) stays the same as your version ---
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <h3 className="text-xl font-semibold mt-6 text-gray-800">Completing Authentication...</h3>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mt-4 text-gray-800">Success!</h2>
            <p className="text-gray-600">Redirecting to your dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mt-4 text-gray-800">Authentication Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </>
        )}
      </div>
    </div>
  );
}
