'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export function EmailSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-0 right-5 z-10 hidden md:block lg:right-10"
    >
      <div className="flex flex-col items-center gap-5 after:block after:mx-auto after:h-[90px] after:w-px after:bg-muted-foreground/60">
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-mono text-xs tracking-widest text-muted-foreground transition-all hover:-translate-y-[3px] hover:text-green"
          style={{ writingMode: 'vertical-rl' }}
        >
          {siteConfig.email}
        </a>
      </div>
    </motion.div>
  );
}
