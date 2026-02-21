import Link from 'next/link';
import { motion } from 'framer-motion';
import { Post } from '@/lib/content';

interface PostsSectionProps {
  posts: Post[];
}

// ... component logic
export function PostsSection({ posts }: PostsSectionProps) {
  if (!posts || posts.length === 0) return null;

  const displayPosts = posts.slice(0, 5);

  return (
    <section id="posts" className="py-section-sm">
      <div className="mx-auto max-w-content px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '-80px' }}
           transition={{ duration: 0.5 }}
        >
          <div className="mb-6 border-b border-border/50 pb-4">
            <h2 className="section-heading text-foreground mb-1 mt-0">Posts</h2>
          </div>
        </motion.div>

        <div className="flex flex-col">
          {displayPosts.map((post, i) => {
            const dateObj = new Date(post.date);
            const dateDisplay = isNaN(dateObj.getTime())
              ? post.date
              : dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-4 border-b border-border/40 hover:bg-card/30 transition-colors -mx-4 px-4 rounded-lg"
                >
                  <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </span>
                  <span className="text-sm font-mono text-muted-foreground group-hover:text-primary/70 transition-colors shrink-0 mt-1 sm:mt-0">
                    {dateDisplay}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border/50 bg-card/30 text-sm font-medium hover:bg-card hover:border-primary/30 hover:text-primary transition-all duration-200"
          >
            <span>View all posts</span>
            <span className="font-mono px-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
