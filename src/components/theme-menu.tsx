'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Palette,
  Sun,
  Moon,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  accentPalettes,
  type AccentColor,
  getStoredAccent,
  setStoredAccent,
  getStoredPitchBlack,
  setStoredPitchBlack,
  initializeTheme,
  applyAccentColor,
  applyThemeMode,
} from '@/lib/theme';

export function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<AccentColor>(() => {
    if (typeof window === 'undefined') return 'google-blue';
    return getStoredAccent();
  });
  const [pitchBlack, setPitchBlack] = useState(false);

  // Calculate isDark early so it can be used in useEffect hooks
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
    setAccent(getStoredAccent());
    setPitchBlack(getStoredPitchBlack());
    // Initialize theme when component mounts and theme is available
    if (theme) {
      initializeTheme(theme === 'dark');
    }
  }, [theme]);

  useEffect(() => {
    if (mounted) {
      setStoredAccent(accent);
      applyAccentColor(accent);
      // Reapply dark mode surfaces with new accent (if in dark mode)
      if (isDark) {
        const pitchBlackEnabled = getStoredPitchBlack();
        applyThemeMode(isDark, pitchBlackEnabled, accent);
      }
    }
  }, [accent, mounted, isDark]);

  useEffect(() => {
    if (mounted) {
      setStoredPitchBlack(pitchBlack);
      applyThemeMode(isDark, pitchBlack, accent);
    }
  }, [pitchBlack, mounted, isDark, accent]);

  useEffect(() => {
    if (mounted) {
      // When theme changes, reapply surfaces
      const pitchBlackEnabled = getStoredPitchBlack();
      applyThemeMode(isDark, pitchBlackEnabled, accent);
    }
  }, [theme, mounted, isDark, accent]);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-xl',
          'text-muted-foreground transition-all duration-200',
          'hover:bg-emerald-tint hover:text-primary',
          open && 'bg-emerald-tint text-primary',
        )}
        aria-label="Theme settings"
      >
        <Palette size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-12 z-50 w-[280px] rounded-3xl border border-border bg-card shadow-elevation"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent Colors */}
              <div className="p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Accent Color
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {Object.values(accentPalettes).map((palette) => (
                    <button
                      key={palette.name}
                      onClick={() => {
                        setAccent(palette.name);
                        setStoredAccent(palette.name);
                      }}
                      className={cn(
                        'group relative flex h-10 w-10 items-center justify-center rounded-xl',
                        'border-2 transition-all',
                        accent === palette.name
                          ? 'border-primary scale-110'
                          : 'border-border hover:border-primary/50',
                      )}
                      style={{
                        backgroundColor: `hsl(${palette.hsl})`,
                      }}
                      aria-label={`Select ${palette.name} accent`}
                    >
                      {accent === palette.name && (
                        <Check size={16} className="text-black" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Mode */}
              <div className="p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Mode
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setTheme('light');
                      // Reset pitch black when switching to light mode
                      if (pitchBlack) {
                        setPitchBlack(false);
                        setStoredPitchBlack(false);
                      }
                      // Don't close dropdown
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                      theme === 'light'
                        ? 'bg-emerald-tint text-primary'
                        : 'text-muted-foreground hover:bg-emerald-tint/50 hover:text-primary',
                      'focus:outline-none focus:ring-2 focus:ring-primary/50',
                    )}
                  >
                    <Sun size={16} />
                    <span>Light</span>
                    {theme === 'light' && (
                      <Check size={16} className="ml-auto text-primary" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setTheme('dark');
                      // Reapply dark mode surfaces with current accent
                      const pitchBlackEnabled = getStoredPitchBlack();
                      applyThemeMode(true, pitchBlackEnabled, accent);
                      // Don't close dropdown
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                      theme === 'dark'
                        ? 'bg-emerald-tint text-primary'
                        : 'text-muted-foreground hover:bg-emerald-tint/50 hover:text-primary',
                      'focus:outline-none focus:ring-2 focus:ring-primary/50',
                    )}
                  >
                    <Moon size={16} />
                    <span>Dark</span>
                    {theme === 'dark' && (
                      <Check size={16} className="ml-auto text-primary" />
                    )}
                  </button>
                </div>
              </div>

              {/* Pitch Black Toggle - Always visible */}
              <div className="h-px bg-border" />
              <div className="p-4">
                <button
                  onClick={() => {
                    if (!isDark) return; // Disabled in light mode
                    setPitchBlack(!pitchBlack);
                    setStoredPitchBlack(!pitchBlack);
                  }}
                  disabled={!isDark}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                        !isDark && 'opacity-50 cursor-not-allowed',
                        pitchBlack && isDark
                          ? 'bg-emerald-tint text-primary'
                          : 'text-muted-foreground hover:bg-emerald-tint/50 hover:text-primary',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50',
                      )}
                >
                  <span>Pitch black in dark mode</span>
                  <div
                    className={cn(
                      'h-5 w-9 rounded-full transition-colors',
                      pitchBlack && isDark ? 'bg-primary' : 'bg-muted',
                    )}
                  >
                    <div
                      className={cn(
                        'h-5 w-5 rounded-full bg-background transition-transform',
                        pitchBlack && isDark ? 'translate-x-4' : 'translate-x-0',
                      )}
                    />
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
