'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, BookOpen, Instagram, Youtube } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
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
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-0 left-5 z-10 hidden md:block lg:left-10"
    >
      <ul className="flex flex-col items-center gap-5 after:block after:mx-auto after:h-[90px] after:w-px after:bg-muted-foreground/60">
        {siteConfig.socialLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="inline-block p-[10px] text-muted-foreground transition-all hover:-translate-y-[3px] hover:text-green"
              >
                {Icon && <Icon size={20} />}
              </a>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
