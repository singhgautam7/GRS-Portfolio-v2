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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  getStoredAuroraEnabled,
  setStoredAuroraEnabled,
} from '@/lib/theme';

export function ThemeMenu() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<AccentColor>(() => {
    if (typeof window === 'undefined') return 'google-blue';
    return getStoredAccent();
  });
  const [pitchBlack, setPitchBlack] = useState(false);
  const [auroraEnabled, setAuroraEnabled] = useState(false);

  // Use resolvedTheme as the absolute source of truth to avoid 'system' mismatches
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    // Phase 1: Mount initialization
    setMounted(true);
    if (!mounted) {
      setAccent(getStoredAccent());
      setPitchBlack(getStoredPitchBlack());
      setAuroraEnabled(getStoredAuroraEnabled());
      return; // Exit early on first pass to let state settle
    }

    // Phase 2: Consolidated Reactive Sync
    // This executes consistently whenever any variable changes, completely eliminating race conditions.
    setStoredAccent(accent);
    setStoredPitchBlack(pitchBlack);
    setStoredAuroraEnabled(auroraEnabled);

    // Nuke previous transient caches, force DOM repaint through applyThemeMode
    applyThemeMode(isDark, pitchBlack, accent, auroraEnabled);

  }, [theme, resolvedTheme, accent, pitchBlack, auroraEnabled, mounted, isDark]);

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
                <TooltipProvider delayDuration={200}>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.values(accentPalettes).map((palette) => {
                      const isSelected = accent === palette.name;
                      // Determine the outer squarcle background based on mode and palette
                      const outerBg = isDark ? `hsl(${palette.darkSurfaceVariant})` : `hsl(${palette.lightSurfaceVariant})`;

                      return (
                        <Tooltip key={palette.name}>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => {
                                setAccent(palette.name);
                                setStoredAccent(palette.name);
                              }}
                              className={cn(
                                'group relative flex flex-col items-center gap-1.5 transition-all outline-none',
                                isSelected ? 'scale-105' : 'hover:scale-105'
                              )}
                              aria-label={`Select ${palette.name} theme`}
                            >
                              {/* Outer Squarcle */}
                              <div
                                className={cn(
                                  'relative w-[60px] h-[60px] rounded-[18px] flex items-center justify-center transition-all duration-300',
                                  'border shadow-sm group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-primary/60 group-focus-visible:ring-offset-2',
                                  isSelected
                                    ? 'border-primary/50 ring-1 ring-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]'
                                    : 'border-border/50 group-hover:border-primary/30'
                                )}
                                style={{
                                  backgroundColor: outerBg,
                                }}
                              >
                                {/* Inner Squarcle */}
                                <div
                                  className={cn(
                                    'w-8 h-8 rounded-[10px] shadow-sm flex items-center justify-center transition-transform duration-300',
                                    isSelected ? 'scale-110' : 'group-hover:scale-110'
                                  )}
                                  style={{ backgroundColor: `hsl(${(!isDark && palette.lightHsl) ? palette.lightHsl : palette.hsl})` }}
                                >
                                  <AnimatePresence>
                                    {isSelected && (
                                      <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                      >
                                        <Check size={16} className="text-white drop-shadow-md" strokeWidth={3} />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{palette.name.replace('-', ' ')}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </TooltipProvider>
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
              <div className="p-4 flex flex-row items-center justify-between">
                <Label
                  htmlFor="pitch-black"
                  className={cn("text-sm font-medium", !isDark && "opacity-50 cursor-not-allowed")}
                >
                  Pitch black in dark mode
                </Label>
                <Switch
                  id="pitch-black"
                  checked={pitchBlack && isDark}
                  onCheckedChange={(checked) => {
                    setPitchBlack(checked);
                    setStoredPitchBlack(checked);
                  }}
                  disabled={!isDark}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {/* Aurora Background Toggle */}
              <div className="h-px bg-border" />
              <div className="p-4 flex flex-row items-center justify-between">
                <Label
                  htmlFor="aurora-enabled"
                  className={cn("text-sm font-medium", pitchBlack && isDark && "opacity-50 cursor-not-allowed")}
                  title={pitchBlack && isDark ? "Disabled when Pitch Black is active" : ""}
                >
                  Aurora Animated Background
                </Label>
                <Switch
                  id="aurora-enabled"
                  checked={auroraEnabled && !(pitchBlack && isDark)}
                  onCheckedChange={(checked) => {
                    setAuroraEnabled(checked);
                    setStoredAuroraEnabled(checked);
                  }}
                  disabled={pitchBlack && isDark}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
