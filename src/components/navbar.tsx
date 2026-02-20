'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.header
        variants={navVariants}
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.3, ease: [0.645, 0.045, 0.355, 1] }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 py-4 shadow-lg backdrop-blur-lg'
            : 'bg-transparent py-6',
        )}
      >
        <nav className="mx-auto flex max-w-page items-center justify-between px-6 md:px-12 lg:px-[50px]">
          {/* Logo */}
          <Link href="/" className="group relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xl font-bold text-green transition-colors hover:text-green/80"
            >
              {'<GS />'}
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {isMounted &&
              siteConfig.navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Link
                    href={link.url}
                    className="group relative px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-green"
                  >
                    <span className="text-green">0{i + 1}. </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: siteConfig.navLinks.length * 0.1 }}
              className="ml-2"
            >
              <ThemeToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: (siteConfig.navLinks.length + 1) * 0.1,
              }}
            >
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 rounded border border-green px-4 py-2 font-mono text-xs text-green transition-all hover:bg-green-tint"
              >
                Resume
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 p-2 text-green"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="fixed bottom-0 right-0 top-0 z-40 flex w-[min(75vw,400px)] flex-col items-center justify-center gap-8 bg-card shadow-2xl md:hidden"
            >
              {siteConfig.navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.url}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-mono text-lg text-foreground transition-colors hover:text-green"
                >
                  <span className="block text-center text-sm text-green">
                    0{i + 1}.
                  </span>
                  {link.name}
                </Link>
              ))}
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded border border-green px-8 py-3 font-mono text-sm text-green transition-all hover:bg-green-tint"
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
