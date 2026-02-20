import { getProjects } from '@/lib/content';
import { Github, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive',
  description: 'A complete list of projects and things I\'ve built.',
};

export default function ArchivePage() {
  const projects = getProjects();

  return (
    <main className="mx-auto min-h-screen w-full max-w-page px-6 pt-[150px] md:px-12 lg:px-[150px]">
      <section className="mx-auto max-w-content">
        <header className="mb-16">
          <h1 className="big-heading font-semibold text-foreground">Archive</h1>
          <p className="mt-4 text-muted-foreground">
            A big list of things I&apos;ve worked on
          </p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-border">
              <tr className="font-mono text-xs text-green">
                <th className="whitespace-nowrap py-3 pr-4">Year</th>
                <th className="py-3 pr-4">Title</th>
                <th className="hidden py-3 pr-4 md:table-cell">Made at</th>
                <th className="hidden py-3 pr-4 lg:table-cell">Built with</th>
                <th className="py-3">Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.slug}
                  className="border-b border-border/50 transition-colors hover:bg-card"
                >
                  <td className="whitespace-nowrap py-4 pr-4 font-mono text-sm text-green">
                    {new Date(project.date).getFullYear()}
                  </td>
                  <td className="py-4 pr-4 font-semibold text-foreground">
                    {project.title}
                  </td>
                  <td className="hidden py-4 pr-4 text-sm text-muted-foreground md:table-cell">
                    {project.company !== '-' ? project.company : '—'}
                  </td>
                  <td className="hidden py-4 pr-4 lg:table-cell">
                    <div className="flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground/60">
                      {project.tech.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-green"
                          aria-label="GitHub"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.external && (
                        <a
                          href={project.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-green"
                          aria-label="External Link"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
