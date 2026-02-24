'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';

export function AuroraBackground() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Framer motion scroll fade out hook
  const { scrollY } = useScroll();
  // Slower, gradual fade: opacity 1 at top, fades to 0 over 1200px
  const opacity = useTransform(scrollY, [0, 1200], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';

  // Opacities designed for single color overlapping
  // Boosted Light mode: 0.4-0.6, Dark mode: 0.2-0.4
  const blob1Opacity = isDark ? 0.4 : 0.6;
  const blob2Opacity = isDark ? 0.3 : 0.5;
  const blob3Opacity = isDark ? 0.2 : 0.4;

  const mixBlendMode = isDark ? 'mix-blend-screen' : 'mix-blend-multiply';

  // We rely on CSS purely to display: none the component via 'html:not(.aurora-enabled) #aurora-bg'
  return (
    // Wrap in motion.div to apply scroll-based opacity fading natively
    <motion.div
      id="aurora-bg"
      style={{ opacity }}
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-opacity duration-1000"
    >
      <div className="absolute inset-0 w-full h-full" id="aurora-blobs">
        {/* Blob 1: Primary Accent (Dominant) */}
        <div
          className={`aurora-blob absolute top-[-10%] md:top-[-10%] left-[-10%] md:left-[-10%] w-[350px] md:w-[60vw] h-[350px] md:h-[60vw] rounded-full blur-[80px] md:blur-[140px] animate-aurora-1 ${mixBlendMode}`}
          style={{
            background: `radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)`,
            opacity: blob1Opacity
          }}
        />

        {/* Blob 2: Same color, different size, blur, and opacity */}
        <div
          className={`aurora-blob absolute top-[20%] md:top-[20%] right-[-10%] md:right-[-10%] w-[300px] md:w-[50vw] h-[300px] md:h-[50vw] rounded-full blur-[60px] md:blur-[100px] animate-aurora-2 ${mixBlendMode}`}
          style={{
            background: `radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)`,
            opacity: blob2Opacity
          }}
        />

        {/* Blob 3: Same color, larger sweep, base opacity */}
        <div
          className={`aurora-blob absolute bottom-[-10%] md:bottom-[-20%] left-[10%] md:left-[20%] w-[400px] md:w-[55vw] h-[350px] md:h-[45vw] rounded-full blur-[80px] md:blur-[120px] animate-aurora-3 ${mixBlendMode}`}
          style={{
            background: `radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)`,
            opacity: blob3Opacity
          }}
        />
      </div>
    </motion.div>
  );
}
