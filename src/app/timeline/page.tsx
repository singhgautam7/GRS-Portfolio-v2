import { getTimelineEntries, getNowContent } from '@/lib/timeline';
import { TimelineEntryNode } from '@/components/sections/timeline/timeline-entry-node';
import { ArrowUpRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default function TimelinePage() {
  const entries = getTimelineEntries();
  const nowData = getNowContent();

  const nowMarkdownString = nowData?.sections.map(s => `**${s.title}**: ${s.description}`).join('\n\n') || '';

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">

        <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group"
            >
              <ArrowUpRight size={16} className="rotate-[-135deg] group-hover:-translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              <span>Back to Home</span>
            </Link>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Career <span className="text-primary pr-1">Timeline</span>
            </h1>
            <p className="text-lg text-muted-foreground/90 max-w-xl leading-relaxed">
              A chronological journey through my roles, projects, and certifications. Demonstrating growth, impact, and a passion for engineering.
            </p>
          </div>
        </header>

        <div className="relative">
          {/* Main timeline nodes */}
          {entries.map((entry, idx) => (
            <TimelineEntryNode
              key={entry.id}
              entry={entry}
              index={idx}
            />
          ))}
        </div>

        {/* Standalone Now Section */}
        {nowData && (
          <div className="mt-16 pt-12 border-t border-border/50 animate-in fade-in flex-col duration-700 delay-150">
            <div className="mb-6">
              <span className="text-xs font-mono font-medium text-muted-foreground tracking-wide uppercase block mb-2">
                As of {nowData.last_updated}
              </span>
              <h2 className="text-3xl font-bold text-primary">Now</h2>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground">
              <MDXRemote source={nowMarkdownString} />
            </div>
          </div>
        )}

        {/* Footer Polish */}
        <div className="mt-20 pt-10 border-t border-border/50 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in flex-col duration-700 delay-200">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Interested in my resume?
          </p>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-all hover-lift btn-press shadow-elevation"
          >
            <span>Download Full Resume</span>
            <FileText size={16} />
          </a>
        </div>

      </div>
    </div>
  );
}
