'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { TimelineEntry } from '@/lib/timeline';
import { TechTag } from '@/components/ui/tech-tag';
import { Briefcase, Code, Award, FileText, ArrowUpRight, Github, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TimelineEntryNodeProps {
  entry: TimelineEntry;
  index: number;
}

export const TimelineEntryNode = memo(function TimelineEntryNode({ entry, index }: TimelineEntryNodeProps) {

  const getStylingForType = (type: TimelineEntry['type']) => {
    switch (type) {
      case 'job':
        return {
          Icon: Briefcase,
          accent: 'text-emerald-500',
          bgHint: 'bg-emerald-500/10 border-emerald-500/20',
          ring: 'group-hover:ring-emerald-500/20',
          marker: 'group-hover:bg-emerald-500'
        };
      case 'project':
        return {
          Icon: Code,
          accent: 'text-indigo-400',
          bgHint: 'bg-indigo-500/10 border-indigo-500/20',
          ring: 'group-hover:ring-indigo-500/20',
          marker: 'group-hover:bg-indigo-400'
        };
      case 'certification':
        return {
          Icon: Award,
          accent: 'text-amber-500',
          bgHint: 'bg-amber-500/10 border-amber-500/20',
          ring: 'group-hover:ring-amber-500/20',
          marker: 'group-hover:bg-amber-500'
        };
      case 'post':
        return {
          Icon: Newspaper,
          accent: 'text-violet-500',
          bgHint: 'bg-violet-500/10 border-violet-500/20',
          ring: 'group-hover:ring-violet-500/20',
          marker: 'group-hover:bg-violet-500'
        };
      default:
        return {
          Icon: FileText,
          accent: 'text-primary',
          bgHint: 'bg-primary/10 border-primary/20',
          ring: 'group-hover:ring-primary/20',
          marker: 'group-hover:bg-primary'
        };
    }
  };

  const { Icon, accent, bgHint, ring, marker } = getStylingForType(entry.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
      className="relative pl-8 sm:pl-32 py-6 group"
    >
      {/* Spine Line and Node Marker */}
      <div className="absolute left-0 sm:left-[7.5rem] top-0 bottom-0 w-px bg-border group-last:bg-transparent" />

      <div className={cn(
        "absolute left-[-4px] sm:left-[calc(7.5rem-4px)] top-8 w-2 h-2 rounded-full bg-border transition-colors duration-300 ring-4 ring-background",
        marker
      )} />

      {/* Date (Left side on desktop, top on mobile) */}
      <div className="sm:absolute sm:left-0 sm:top-7 sm:w-[6.5rem] sm:text-right hidden sm:block">
        <span className="text-xs font-mono font-medium text-muted-foreground/80 tracking-wide uppercase">
          {entry.displayDate}
        </span>
      </div>

      {/* Main Content Card */}
      <div className={cn(
        "relative rounded-2xl border border-transparent p-6 transition-all duration-300 shadow-sm hover:shadow-md",
        "bg-card/40 hover:-translate-y-1 hover:border-border/60 hover:bg-card hover-lift",
        ring, "hover:ring-2"
      )}>

        {/* Mobile Date */}
        <div className="sm:hidden mb-3">
          <span className="text-xs font-mono font-medium text-primary tracking-wide uppercase bg-emerald-tint px-2 py-1 rounded-md">
            {entry.displayDate}
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={cn(
                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                bgHint, accent
              )}>
                <Icon size={12} />
                {entry.type}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground leading-tight tracking-tight">
              {entry.title}
            </h3>
            {entry.organization && entry.organization.trim() !== '-' ? (
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {entry.organization}
              </p>
            ) : entry.type === 'project' ? (
              <p className="text-sm font-medium text-muted-foreground mt-1">
                Personal Project
              </p>
            ) : entry.type === 'post' ? (
              <p className="text-sm font-medium text-muted-foreground mt-1">
                Case Study
              </p>
            ) : null}
          </div>

          {/* Action Links */}
          {(entry.githubUrl || entry.liveUrl || entry.caseStudyUrl || entry.type === 'post') && (
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {entry.type === 'post' && (
                <Link
                  href={`/posts/${entry.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-500 text-xs font-medium hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-200 btn-press"
                >
                  <span>Read Post</span>
                  <ArrowUpRight size={14} />
                </Link>
              )}
              {entry.githubUrl && (
                <a
                  href={entry.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-border bg-background hover:bg-emerald-tint hover:text-primary transition-all duration-200 btn-press tooltip-trigger"
                  aria-label="View Source Code"
                  title="Source Code"
                >
                  <Github size={16} />
                </a>
              )}
              {entry.liveUrl && (
                <a
                  href={entry.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-emerald-tint/20 text-primary text-xs font-medium hover:bg-emerald-tint hover:border-primary/50 transition-all duration-200 btn-press"
                >
                  <span>View Live</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Narrative & Pointers */}
        {(entry.content || (entry.pointers && entry.pointers.length > 0)) && (
          <div className="mt-4 prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground">
            {entry.pointers && entry.pointers.length > 0 ? (
              <ul className="space-y-2 mt-2 ml-4 list-none">
                {entry.pointers.map((pointer, i) => (
                  <li key={i} className="relative text-sm text-foreground/80 leading-relaxed">
                    <span className="absolute -left-4 top-2 w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {pointer}
                  </li>
                ))}
              </ul>
            ) : (
              entry.content && <p className="text-sm line-clamp-3 leading-relaxed text-muted-foreground">{entry.content}</p>
            )}
          </div>
        )}

        {/* Tech Tags */}
        {entry.techTags && entry.techTags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {entry.techTags.slice(0, 5).map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
            {entry.techTags.length > 5 && (
              <span className="text-xs font-mono text-muted-foreground py-1 px-2">
                +{entry.techTags.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});
