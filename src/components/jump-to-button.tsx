'use client';

import { useState, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JumpToButtonProps {
  onClick: () => void;
}

export function JumpToButton({ onClick }: JumpToButtonProps) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2 rounded-2xl bg-card px-4 py-2',
        'text-sm text-muted-foreground transition-all',
        'hover:text-primary hover:bg-emerald-tint/50',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
      )}
      aria-label="Jump to section"
    >
      <Search size={14} />
      <span className="hidden sm:inline">Jump to</span>
      <kbd className="hidden items-center gap-1 rounded-lg bg-secondary px-1.5 py-0.5 font-mono text-[10px] sm:flex">
        {isMac ? '⌘K' : 'Ctrl K'}
      </kbd>
    </button>
  );
}
