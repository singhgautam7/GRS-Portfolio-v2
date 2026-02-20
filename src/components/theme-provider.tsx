'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ReactNode, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { initializeTheme } from '@/lib/theme';

function ThemeInitializer({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  
  useEffect(() => {
    if (theme) {
      initializeTheme(theme === 'dark');
    }
  }, [theme]);

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
