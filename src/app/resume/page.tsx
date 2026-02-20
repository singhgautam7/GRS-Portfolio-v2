import { siteConfig } from '@/lib/config';
import { getJobs } from '@/lib/content';
import { Mail, MapPin, ExternalLink, Download } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Professional resume and career overview.',
};

export default function ResumePage() {
  const jobs = getJobs();

  return (
    <main className="mx-auto min-h-screen w-full max-w-page px-6 pt-[150px] md:px-12 lg:px-[150px]">
      <section className="mx-auto max-w-[800px]">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">{siteConfig.name}</h1>
            <p className="mt-2 text-xl text-green">{siteConfig.role}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {siteConfig.location}
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-1 transition-colors hover:text-green"
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
            className="inline-flex shrink-0 items-center gap-2 rounded border border-green px-5 py-2.5 font-mono text-sm text-green transition-all hover:bg-green-tint"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        {/* Summary */}
        <div className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Summary</h2>
          <p className="text-muted-foreground">
            {siteConfig.bio} With experience across multiple companies and domains, I specialize in
            building scalable web applications, cloud infrastructure management, and developing
            Python-based solutions that drive business impact.
          </p>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Skills</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(siteConfig.skills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-green">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-green-tint px-3 py-1 font-mono text-xs text-green"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-12">
          <h2 className="mb-6 text-lg font-semibold text-foreground">Experience</h2>
          <div className="relative space-y-8 border-l-2 border-border pl-8">
            {jobs.map((job) => (
              <div key={job.slug} className="relative">
                <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-green bg-background" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-green transition-colors hover:text-green/80"
                  >
                    {job.company}
                    <ExternalLink size={12} />
                  </a>
                </div>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{job.range}</p>
                {job.location && (
                  <p className="font-mono text-xs text-muted-foreground/60">{job.location}</p>
                )}
                <ul className="mt-3 space-y-2">
                  {job.content
                    .trim()
                    .split('\n')
                    .filter((line) => line.trim().startsWith('-'))
                    .map((line, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1 shrink-0 text-green">▹</span>
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
          <h2 className="mb-6 text-lg font-semibold text-foreground">Impact Highlights</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-green">7+</p>
              <p className="mt-1 text-sm text-muted-foreground">Years of Experience</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-green">15+</p>
              <p className="mt-1 text-sm text-muted-foreground">Projects Delivered</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-green">5+</p>
              <p className="mt-1 text-sm text-muted-foreground">Companies</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
