'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { JumpToButton } from './jump-to-button';
import { ThemeMenu } from './theme-menu';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onJumpToClick: () => void;
}

export function Navbar({ onJumpToClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;

    setScrollProgress(progress);
    setIsScrolled(currentScrollY > 40);

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, [updateScroll]);

  return (
    <>
      {/* Scroll progress */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: isVisible ? 0 : -80 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'border-b border-border/50 bg-background/80 backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-nav-height max-w-page items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="group relative z-10">
            <span className="font-mono text-lg font-bold text-primary transition-opacity hover:opacity-80">
              GRS
            </span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <JumpToButton onClick={onJumpToClick} />
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-mono text-xs font-medium shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-elevation-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              style={{ color: 'hsl(var(--primary-foreground))' }}
            >
              <Download size={14} />
              <span className="hidden sm:inline">Resume</span>
            </a>
            <ThemeMenu />
          </div>
        </nav>
      </motion.header>
    </>
  );
}
