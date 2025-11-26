'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const handle = async () => {
      const success = searchParams.get('success');
      const token = searchParams.get('token');
      const errorParam = searchParams.get('error');

      if (success === 'true' && token) {
        try {
          useAuthStore.getState().setAuth(true);
          setStatus('success');
          setTimeout(() => router.replace('/dashboard'), 1500);
        } catch (err) {
          setStatus('error');
          setError('Failed to process authentication token');
          setTimeout(() => router.replace('/login'), 3000);
        }
      } else {
        setStatus('error');
        setError(decodeURIComponent(errorParam || 'Authentication failed'));
        setTimeout(() => router.replace('/login'), 3000);
      }
    };

    handle();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'success' && <p>Success!</p>}
        {status === 'error' && <p>Error: {error}</p>}
      </div>
    </div>
  );
}
