import { siteConfig } from '@/lib/config';
import { getJobs } from '@/lib/content';
import { Mail, MapPin, Download } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Professional resume and career overview.',
};

export default function ResumePage() {
  const jobs = getJobs();

  return (
    <main className="mx-auto min-h-screen w-full max-w-page px-6 pt-[120px] pb-section lg:px-12">
      <section className="mx-auto max-w-content">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">{siteConfig.name}</h1>
            <p className="mt-2 text-lg text-primary">{siteConfig.role} · {siteConfig.roleDetail}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                {siteConfig.location}
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-1.5 transition-colors hover:text-primary"
              >
                <Mail size={14} />
                {siteConfig.email}
              </a>
            </div>
          </div>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-primary/30 bg-emerald-tint px-5 py-2.5 font-mono text-sm text-primary transition-all hover:border-primary/60 hover:shadow-[0_0_16px_rgba(0,255,179,0.1)]"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        {/* Summary */}
        <div className="mb-14">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Summary</h2>
          <p className="max-w-[640px] leading-relaxed text-muted-foreground">
            {siteConfig.summary}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-14">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">Skills</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(siteConfig.skills).map(([category, skills]) => (
              <div key={category}>
                <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-14">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">Experience</h2>
          <div className="relative space-y-0">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            {jobs.map((job) => (
              <div key={job.slug} className="group relative pl-8 pb-8 last:pb-0">
                <div className="absolute left-0 top-[10px] h-[15px] w-[15px] rounded-full border-2 border-primary bg-background transition-colors group-hover:bg-primary" />
                <div className="flex flex-col items-start">
                    <h3 className="text-sm font-semibold text-foreground">
                      {job.title}{' '}
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary transition-colors hover:text-primary/80"
                      >
                        @ {job.company}
                      </a>
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">{job.range}</p>
                    {job.location && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{job.location}</p>
                    )}
                </div>
                <ul className="mt-3 space-y-1.5">
                  {job.content
                    .trim()
                    .split('\n')
                    .filter((line) => line.trim().startsWith('-'))
                    .map((line, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {line.replace(/^-\s*/, '')}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="mb-12">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">Impact Highlights</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-primary">7+</p>
              <p className="mt-1 text-sm text-muted-foreground">Years of Experience</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-primary">15+</p>
              <p className="mt-1 text-sm text-muted-foreground">Projects Delivered</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-primary">5+</p>
              <p className="mt-1 text-sm text-muted-foreground">Companies</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
