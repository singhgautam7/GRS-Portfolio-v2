'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import {
  Search,
  User,
  Briefcase,
  FolderOpen,
  Mail,
  Clock,
  X,
  FileText,
  ExternalLink,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/config';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      if (window.location.pathname !== `/${id}`) {
        window.history.pushState(null, '', `/${id}`);
      }
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onClose]);

  const itemClass = cn(
    'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium',
    'text-foreground transition-all duration-200 active:scale-[0.98]',
    'hover:bg-emerald-tint hover:text-primary',
    'aria-selected:bg-emerald-tint aria-selected:text-primary',
    'focus:outline-none focus:ring-2 focus:ring-primary/50',
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — blurred */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-background/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pt-[20vh] sm:p-6 sm:pt-[20vh] pointer-events-none items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl pointer-events-auto rounded-3xl border border-border bg-card shadow-elevation overflow-hidden glass-surface"
            >
              <Command
                className="w-full h-full bg-transparent"
                loop
              >
                {/* Input Area */}
                <div className="flex items-center border-b border-border px-4 transition-colors">
                  <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground" />
                  <Command.Input
                    autoFocus
                    placeholder="Search sections or actions..."
                    className="flex h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                  />
                  <button
                    onClick={onClose}
                    className="ml-2 rounded-xl p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Close command palette"
                  >
                    <X size={18} />
                  </button>
                </div>

                <Command.List className="max-h-[60vh] overflow-y-auto p-2 sm:max-h-[400px]">
                  <Command.Empty className="py-12 text-center text-sm text-muted-foreground">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigation">
                    <Command.Item onSelect={() => scrollToSection('about')} className={itemClass}>
                      <User size={16} />
                      <span>About</span>
                    </Command.Item>
                    <Command.Item onSelect={() => scrollToSection('why-me')} className={itemClass}>
                      <User size={16} />
                      <span>What I Bring</span>
                    </Command.Item>
                    <Command.Item onSelect={() => scrollToSection('experience')} className={itemClass}>
                      <Briefcase size={16} />
                      <span>Experience</span>
                    </Command.Item>
                    <Command.Item onSelect={() => scrollToSection('projects')} className={itemClass}>
                      <FolderOpen size={16} />
                      <span>Projects</span>
                    </Command.Item>
                    <Command.Item onSelect={() => scrollToSection('contact')} className={itemClass}>
                      <Mail size={16} />
                      <span>Contact</span>
                    </Command.Item>
                    <Command.Item onSelect={() => scrollToSection('now')} className={itemClass}>
                      <Clock size={16} />
                      <span>Now</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Group heading="Actions" className="mt-2">
                    <Command.Item
                      onSelect={() => {
                        router.push('/timeline');
                        onClose();
                      }}
                      className={itemClass}
                    >
                      <Calendar size={16} />
                      <span>View my Timeline</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => {
                        window.open('https://medium.com/@singhgautam7', '_blank');
                        onClose();
                      }}
                      className={itemClass}
                    >
                      <ExternalLink size={16} />
                      <span>Read Medium Blogs</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => {
                        window.open(siteConfig.resumeUrl, '_blank');
                        onClose();
                      }}
                      className={itemClass}
                    >
                      <FileText size={16} />
                      <span>Download Resume</span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                {/* Footer hints */}
                <div className="flex items-center border-t border-border px-4 py-3 bg-secondary/30">
                  <p className="flex items-center gap-2 text-xs font-mono text-muted-foreground/80">
                    <span>
                      <kbd className="mr-1 rounded bg-secondary px-1.5 py-0.5 border border-border/50 text-[10px]">↑</kbd>
                      <kbd className="rounded bg-secondary px-1.5 py-0.5 border border-border/50 text-[10px]">↓</kbd>
                      <span className="ml-1.5">Navigate</span>
                    </span>
                    <span className="mx-2 w-px h-3 bg-border" />
                    <span>
                      <kbd className="rounded bg-secondary px-1.5 py-0.5 border border-border/50 text-[10px]">↵</kbd>
                      <span className="ml-1.5">Select</span>
                    </span>
                    <span className="mx-2 w-px h-3 bg-border" />
                    <span>
                      <kbd className="rounded bg-secondary px-1.5 py-0.5 border border-border/50 text-[10px]">esc</kbd>
                      <span className="ml-1.5">Close</span>
                    </span>
                  </p>
                </div>
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
