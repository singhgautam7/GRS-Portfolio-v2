'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, ChevronDown } from 'lucide-react';
import type { Project } from '@/lib/content';
import { TechTag } from '@/components/ui/tech-tag';

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

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const INITIAL = 4;
  const [showAll, setShowAll] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(DEFAULT_FAVORITES));
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
              .map((project, i) => {
                const isFav = mounted && favorites.has(project.slug);
                return (
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
                      <button
                        onClick={(e) => toggleFavorite(e, project.slug)}
                        className="rounded-xl p-1.5 -ml-1.5 transition-colors duration-200 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
                        aria-label={isFav ? `Remove ${project.title} from favorites` : `Add ${project.title} to favorites`}
                      >
                        <Star
                          size={20}
                          className={
                            isFav
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/60'
                          }
                        />
                      </button>
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
                        <TechTag key={t}>
                          {t}
                        </TechTag>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
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
              className="group flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 font-mono text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:text-primary hover:bg-emerald-tint/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
