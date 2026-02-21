'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NowRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 1. Redirect to landing page seamlessly
    router.push('/');

    // 2. Wait for mount, then scroll to #now and replace state
    const timer = setTimeout(() => {
      const nowSection = document.getElementById('now');
      if (nowSection) {
        nowSection.scrollIntoView({ behavior: 'smooth' });
        // Update URL to /now without the hash
        window.history.replaceState(null, '', '/now');
      }
    }, 300); // Slight delay ensures DOM is fully painted

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}
