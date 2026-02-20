'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, FileDown, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroSection() {
  return (
    <section className="flex min-h-screen items-center py-section-sm">
      <div className="mx-auto grid w-full max-w-content items-center gap-12 px-6 md:grid-cols-[1fr,auto]">
        {/* Left — Text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Name */}
          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {siteConfig.name}
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={item}
            className="mt-2 font-mono text-lg text-muted-foreground"
          >
            {siteConfig.role}{' '}
            <span className="text-primary">|</span>{' '}
            {siteConfig.roleDetail}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="mt-6 max-w-[540px] text-lg leading-relaxed text-muted-foreground"
          >
            {siteConfig.bio}
          </motion.p>

          {/* Location */}
          <motion.div variants={item} className="mt-6">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={15} className="text-primary" />
              {siteConfig.location}
            </span>
          </motion.div>

          {/* Now + Resume buttons */}
          <motion.div
            variants={item}
            className="mt-4 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/now"
              className="group flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 font-mono text-sm text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
              aria-label="What I'm doing now"
            >
              <Clock size={15} />
              Now
            </Link>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-lg border border-primary/30 bg-emerald-tint px-4 py-2 font-mono text-sm text-primary transition-all hover:border-primary/60 hover:shadow-[0_0_16px_rgba(0,255,179,0.1)]"
            >
              <FileDown size={15} />
              Download Resume
            </a>
          </motion.div>

          {/* Skills chips */}
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-2">
            {siteConfig.heroChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          {/* Subtle animated accent line */}
          <motion.div variants={item} className="mt-12">
            <motion.div
              className="h-px w-16 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>

        {/* Right — Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden justify-self-end md:block"
        >
          <div className="group relative">
            {/* Glow */}
            <div className="absolute -inset-1 rounded-xl bg-primary/10 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
            <Image
              src="/images/me.jpg"
              alt={siteConfig.name}
              width={280}
              height={280}
              priority
              className="relative rounded-xl border border-primary/20 object-cover shadow-lg transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_24px_rgba(0,255,179,0.08)]"
              style={{ aspectRatio: '1 / 1' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
