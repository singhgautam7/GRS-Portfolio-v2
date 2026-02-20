'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function HeroResumeSection() {
  return (
    <section id="about" className="flex min-h-screen items-center py-section-sm">
      <div className="mx-auto w-full max-w-content px-6">
        {/* Header - matches resume page */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {siteConfig.name}
            </h1>
            <p className="mt-2 text-lg text-primary">
              {siteConfig.role} · {siteConfig.roleDetail}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                {siteConfig.location}
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-1.5 transition-colors hover:text-primary"
              >
                <Mail size={14} />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
          className="mb-14"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            Summary
          </h2>
          <p className="max-w-[640px] leading-relaxed text-muted-foreground">
            {siteConfig.summary}
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="mb-14"
        >
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
            Skills
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(siteConfig.skills).map(([category, skills]) => (
              <div key={category}>
                <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
