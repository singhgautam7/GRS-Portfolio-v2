'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TableOfContentsProps {
  content: string;
}

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

function extractHeadings(content: string): TOCItem[] {
  const headings: TOCItem[] = [];
  const lines = content.split(/\r?\n/);

  lines.forEach((line) => {
    const trimmed = line.trim();
    const match = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      headings.push({ id, title, level });
    }
  });

  return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 1.0 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="hidden xl:block sticky top-32 w-64 shrink-0 max-h-[calc(100vh-8rem)] overflow-y-auto pr-6"
    >
      <h4 className="text-sm font-semibold tracking-tight text-foreground mb-4 uppercase">
        On this page
      </h4>
      <ul className="space-y-2.5 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 3 && 'ml-4')}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block truncate transition-colors duration-200 hover:text-primary',
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
