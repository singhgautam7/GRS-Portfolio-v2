'use client';

import { motion } from 'framer-motion';
import { User, TrendingUp, Cpu, Target } from 'lucide-react';

import { YEARS_OF_EXPERIENCE } from '@/lib/config';

const blocks = [
  {
    icon: User,
    title: 'Who I Am',
    text: 'Senior software engineer specializing in scalable backend systems, cloud infrastructure, and developer platforms.',
  },
  {
    icon: TrendingUp,
    title: 'My Level',
    text: `${YEARS_OF_EXPERIENCE}+ years of experience building production-grade systems used by real users at scale.`,
  },
  {
    icon: Cpu,
    title: 'Problems I Solve',
    text: 'I design reliable, high-performance systems and internal platforms that make teams faster, infrastructure safer, and products more resilient.',
  },
  {
    icon: Target,
    title: 'Why It Matters',
    text: 'I focus on practical impact — reducing operational risk, improving performance, and enabling teams to ship confidently.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function WhyMeSection() {
  return (
    <section id="why-me" className="py-section-sm">
      <div className="mx-auto max-w-content px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="section-heading text-foreground"
        >
          What I Bring
        </motion.h2>

        <motion.div
           variants={container}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: '-80px' }}
           className="grid gap-4 sm:gap-6 md:grid-cols-2"
        >
          {blocks.map((block) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.title}
                variants={item}
                className="group flex flex-col gap-4 rounded-3xl border border-border/40 bg-card/40 p-6 sm:p-8 transition-all hover:border-primary/30 hover:bg-card hover:shadow-elevation"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary transition-colors group-hover:bg-emerald-tint">
                  <Icon size={22} className="text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {block.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {block.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
