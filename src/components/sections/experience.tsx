'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Job } from '@/lib/content';

interface ExperienceSectionProps {
  jobs: Job[];
}

export function ExperienceSection({ jobs }: ExperienceSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!jobs.length) return null;

  return (
    <section id="jobs" className="mx-auto max-w-[700px] py-24 md:py-32" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <h2 className="numbered-heading font-semibold text-foreground">
          Where I&apos;ve Worked
        </h2>

        <div className="flex flex-col md:flex-row md:gap-5">
          {/* Tab List */}
          <div
            role="tablist"
            className="relative flex overflow-x-auto md:flex-col md:overflow-x-visible"
          >
            {jobs.map((job, i) => (
              <button
                key={job.slug}
                role="tab"
                aria-selected={activeTab === i}
                onClick={() => setActiveTab(i)}
                className={cn(
                  'whitespace-nowrap border-b-2 px-5 py-3 font-mono text-xs transition-all md:border-b-0 md:border-l-2 md:text-left',
                  activeTab === i
                    ? 'border-green bg-green-tint text-green'
                    : 'border-border text-muted-foreground hover:bg-green-tint/50 hover:text-green',
                )}
              >
                {job.company.split('|')[0].trim()}
              </button>
            ))}
          </div>

          {/* Tab Panels */}
          <div className="relative min-h-[350px] w-full py-3 md:py-0">
            {jobs.map((job, i) => (
              <div
                key={job.slug}
                role="tabpanel"
                hidden={activeTab !== i}
                className={cn(activeTab === i ? 'block' : 'hidden')}
              >
                <h3 className="mb-1 text-xl font-medium text-foreground">
                  {job.title}{' '}
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green transition-colors hover:text-green/80"
                  >
                    @ {job.company}
                  </a>
                </h3>
                <p className="mb-6 font-mono text-xs text-muted-foreground">{job.range}</p>
                {job.location && (
                  <p className="mb-4 font-mono text-xs text-muted-foreground/70">{job.location}</p>
                )}
                <div className="space-y-3">
                  {job.content
                    .trim()
                    .split('\n')
                    .filter((line) => line.trim().startsWith('-'))
                    .map((line, idx) => (
                      <div key={idx} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 text-green">▹</span>
                        <span>{line.replace(/^-\s*/, '')}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
