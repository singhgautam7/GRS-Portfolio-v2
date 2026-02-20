'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export function EmailSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="fixed bottom-0 right-6 z-10 hidden flex-col items-center gap-5 lg:flex xl:right-10"
    >
      <a
        href={`mailto:${siteConfig.email}`}
        className="font-mono text-xs tracking-widest text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary [writing-mode:vertical-rl]"
      >
        {siteConfig.email}
      </a>
      <div className="mt-2 h-20 w-px bg-border" />
    </motion.div>
  );
}
