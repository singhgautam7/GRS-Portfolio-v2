'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Featured } from '@/lib/content';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

interface FeaturedSectionProps {
  featured: Featured[];
}

export function FeaturedSection({ featured }: FeaturedSectionProps) {
  return (
    <section id="projects" className="py-section-sm">
      <div className="mx-auto max-w-content px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="section-heading text-foreground"
        >
          Selected Projects
        </motion.h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,255,179,0.06)]"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label={`GitHub: ${project.title}`}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label={`Live: ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.content.trim()}
              </p>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
