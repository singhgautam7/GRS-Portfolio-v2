'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  const themes = [
    { value: 'dark', icon: Moon, label: 'Dark mode' },
    { value: 'light', icon: Sun, label: 'Light mode' },
    { value: 'system', icon: Monitor, label: 'System theme' },
  ] as const;

  const cycleTheme = () => {
    const order = ['dark', 'light', 'system'] as const;
    const current = order.indexOf(theme as (typeof order)[number]);
    const next = order[(current + 1) % order.length];
    setTheme(next);
  };

  const current = themes.find((t) => t.value === theme) || themes[0];
  const Icon = current.icon;

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-md',
        'text-muted-foreground transition-colors hover:text-green',
      )}
      aria-label={current.label}
      title={`Current: ${current.label}. Click to cycle.`}
    >
      <Icon size={18} />
    </button>
  );
}
