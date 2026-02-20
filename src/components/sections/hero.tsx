'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1],
      },
    },
  };

  return (
    <section className="flex min-h-screen flex-col items-start justify-center pb-0 pt-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1000px]"
      >
        <motion.h1
          variants={itemVariants}
          className="mb-5 ml-1 font-mono text-sm font-normal text-green md:text-base"
        >
          Hi, my name is
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="big-heading font-semibold text-foreground"
        >
          {siteConfig.name}.
        </motion.h2>

        <motion.h3
          variants={itemVariants}
          className="big-heading mt-2 font-semibold text-muted-foreground"
          style={{ lineHeight: 0.9 }}
        >
          I build web applications.
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-[540px] text-lg leading-relaxed text-muted-foreground"
        >
          {siteConfig.bio} Currently, I&apos;m working as an {siteConfig.role} at{' '}
          <a
            href={siteConfig.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green transition-colors hover:text-green/80"
          >
            {siteConfig.company}
          </a>
          .
        </motion.p>

        <motion.div variants={itemVariants} className="mt-12 flex flex-wrap gap-4">
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-green px-7 py-4 font-mono text-sm text-green transition-all hover:bg-green-tint"
          >
            Download My Resume
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded border border-border px-7 py-4 font-mono text-sm text-muted-foreground transition-all hover:border-green hover:text-green"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-6 font-mono text-xs text-muted-foreground/60"
        >
          Press{' '}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">
            ⌘K
          </kbd>{' '}
          to navigate quickly
        </motion.p>
      </motion.div>
    </section>
  );
}
