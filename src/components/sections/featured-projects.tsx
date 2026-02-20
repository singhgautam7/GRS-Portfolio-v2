'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Featured } from '@/lib/content';

interface FeaturedSectionProps {
  featured: Featured[];
}

export function FeaturedSection({ featured }: FeaturedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!featured.length) return null;

  return (
    <section className="mx-auto max-w-content py-24 md:py-32" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <h2 className="numbered-heading font-semibold text-foreground">
          Some Things I&apos;ve Built
        </h2>

        <div className="space-y-24">
          {featured.map((project, i) => (
            <FeaturedProject key={project.slug} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function FeaturedProject({ project, index }: { project: Featured; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative grid items-center gap-3 md:grid-cols-12`}
    >
      {/* Project Image / Visual */}
      <div
        className={`relative md:col-span-7 ${isEven ? 'md:col-start-1' : 'md:col-start-6'} row-start-1`}
      >
        <a
          href={project.external || project.github || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block"
        >
          <div className="relative overflow-hidden rounded bg-navy-dark">
            <div className="aspect-video w-full bg-gradient-to-br from-green/5 via-transparent to-green/10">
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-mono text-4xl text-green/20">{project.title}</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-green/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
          </div>
        </a>
      </div>

      {/* Project Content */}
      <div
        className={`relative z-10 md:col-span-7 ${isEven ? 'md:col-start-6 md:text-right' : 'md:col-start-1 md:text-left'} row-start-1`}
      >
        <p className="mb-2 font-mono text-xs text-green">Featured Project</p>
        <h3 className="mb-5 text-2xl font-semibold text-foreground">
          <a
            href={project.external || project.github || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-green"
          >
            {project.title}
          </a>
        </h3>
        <div className="rounded bg-card p-6 text-sm leading-relaxed text-muted-foreground shadow-xl">
          {project.content.trim()}
        </div>
        <ul
          className={`mt-5 flex flex-wrap gap-3 font-mono text-xs text-muted-foreground ${isEven ? 'md:justify-end' : 'md:justify-start'}`}
        >
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div
          className={`mt-3 flex items-center gap-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Link"
              className="text-muted-foreground transition-colors hover:text-green"
            >
              <Github size={20} />
            </a>
          )}
          {project.external && (
            <a
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="External Link"
              className="text-muted-foreground transition-colors hover:text-green"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
