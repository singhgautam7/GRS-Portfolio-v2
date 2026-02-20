'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  BookOpen,
  Instagram,
  Youtube,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  BookOpen,
  Instagram,
  Youtube,
};

export function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="fixed bottom-0 left-6 z-10 hidden flex-col items-center gap-5 lg:flex xl:left-10"
    >
      {siteConfig.socialLinks.map((link) => {
        const Icon = iconMap[link.icon] || Github;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:text-primary"
            aria-label={link.name}
          >
            <Icon size={18} />
          </a>
        );
      })}
      <div className="mt-2 h-20 w-px bg-border" />
    </motion.div>
  );
}
