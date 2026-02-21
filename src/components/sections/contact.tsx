'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { Github, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MediumIcon = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  BookOpen: MediumIcon,
  Instagram,
  Youtube,
};

export function ContactSection() {
  return (
    <section id="contact" className="py-section">
      <div className="mx-auto max-w-content px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <p className="mb-3 font-mono text-sm text-primary">What&apos;s Next?</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-muted-foreground">
            I&apos;m always open to new opportunities and interesting conversations.
            Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-8 mb-12 inline-block rounded-xl bg-primary px-8 py-3 font-mono text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-elevation-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            style={{ color: 'hsl(var(--primary-foreground))' }}
          >
            Say Hello
          </a>

          <TooltipProvider delayDuration={200}>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="p-3 rounded-full bg-card/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                    aria-label="Email me"
                  >
                    <Mail size={22} className="group-hover:scale-110 transition-transform" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Email me</p>
                </TooltipContent>
              </Tooltip>

              {siteConfig.socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || Github;
                return (
                  <Tooltip key={link.name}>
                    <TooltipTrigger asChild>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-card/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                        aria-label={link.name}
                      >
                        <Icon size={22} className="group-hover:scale-110 transition-transform" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </motion.div>
      </div>
    </section>
  );
}
