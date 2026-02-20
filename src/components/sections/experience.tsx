'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Job } from '@/lib/content';

interface ExperienceSectionProps {
  jobs: Job[];
}

export function ExperienceSection({ jobs }: ExperienceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!jobs.length) return null;

  return (
    <section id="experience" className="py-section-sm">
      <div className="mx-auto max-w-content px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
        >
          <h2 className="section-heading text-foreground">
            Experience
          </h2>

          <div className="relative space-y-0">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

            {jobs.map((job, i) => (
              <motion.div
                key={job.slug}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group relative pl-8 pb-8 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-[10px] h-[15px] w-[15px] rounded-full border-2 border-primary bg-background transition-colors group-hover:bg-primary" />

                {/* Vertical stack: title, date, location */}
                <div className="flex flex-col items-start">
                  <h3 className="text-sm font-semibold text-foreground">
                    {job.title}{' '}
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary transition-colors hover:text-primary/80"
                    >
                      @ {job.company}
                    </a>
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {job.range}
                  </p>
                  {job.location && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {job.location}
                    </p>
                  )}
                </div>

                {/* Bullet points */}
                {job.content && (
                  <ul className="mt-3 space-y-1.5">
                    {job.content
                      .trim()
                      .split('\n')
                      .filter((line) => line.trim().startsWith('-'))
                      .map((line, li) => (
                        <li
                          key={li}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {line.replace(/^-\s*/, '')}
                        </li>
                      ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
