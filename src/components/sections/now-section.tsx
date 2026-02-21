'use client';

import { motion } from 'framer-motion';
import { Briefcase, Code2, BookOpen, Coffee, Lightbulb, PenTool } from 'lucide-react';
import { TechTag } from '@/components/ui/tech-tag';
import type { NowContent } from '@/lib/timeline';
import Link from 'next/link';

interface NowSectionProps {
  data: NowContent | null;
}

const getIconForTitle = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('work')) return Briefcase;
  if (t.includes('build')) return Code2;
  if (t.includes('learn')) return BookOpen;
  if (t.includes('read')) return Coffee;
  if (t.includes('idea')) return Lightbulb;
  if (t.includes('design')) return PenTool;
  return Coffee; // fallback
};

export function NowSection({ data }: NowSectionProps) {
  // If no data provided, render nothing or fallback gracefully.
  if (!data) return null;

  return (
    <section id="now" className="py-section-sm">
      <div className="mx-auto max-w-content px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '-80px' }}
           transition={{ duration: 0.5 }}
        >
          <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end justify-between border-b border-border/50 pb-6">
            <div>
              <h2 className="section-heading text-foreground mb-1 mt-0">Now</h2>
              <p className="text-muted-foreground">What I&apos;m focused on right now</p>

              <div className="text-xs font-mono text-muted-foreground/60 tracking-wider mt-2 sm:mt-1">
                Last updated: {data.last_updated}
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end">
              <Link href="/timeline" className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-all pr-2">
                <span>View my full career timeline</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="relative border-l border-border/60 pl-6 ml-3 md:ml-4">
          {data.sections.map((item, index) => {
            const Icon = getIconForTitle(item.title);

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative mb-12 last:mb-0"
              >
                {/* Timeline Dot/Icon */}
                <div className="absolute -left-[38px] top-1">
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors duration-300 group-hover:border-primary/50 group-hover:bg-emerald-tint group-hover:shadow-[0_0_12px_rgba(var(--primary),0.1)]">
                    <Icon size={12} className="text-muted-foreground transition-colors group-hover:text-primary" />
                    <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-[6px] transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="rounded-2xl border border-border/40 bg-card/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-card hover:shadow-elevation sm:p-6">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                    {item.description}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <TechTag key={tag}>{tag}</TechTag>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
