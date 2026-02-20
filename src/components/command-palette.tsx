'use client';

import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Search,
  Home,
  User,
  Briefcase,
  FolderOpen,
  BookOpen,
  Mail,
  Sun,
  Moon,
  FileText,
  Clock,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

  const run = (command: () => void) => {
    setOpen(false);
    command();
  };

  const itemClass = cn(
    'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm',
    'text-foreground transition-colors',
    'hover:bg-emerald-tint hover:text-primary',
    'aria-selected:bg-emerald-tint aria-selected:text-primary',
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
            className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Palette — dead center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-[560px] -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <Command
              className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            >
              <div className="flex items-center border-b border-border px-4">
                <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex h-12 w-full bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="ml-2 rounded p-1 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </div>

              <Command.List className="max-h-[320px] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigation"
                  className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Command.Item onSelect={() => run(() => router.push('/'))} className={itemClass}>
                    <Home size={16} /> Home
                  </Command.Item>
                  <Command.Item onSelect={() => run(() => router.push('/#about'))} className={itemClass}>
                    <User size={16} /> About
                  </Command.Item>
                  <Command.Item onSelect={() => run(() => router.push('/#experience'))} className={itemClass}>
                    <Briefcase size={16} /> Experience
                  </Command.Item>
                  <Command.Item onSelect={() => run(() => router.push('/#projects'))} className={itemClass}>
                    <FolderOpen size={16} /> Projects
                  </Command.Item>
                  <Command.Item onSelect={() => run(() => router.push('/blogs'))} className={itemClass}>
                    <BookOpen size={16} /> Blog
                  </Command.Item>
                  <Command.Item onSelect={() => run(() => router.push('/resume'))} className={itemClass}>
                    <FileText size={16} /> Resume
                  </Command.Item>
                  <Command.Item onSelect={() => run(() => router.push('/now'))} className={itemClass}>
                    <Clock size={16} /> Now
                  </Command.Item>
                  <Command.Item onSelect={() => run(() => router.push('/#contact'))} className={itemClass}>
                    <Mail size={16} /> Contact
                  </Command.Item>
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-border" />

                <Command.Group
                  heading="Theme"
                  className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Command.Item onSelect={() => run(() => setTheme('dark'))} className={itemClass}>
                    <Moon size={16} /> Dark Mode
                    {theme === 'dark' && <span className="ml-auto text-xs text-primary">Active</span>}
                  </Command.Item>
                  <Command.Item onSelect={() => run(() => setTheme('light'))} className={itemClass}>
                    <Sun size={16} /> Light Mode
                    {theme === 'light' && <span className="ml-auto text-xs text-primary">Active</span>}
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="border-t border-border px-4 py-2">
                <p className="text-xs text-muted-foreground">
                  <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd>{' '}
                  Navigate{' '}
                  <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>{' '}
                  Select{' '}
                  <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px]">Esc</kbd>{' '}
                  Close
                </p>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
