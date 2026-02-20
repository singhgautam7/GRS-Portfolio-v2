'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="py-8">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3"
        >
          {/* Mobile social links */}
          <div className="flex gap-4 lg:hidden">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-muted-foreground/60">
            Built by{' '}
            <a
              href={siteConfig.socialLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              {siteConfig.name}
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
