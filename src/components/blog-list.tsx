'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { Post } from '@/lib/content';

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all tags
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filtered = posts.filter((post) => {
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description?.toLowerCase().includes(query.toLowerCase());
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <>
      {/* Search + Filters */}
      <div className="mb-10 space-y-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                !activeTag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                  activeTag === tag
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No posts found.
        </p>
      ) : (
        <div className="space-y-2">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="group flex items-baseline gap-4 rounded-lg border border-transparent px-4 py-4 transition-all hover:border-border hover:bg-card"
              >
                <time className="shrink-0 font-mono text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <div>
                  <h2 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-muted-foreground/60"
                      >
                        #{tag}
                      </span>
                    ))}
                    <span className="font-mono text-[10px] text-muted-foreground/40">
                      · {post.readingTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
