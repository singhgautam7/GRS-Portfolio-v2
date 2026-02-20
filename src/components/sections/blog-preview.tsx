'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/content';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

interface BlogPreviewProps {
  posts: Post[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const latest = posts.slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="py-section-sm">
      <div className="mx-auto max-w-content px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="section-heading text-foreground"
        >
          From the Blog
        </motion.h2>

        <div className="space-y-4">
          {latest.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="group flex items-baseline gap-4 rounded-lg border border-transparent px-4 py-4 transition-all hover:border-border hover:bg-card"
              >
                <time className="shrink-0 font-mono text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </time>
                <div>
                  <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8"
        >
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 font-mono text-sm text-primary transition-colors hover:text-primary/80"
          >
            View my blogs
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
