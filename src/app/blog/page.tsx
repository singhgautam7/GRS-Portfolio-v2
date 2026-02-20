import { getPosts } from '@/lib/content';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and insights about software engineering.',
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="mx-auto min-h-screen w-full max-w-page px-6 pt-[150px] md:px-12 lg:px-[150px]">
      <section className="mx-auto max-w-content">
        <header className="mb-16">
          <h1 className="big-heading font-semibold text-foreground">Blog</h1>
          <p className="mt-4 text-muted-foreground">
            Thoughts, tutorials, and insights about software engineering.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-lg border border-transparent p-6 transition-all hover:border-border hover:bg-card"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                    <time className="shrink-0 font-mono text-xs text-green">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground transition-colors group-hover:text-green">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[11px] text-muted-foreground/60"
                          >
                            #{tag}
                          </span>
                        ))}
                        <span className="font-mono text-[11px] text-muted-foreground/40">
                          · {post.readingTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
