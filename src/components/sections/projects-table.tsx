'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Github, ExternalLink, X } from 'lucide-react';
import type { Project } from '@/lib/content';
import { TechTag } from '@/components/ui/tech-tag';

// ------- Favorites Logic -------
const STORAGE_KEY = 'grs-portfolio-favorites';
const DEFAULT_FAVORITES = ['ai-reader', 'sickdict', 'healthpotli', 'clia'];

function loadFavorites(): Set<string> {
  if (typeof window === 'undefined') return new Set(DEFAULT_FAVORITES);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch { /* fallthrough */ }
  return new Set(DEFAULT_FAVORITES);
}

function saveFavorites(favs: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favs]));
}

// ------- Detail Dialog -------
interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  const year = new Date(project.date).getFullYear();
  const isProfessional = project.company && project.company !== '-';

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[520px] pointer-events-auto rounded-3xl border border-border bg-card p-6 shadow-elevation"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2
                    id="project-dialog-title"
                    className="text-xl font-bold text-foreground"
                  >
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {project.content.trim()}
              </p>

              {/* Details grid */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground/60">
                    Year
                  </p>
                  <p className="mt-1 text-foreground">{year}</p>
                </div>

                {isProfessional && (
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground/60">
                      Company
                    </p>
                    <p className="mt-1 text-foreground">{project.company}</p>
                  </div>
                )}

                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground/60">
                    Type
                  </p>
                  <p className="mt-1 text-foreground">
                    {isProfessional ? 'Professional' : 'Personal'}
                  </p>
                </div>
              </div>

              {/* Tech stack */}
              {project.tech.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/60">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <TechTag key={t}>
                        {t}
                      </TechTag>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer buttons */}
              {(project.github || project.external) && (
                <div className="mt-6 flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-primary/30 bg-card px-5 py-2.5 font-mono text-xs font-medium text-primary transition-all duration-200 hover:border-primary/50 hover:bg-emerald-tint/30 hover:shadow-elevation-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <Github size={14} />
                      GitHub Repo
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-mono text-xs font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-elevation-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      style={{ color: 'hsl(var(--primary-foreground))' }}
                    >
                      <ExternalLink size={14} />
                      View Live
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ------- Projects Table -------
interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set(DEFAULT_FAVORITES));
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavorites(loadFavorites());
  }, []);

  const toggleFavorite = useCallback((e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      saveFavorites(next);
      return next;
    });
  }, []);

  // Sort: favorites first, then by year descending
  const sorted = useMemo(() => {
    return [...projects].sort((a, b) => {
      const aFav = favorites.has(a.slug) ? 1 : 0;
      const bFav = favorites.has(b.slug) ? 1 : 0;
      if (aFav !== bFav) return bFav - aFav;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [projects, favorites]);

  return (
    <section id="projects" className="py-section-sm">
      <div className="mx-auto max-w-content px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="section-heading text-foreground"
        >
          Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-left">
            <thead className="sticky top-0 z-10 border-b border-border bg-background">
              <tr className="font-mono text-xs uppercase tracking-wider text-muted-foreground/60">
                <th className="w-10 py-3 pl-2 pr-1">
                  <Star size={13} className="text-primary" />
                </th>
                <th className="whitespace-nowrap py-3 pr-4">Year</th>
                <th className="py-3 pr-4">Name</th>
                <th className="hidden py-3 pr-4 md:table-cell">Company</th>
                <th className="hidden py-3 pr-4 lg:table-cell">Tech</th>
                <th className="py-3 pr-2">Links</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((project, i) => {
                const year = new Date(project.date).getFullYear();
                const isFav = mounted && favorites.has(project.slug);
                const isProfessional = project.company && project.company !== '-';

                return (
                  <motion.tr
                    key={project.slug}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer border-b border-border/40 transition-colors hover:bg-card"
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${project.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                  >
                    {/* Favorite star */}
                    <td className="py-3.5 pl-2 pr-1">
                      <button
                        onClick={(e) => toggleFavorite(e, project.slug)}
                        className="rounded-xl p-1.5 transition-colors duration-200 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
                        aria-label={isFav ? `Remove ${project.title} from favorites` : `Add ${project.title} to favorites`}
                      >
                        <Star
                          size={14}
                          className={
                            isFav
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/60'
                          }
                        />
                      </button>
                    </td>

                    {/* Year */}
                    <td className="whitespace-nowrap py-3.5 pr-4 font-mono text-sm text-primary">
                      {year}
                    </td>

                    {/* Name */}
                    <td className="py-3.5 pr-4 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </td>

                    {/* Company */}
                    <td className="hidden py-3.5 pr-4 text-sm text-muted-foreground md:table-cell">
                      {isProfessional ? project.company : '—'}
                    </td>

                    {/* Tech badges */}
                    <td className="hidden py-3.5 pr-4 lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 4).map((t) => (
                          <TechTag key={t}>
                            {t}
                          </TechTag>
                        ))}
                      </div>
                    </td>

                    {/* Links */}
                    <td className="py-3.5 pr-2">
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-muted-foreground transition-colors hover:text-primary"
                            aria-label={`GitHub: ${project.title}`}
                          >
                            <Github size={15} />
                          </a>
                        )}
                        {project.external && (
                          <a
                            href={project.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-muted-foreground transition-colors hover:text-primary"
                            aria-label={`Live: ${project.title}`}
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
