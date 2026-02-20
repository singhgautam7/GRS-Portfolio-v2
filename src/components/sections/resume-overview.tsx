'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import type { Job } from '@/lib/content';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

interface ResumeOverviewProps {
  jobs: Job[];
}

export function ResumeOverview({ jobs }: ResumeOverviewProps) {
  const { skills, summary } = siteConfig;

  return (
    <>
      {/* About Section */}
      <section id="about" className="py-section-sm">
        <div className="mx-auto max-w-content px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className="section-heading text-foreground">About</h2>
            <p className="max-w-[640px] leading-relaxed text-muted-foreground">
              {summary}
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-16"
          >
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
              Skills
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
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

      {/* Experience Section — separate <section> for IntersectionObserver */}
      <section id="experience" className="py-section-sm">
        <div className="mx-auto max-w-content px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h3 className="mb-8 text-sm font-semibold uppercase tracking-widest text-primary">
              Experience
            </h3>
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
                    <h4 className="text-sm font-semibold text-foreground">
                      {job.title}{' '}
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary transition-colors hover:text-primary/80"
                      >
                        @ {job.company}
                      </a>
                    </h4>
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
    </>
  );
}
