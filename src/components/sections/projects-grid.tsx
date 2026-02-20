'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, ChevronDown } from 'lucide-react';
import type { Project } from '@/lib/content';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const INITIAL = 4;
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, INITIAL);

  return (
    <section className="py-section-sm">
      <div className="mx-auto max-w-content px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="section-heading text-foreground"
        >
          More Projects
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible
              .filter((p) => p.showInProjects)
              .map((project, i) => (
                <motion.article
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:border-primary/20"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <Folder
                      size={20}
                      className="text-primary"
                    />
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.external && (
                        <a
                          href={project.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mb-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>

                  <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {project.content.trim().slice(0, 120)}
                    {project.content.trim().length > 120 ? '...' : ''}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
          </AnimatePresence>
        </div>

        {projects.filter((p) => p.showInProjects).length > INITIAL && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-mono text-sm text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
            >
              {showAll ? 'Show Less' : 'Show More'}
              <ChevronDown
                size={14}
                className={`transition-transform ${showAll ? 'rotate-180' : ''}`}
              />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
