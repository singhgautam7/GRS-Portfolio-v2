'use client';

import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { useTheme } from 'next-themes';
import {
  Search,
  User,
  Briefcase,
  FolderOpen,
  Mail,
  Clock,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { theme, setTheme } = useTheme();

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
    'flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm',
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
            onClick={onClose}
          />

          {/* Palette — centered */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[560px] pointer-events-auto"
            >
            <Command
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-elevation"
            >
              <div className="flex items-center border-b border-border px-4">
                <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex h-12 w-full bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={onClose}
                  className="ml-2 rounded-xl p-1 text-muted-foreground hover:text-foreground"
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
                  <Command.Item onSelect={() => scrollToSection('about')} className={itemClass}>
                    <User size={16} /> About
                  </Command.Item>
                  <Command.Item onSelect={() => scrollToSection('experience')} className={itemClass}>
                    <Briefcase size={16} /> Experience
                  </Command.Item>
                  <Command.Item onSelect={() => scrollToSection('projects')} className={itemClass}>
                    <FolderOpen size={16} /> Projects
                  </Command.Item>
                  <Command.Item onSelect={() => scrollToSection('now')} className={itemClass}>
                    <Clock size={16} /> Now
                  </Command.Item>
                  <Command.Item onSelect={() => scrollToSection('contact')} className={itemClass}>
                    <Mail size={16} /> Contact
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
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
