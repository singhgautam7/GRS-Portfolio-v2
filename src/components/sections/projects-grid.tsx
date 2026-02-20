'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/content';

interface ProjectsGridProps {
  projects: Project[];
}

const INITIAL_SHOW = 6;

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [showAll, setShowAll] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const visibleProjects = projects.filter((p) => p.showInProjects !== false);
  const displayed = showAll ? visibleProjects : visibleProjects.slice(0, INITIAL_SHOW);

  if (!visibleProjects.length) return null;

  return (
    <section id="projects" className="mx-auto max-w-content py-24 md:py-32" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <h2 className="text-center text-2xl font-semibold text-foreground">
          Other Noteworthy Projects
        </h2>
        <p className="mb-12 text-center font-mono text-sm text-green">
          <a href="/archive" className="transition-colors hover:text-green/80">
            view the archive
          </a>
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {visibleProjects.length > INITIAL_SHOW && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="rounded border border-green px-7 py-3 font-mono text-sm text-green transition-all hover:bg-green-tint"
            >
              Show {showAll ? 'Less' : 'More'}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: (index % 3) * 0.1 }}
      className={cn(
        'group relative flex flex-col justify-between rounded-lg bg-card p-7 transition-all duration-300',
        'hover:-translate-y-2 hover:shadow-lg hover:shadow-green/5',
      )}
    >
      <div>
        <div className="mb-8 flex items-center justify-between">
          <Folder size={40} className="text-green" strokeWidth={1} />
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
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

        <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-green">
          <a
            href={project.external || project.github || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="static before:absolute before:inset-0 before:z-0 before:block"
          >
            {project.title}
          </a>
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.content.trim().slice(0, 200)}
          {project.content.trim().length > 200 ? '...' : ''}
        </p>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground/70">
        {project.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </motion.div>
  );
}
