'use client';

import { motion } from 'framer-motion';
import { Briefcase, Code2, BookOpen, Coffee } from 'lucide-react';
import { TechTag } from '@/components/ui/tech-tag';

const timelineData = [
  {
    category: 'Work',
    icon: Briefcase,
    text: 'Currently Senior Software Engineer at Hashicorp (IBM), focused on creating high-availability infrastructure deployments scaling globally.',
    tags: ['Infrastructure', 'Kubernetes', 'Terraform'],
  },
  {
    category: 'Building',
    icon: Code2,
    text: 'Experimenting with generative AI interactions, edge computing systems, and modern full-stack architectures for personal projects.',
    tags: ['Next.js', 'LLMs', 'Golang'],
  },
  {
    category: 'Learning',
    icon: BookOpen,
    text: 'Deep diving into local, high-performance RAG pipelines and understanding memory paradigms for intelligent agents in autonomous workflows.',
  },
  {
    category: 'Reading',
    icon: Coffee,
    text: 'Exploring &quot;Designing Data-Intensive Applications&quot; (again) and recently finished &quot;Staff Engineer: Leadership beyond the management track&quot;.',
  },
];

export function NowSection() {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <section id="now" className="py-section-sm">
      <div className="mx-auto max-w-content px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '-80px' }}
           transition={{ duration: 0.5 }}
        >
          <div className="mb-10 flex flex-col items-start gap-2 sm:flex-row sm:items-end justify-between">
            <div>
              <h2 className="section-heading text-foreground mb-1 mt-0">Now</h2>
              <p className="text-muted-foreground">What I&apos;m focused on right now</p>
            </div>
            <div className="text-xs font-mono text-muted-foreground/60 tracking-wider">
              Last updated: {currentDate}
            </div>
          </div>
        </motion.div>

        <div className="relative border-l border-border/60 pl-6 ml-3 md:ml-4">
          {timelineData.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.category}
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
                      {item.category}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                    {item.text}
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
