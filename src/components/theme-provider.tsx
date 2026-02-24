'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ReactNode, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import {
  initializeTheme,
  type AccentColor,
  accentPalettes,
  applyAccentColor,
  applyThemeMode,
  getStoredAccent
} from '@/lib/theme';

export function useThemeRoulette() {
  const { setTheme } = useTheme();
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    // 1. Read persistence flag explicitly without touching mode/accents keys natively
    const isSaved = localStorage.getItem('saveThemePreferences') === 'true';

    if (isSaved) {
      // Respect all preferences
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) setTheme(storedTheme);

      const storedAccent = getStoredAccent();
      applyAccentColor(storedAccent);
    } else {
      // Casual User Randomizer - Always defaults to dark
      setTheme('dark');

      const availableThemes = Object.keys(accentPalettes) as AccentColor[];
      const lastIndexStr = localStorage.getItem('lastThemeIndex');
      const lastIndex = lastIndexStr ? parseInt(lastIndexStr, 10) : -1;

      // Select index securely never repeating
      let newIndex = Math.floor(Math.random() * availableThemes.length);
      if (availableThemes.length > 1) {
        while (newIndex === lastIndex) {
          newIndex = Math.floor(Math.random() * availableThemes.length);
        }
      }

      const chosenTheme = availableThemes[newIndex];

      // Save index non-destructively
      localStorage.setItem('lastThemeIndex', newIndex.toString());

      // Paint randomized properties purely visually
      applyAccentColor(chosenTheme, true);
      applyThemeMode(true, false, chosenTheme, true);
    }
  }, [setTheme]);
}

function ThemeInitializer({ children }: { children: ReactNode }) {
  useThemeRoulette();
  return <>{children}</>;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <ThemeInitializer>{children}</ThemeInitializer>
    </NextThemesProvider>
  );
}
