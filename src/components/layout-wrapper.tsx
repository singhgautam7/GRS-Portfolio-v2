'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './navbar';
import { CommandPalette } from './command-palette';
import { Footer } from './footer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const closePalette = useCallback(() => setCommandPaletteOpen(false), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openPalette();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [openPalette]);

  return (
    <>
      <Navbar onJumpToClick={openPalette} />
      <div id="content">{children}</div>
      <Footer />
      <CommandPalette open={commandPaletteOpen} onClose={closePalette} />
    </>
  );
}
