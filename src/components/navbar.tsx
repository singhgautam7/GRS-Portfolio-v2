'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

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

  // Section observer
  useEffect(() => {
    if (pathname !== '/') return;
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Update URL hash without scrolling
            window.history.replaceState(null, '', `/#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, [updateScroll]);

  const isActive = (url: string) => {
    if (url.startsWith('/#')) {
      return activeSection === url.replace('/#', '');
    }
    return pathname === url;
  };

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
              GS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {siteConfig.navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.url}
                className={cn(
                  'relative px-3 py-2 font-mono text-xs transition-colors',
                  isActive(link.url)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.name}
                {isActive(link.url) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-px bg-primary"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}

            <div className="ml-4 flex items-center gap-4">
              <ThemeToggle />
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-primary/30 px-4 py-1.5 font-mono text-xs text-primary transition-all hover:bg-emerald-tint"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 p-2 text-primary"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/90 backdrop-blur-md md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-40 flex w-[min(75vw,320px)] flex-col items-center justify-center gap-6 bg-card md:hidden"
            >
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-mono text-base text-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-lg border border-primary/30 px-6 py-2.5 font-mono text-sm text-primary transition-all hover:bg-emerald-tint"
              >
                Resume
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
