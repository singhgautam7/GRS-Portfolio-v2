'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getStoredAccent } from '@/lib/theme';

export function NebulaHero({ className }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  // Fade opacity out as the user scrolls past 100vh (approx 800px)
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // We rely on the layout injecting this behind everything, but we check if the
  // theme-nebula-glass is actively driving the background, otherwise it's safe to return null
  // conditionally since it is strictly a visual effect, but we'll let CSS handle visibility natively
  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      className={cn(
        'fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-700 bg-background',
        className
      )}
    >
      {/* 1. Base Layer is handled by the bg-background above */}

      {/* 2. Mesh Gradient Blobs */}
      <div className="absolute inset-0 w-[100vw] h-[100vh]">
        {/* Blob 1: Star Blue Accent */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px] opacity-40 mix-blend-screen animate-nebula-float"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
          }}
        />
        {/* Blob 2: Deep Magenta/Purple */}
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-30 mix-blend-screen animate-nebula-float-reverse"
          style={{
            background: 'radial-gradient(circle, #8a2be2 0%, transparent 70%)',
          }}
        />
        {/* Blob 3: Cyan Core */}
        <div
          className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20 mix-blend-screen animate-nebula-float"
          style={{
            background: 'radial-gradient(circle, #00ffff 0%, transparent 70%)',
          }}
        />
      </div>

      {/* 3. Texture Layer (Premium Matte Noise Finish) */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />
    </motion.div>
  );
}
